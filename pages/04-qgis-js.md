---
title: What is qgis-js?
routeAlias: qgis-js
---

# What is qgis-js?

- QGIS Core ported to WebAssembly to use it on the web platform
- JavaScript/TypeScript API

  - Loading QGIS projects
  - Rendering maps (projection, extent, resolution)
  - Interaction with layers (visibility, opacity, ...) and map themes

- OpenLayers integration as a separate npm package

<br />

<div v-click>

<h1>What is qgis-js not?</h1>

- Not a 1:1 port of QGIS Desktop
  - No GUI, Processing, 3D, Python/PyQGIS support

</div>

<div class="absolute bottom-23 right-15 transform -rotate-5" v-click>

```ts
import { qgis } from "qgis-js";

// initialize qgis-js runtime
const { api, fs } = await qgis();

// do some QGIS geometry operations
const rect = new api.Rectangle(1, 2, 3, 4);
rect.scale(5);
const center = rect.center();
console.log(center.x, center.y);

// render a QGIS map
fs.writeFile(`/upload/fossgis2024.qgz`, new Uint8Array(projectBlob));
api.loadProject(`/upload/fossgis2024.qgz`);
const img = api.renderImage("EPSG:3857", api.fullExtent(), 1980, 1080);
```

</div>

<!--
```
// download QGIS project
fetch("https://some.server/fossgis2024.qgz")
  .then((response) => response.blob())
  .then((blob) => blob.arrayBuffer())
  .then((buffer) => {
    // upload QGIS project to the qgis-js runtime
    fs.mkdir(`/upload`);
    fs.writeFile(`/upload/fossgis2024.qgz`, new Uint8Array(buffer));

    // load the project in QGIS
    api.loadProject(`/upload/fossgis2024.qgz`);

    // render a map of the project
    const img = api.renderImage("EPSG:3857", api.fullExtent(), 1980, 1080);
  });
```
-->
