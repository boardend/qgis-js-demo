import type { QgisContext } from "./global-qgis";

import { cities } from "./data/cities";

export const interactions = {
  onEnter: new Map<number, (QgisContext) => void>(),
  onLeave: new Map<number, (QgisContext) => void>(),
};

// create demo enter/leave interactions for slides 1-16
[...Array(16).keys()]
  .map((i) => i + 1)
  .forEach((i) => {
    interactions.onEnter.set(i, ({ map }) => {
      if (map) {
        map.getView().animate({
          center: cities[Math.floor(Math.random() * cities.length)].coords,
          zoom: Math.floor(Math.random() * 3) + 5,
          duration: 500,
        });
      }
    });

    interactions.onLeave.set(i, ({ runtime }) => {
      const layers = runtime.api.mapLayers();
      const randomLayer = layers[Math.floor(Math.random() * layers.length)];
      for (const layer of layers) {
        layer.visible = layer.name == randomLayer.name;
      }
    });
  });
