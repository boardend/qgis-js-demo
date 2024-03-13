import type { QgisRuntime } from "qgis-js";

import type { Map } from "ol";

import type { Vector as VectorSource } from "ol/source.js";

let runtime: QgisRuntime | undefined = undefined;
let map: Map | undefined = undefined;
let extents: VectorSource | undefined = undefined;

export interface QgisContext {
  runtime?: QgisRuntime;
  map?: Map;
  extents?: VectorSource;
}

export function context(): QgisContext {
  return {
    runtime,
    map,
    extents,
  };
}

export function setRuntime(r: QgisRuntime) {
  runtime = r;
}

export function setMap(m: Map) {
  map = m;
}

export function setExtents(e: VectorSource) {
  extents = e;
}
