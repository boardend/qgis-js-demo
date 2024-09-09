import { QgisContext } from "./global-qgis";

import { cities } from "./data/cities";

interface SlideInteractions {
  onEnter?: (QgisContext, number) => void | ((QgisContext, number) => void)[];
  onLeave?: (QgisContext, number) => void | ((QgisContext, number) => void)[];
}

export const interactions = {
  onEnter: new Map<number, (QgisContext, number) => void>(),
  onLeave: new Map<number, (QgisContext, number) => void>(),
};

export const globalInteractions: SlideInteractions[] = [
  {
    onEnter: ({ runtime, map, extents }, slide) => {
      // check and apply map theme for slide
      if (runtime?.api) {
        for (const mapTheme of runtime.api.mapThemes()) {
          const theme = mapTheme
            .split(",")
            .find((themeSlide) => themeSlide == slide);
          if (theme) {
            runtime.api.setMapTheme(mapTheme);
            //FIXME update map source to trigger reload
          }
        }
      }
      // check and apply map extent for slide
      if (extents) {
        const slideFeature = extents.getFeatures().find((f) => {
          if (f.get("slide")) {
            return ("" + f.get("slide"))
              .split(",")
              .some((slideFeature) => slideFeature == slide);
          }
          return false;
        });
        if (slideFeature) {
          map.getView().fit(slideFeature.getGeometry().getExtent(), {
            duration: 500,
          });
        }
      }
    },
  },
];

const slides: { [key: number]: SlideInteractions } = {
  1: {
    onEnter: ({ map }) => {
      if (map) {
        map.getView().animate({
          center: cities[0].coords,
          zoom: 5,
          duration: 500,
        });
      }
    },
  },

  ...Object.fromEntries(
    [13, 14, 15, 16, 17].map((i) => {
      return [
        i,
        {
          onEnter: ({ map }) => {
            if (map) {
              map.getView().animate({
                center: cities[0].coords,
                zoom: 5 - (i - 15),
                duration: 500,
              });
            }
          },
        },
      ];
    }),
  ),
  /*
  13: {
    onEnter: ({ map }) => {
      if (map) {
        map.getView().animate({
          center: cities[0].coords,
          zoom: 5,
          duration: 500,
        });
      }
    },
  },
  */
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
  }),
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
