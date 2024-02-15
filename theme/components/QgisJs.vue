<template>
  <div class="qgis">
    <div id="status">
      <div id="status-message">Initializing...</div>
      <div id="status-progress">
        <div class="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
    <div ref="map" class="map" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watchEffect } from "vue";

import { qgis } from "qgis-js";

import { QgisCanvasDataSource } from "@qgis-js/ol";

import { Map as OlMap, View } from "ol";

import ImageLayer from "ol/layer/Image";
import Projection from "ol/proj/Projection.js";

import { useGeographic } from "ol/proj.js";

import { context, setRuntime, setMap } from "../../global-qgis";
import { interactions } from "../../global-interactions";

import { cities } from "../../data/cities"

const map = ref(null);

const lastPage = ref(null);
watchEffect(() => {
  if (lastPage.value != $slidev.nav.currentPage) {
    if (lastPage.value) {
      if (interactions.onLeave.has(lastPage.value)) {
        interactions.onLeave.get(lastPage.value)!(context());
      }
    }
    if ($slidev.nav.currentPage) {
      if (interactions.onEnter.has($slidev.nav.currentPage)) {
        interactions.onEnter.get($slidev.nav.currentPage)!(context());
      }
    }
  }
  lastPage.value = $slidev.nav.currentPage;
});

onMounted(async () => {
  const statusControl = document.getElementById("status")! as HTMLDivElement;

  let isError = false;
  const onStatus = (status: string) => {
    if (isError) return;
    (statusControl.firstElementChild! as HTMLDivElement).innerHTML = status;
  };
  const onError = (error: Error | any) => {
    isError = true;
    console.error(error);
    const message =
      "" + error && error["message"] ? error["message"] : "Runtime error";
    //projectControl.style.visibility = "none";
    statusControl.style.display = "auto";
    statusControl.innerHTML = `<div class="alert alert-danger" role="alert">
      <b style="color: red">Error:&nbsp;</b>
      ${message}
    </div>`;
  };
  const onReady = () => {
    statusControl.style.display = "none";
  };

  // boot the runtime
  const runtime = await qgis({
    prefix:
      (window.location.pathname.startsWith("/qgis-js-demo")
        ? "/qgis-js-demo/"
        : "/") + "assets/wasm",
    onStatus: (status: string) => {
      onStatus(status);
    },
  });
  setRuntime(runtime);
  const { api, fs } = runtime;

  onStatus("Uploading project...");

  // prepare the upload directory
  const uploadDir = "/upload";
  fs.mkdir(uploadDir);

  // fetch demo project and upload it to the runtime
  const source = "qgis-js-demo-project";
  const files = ["project.qgz", "data.gpkg"];
  for (const file of files) {
    const url = `${source}/${file}`;
    const response = await fetch(url);
    const blob = await response.blob();
    const buffer = await blob.arrayBuffer();
    fs.writeFile(`${uploadDir}/${file}`, new Uint8Array(buffer));
  }

  // load the uploaded project
  api.loadProject(`${uploadDir}/${files[0]}`);

  // paint a first dummy frame
  onStatus("Rendering first frame...");
  await api.renderImage(api.srid(), api.fullExtent(), 42, 42, 1);

  onReady();

  // create the ol map with the projection from the project
  const projection = new Projection({
    code: api.srid(),
    units: "m",
  });

  useGeographic();
  const ol = new OlMap({
    pixelRatio: 2,
    target: map.value! as HTMLDivElement,
    layers: [
      new ImageLayer({
        source: new QgisCanvasDataSource(api, {
          projection,
        }),
      }),
    ],
    view: new View({
      center: cities[0].coords,
      zoom: 15,
      projection,
    }),
  });

  setMap(ol);
});
</script>

<style scoped>
.qgis {
  opacity: 1;
}

.qgis,
.map {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

#status {
  position: absolute;
  top: 0;
  right: 0;
  padding: 1em 1em 0 0;
  z-index: 1000000;
}

#status div {
  display: inline-block;
}
</style>
