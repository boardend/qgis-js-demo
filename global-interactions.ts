import type { QgisContext } from "./global-qgis";

import { cities } from "./data/cities";

export const interactions = {
  onEnter: new Map<number, (QgisContext) => void>(),
  onLeave: new Map<number, (QgisContext) => void>(),
};

interface SlideInteractions {
  onEnter?: (QgisContext) => void | ((QgisContext) => void)[];
  onLeave?: (QgisContext) => void | ((QgisContext) => void)[];
}

const slides: { [key: number]: SlideInteractions } = {
  1: {
    onEnter: ({ runtime, map }) => {
      if (runtime?.api) {
        runtime.api.mapLayers().forEach((layer) => {
          console.log(layer);
          //layer.visible = true;
        });
      }
      // TODO redraw
      if (map) {
        map.getView().animate({
          center: cities[0].coords,
          zoom: 16,
          duration: 500,
        });
      }
    },
  },
};

Object.entries(slides).forEach(([slide, slideInteractions]) => {
  if (slideInteractions.onEnter) {
    const onEnter = Array.isArray(slideInteractions.onEnter)
      ? slideInteractions.onEnter
      : [slideInteractions.onEnter];
    onEnter.forEach((onEnterInteractions) => {
      interactions.onEnter.set(parseInt(slide), onEnterInteractions);
    });
  }
  if (slideInteractions.onLeave) {
    const onLeave = Array.isArray(slideInteractions.onLeave)
      ? slideInteractions.onLeave
      : [slideInteractions.onLeave];
    onLeave.forEach((onLeaveInteraction) => {
      interactions.onLeave.set(parseInt(slide), onLeaveInteraction);
    });
  }
});

Object.fromEntries(
  [...Array(16).keys()].map((i) => {
    return [
      i,
      {
        onLeave: ({ runtime }) => {
          const layers = runtime.api.mapLayers();
          const randomLayer = layers[Math.floor(Math.random() * layers.length)];
          for (const layer of layers) {
            layer.visible = layer.name == randomLayer.name;
          }
        },
      },
    ];
  })
);

/*

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
*/
