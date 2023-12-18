import type { QgisRuntime } from "qgis-js";

import type {Map} from "ol"

let runtime : QgisRuntime | undefined = undefined;
let map : Map | undefined = undefined;

export interface QgisContext {
    runtime?: QgisRuntime,
    map?: Map
}

export function context() : QgisContext {
  return {
    runtime,
    map
  }
}

export function setRuntime(r: QgisRuntime) {
  runtime = r;
}

export function setMap(m: Map) {
  map = m;
}
