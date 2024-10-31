---
theme: ./theme
fonts:
  provider: "none"
class: text-center
highlighter: shiki
lineNumbers: false
drawings:
  persist: false
transition: slide-left
title: qgis-js - QGIS im Browser dank WebAssembly
mdc: true
hideInToc: true
---

<div class="pt-12 rounded-xl bg-white bg-opacity-85">
<h1>QGIS im Browser dank WebAssembly</h1>
  <span @click="$slidev.nav.next">
    <h2 style="padding-bottom: 0.5em"><a href="https://github.com/boardend" target="_blank">Michael Schmuki</a>, OPENGIS.ch</h2>
    <h3>Karten/GIS/Geo-Meetup 30.10.24 @ BNITM</h3>
  </span>
  <br /><br />
</div>

<div class="abs-br m-6 flex gap-2">
  <a href="https://github.com/boardend/qgis-js-demo" target="_blank" alt="GitHub" title="Open in GitHub"
    class="text-xl slidev-icon-btn opacity-50 !border-none !hover:text-white">
    <carbon-logo-github />
  </a>
</div>

<!--
The last comment block of each slide will be treated as slide notes. It will be visible and editable in Presenter Mode along with the slide. [Read more in the docs](https://sli.dev/guide/syntax.html#notes)
-->

---
layout: image-right
image:
hideInToc: true
---

# Inhalt

<Toc maxDepth="1"></Toc>

---
src: ./pages/03-intro.md
---

---
src: ./pages/04-qgis-js.md
---

---
src: ./pages/05-webassembly.md
---

---
src: ./pages/06-architektur.md
---

---
src: ./pages/07-features.md
---

---
src: ./pages/08-features-symbols.md
---

---
src: ./pages/09-features-rasters.md
---

---
src: ./pages/10-features-labels.md
---

---
src: ./pages/11-features-diagrams.md
---

---
src: ./pages/12-demo.md
---

---
src: ./pages/13-potential.md
---

---
src: ./pages/14-limitation.md
---

---
src: ./pages/15-licence.md
---

---
src: ./pages/16-future.md
---

---
routeAlias: thanks
layout: center
class: text-center
hideInToc: true
---

# Vielen Dank für Ihre Aufmerksamkeit!

<a href="https://github.com/boardend" target="_blank">Michael Schmuki</a> &amp; <a href="https://github.com/andreasneumann" target="_blank">Andreas Neumann</a>

<br />

**qgis-js** Website: [https://qgis.github.io/qgis-js](https://qgis.github.io/qgis-js/)

**qgis-js** auf GitHub: [https://github.com/qgis/qgis-js](https://github.com/qgis/qgis-js)

**qgis-js** auf npm: [https://www.npmjs.com/package/qgis-js](https://www.npmjs.com/package/qgis-js)

<br /><br />

**Interaktive Slides**: [https://boardend.github.io/qgis-js-demo](https://boardend.github.io/qgis-js-demo/)
