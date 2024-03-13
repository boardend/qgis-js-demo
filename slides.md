---
theme: ./theme
fonts:
  provider: "none"
class: text-center
highlighter: shikiji
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
    <h2 style="padding-bottom: 0.5em"><a>Andreas Neumann</a> &amp; <a>Michael Schmuki</a></h2>
    <h3>FOSSGIS-Konferenz 2024 @ Hamburg</h3>
  </span>
  <br /><br />
</div>

<div class="abs-br m-6 flex gap-2">
  <button @click="$slidev.nav.openInEditor()" title="Open in Editor" class="text-xl slidev-icon-btn opacity-50 !border-none !hover:text-white">
    <carbon:edit />
  </button>
  <a href="https://github.com/slidevjs/slidev" target="_blank" alt="GitHub" title="Open in GitHub"
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
routeAlias: slidev-learn-more
layout: center
class: text-center
hideInToc: true
---

# Learn More

[Documentations](https://sli.dev) · [GitHub](https://github.com/slidevjs/slidev) · [Showcases](https://sli.dev/showcases.html)
