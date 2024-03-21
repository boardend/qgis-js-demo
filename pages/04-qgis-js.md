---
title: Was ist qgis-js?
routeAlias: qgis-js
---

# Was ist qgis-js?

- QGIS Core portiert zu WebAssembly um es auf der Web-Platform zu nutzen
- JavaScript/TypeScript API

  - Laden von QGIS Projekten
  - Rendering von Karten (Projektion, Extent, Auflösung)
  - Interaktion mit Layern (Visibility, Opacity, ...) und Map-Themes

- OpenLayers Integration als separates npm Package

<br />

<div v-click>

<h1>Was ist qgis-js nicht?</h1>

- Keine 1:1 Portierung von QGIS Desktop
  - Kein GUI, Processing, 3D, Python/PyQGIS Support

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
