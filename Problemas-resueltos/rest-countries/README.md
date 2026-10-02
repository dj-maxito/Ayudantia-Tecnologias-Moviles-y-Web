## **Actividad de ayudantía: “Countries by region” (React + React-Leaflet + Countries.dev)**

**Objetivo:** Renderizar un **mapa interactivo**, capturar **coordenadas por
click** o **geolocalización**, y consultar **los países** por región.

---

* Trabajo individual (apoyo en parejas opcional).
* Requiere **Node.js ≥ 24.x** y **pnpm**.
* Proyecto con **Vite + React (JS)**.
* API pública: **countries.dev** (gratis y sin key). ([Countries.dev][1])
* Tiles: **OpenStreetMap** con **atribución obligatoria**. ([leafletjs.com][2])

---

### **Setup**

```bash
pnpm create vite countries-region
# Framework: React  | Variant: JavaScript
cd countries-region
pnpm add react-leaflet leaflet
pnpm install
```

En `src/main.jsx` o `src/App.jsx` **importa el CSS** de Leaflet:

```js
import "leaflet/dist/leaflet.css";
```

> Recuerda incluir **attribution** en la capa de tiles OSM. ([leafletjs.com][2])

---

## **Descripción general de la página**
* Tener un mapa interactivo, donde se pueda colocar un marcador en un continente, y este te devuelva los países que se encuentran en él.
* Puede devolverlos en un popup, o en una lista abajo del mapa.

## Enlaces

* countries.dev (docs): ([countries.dev][1])
* React-Leaflet (instalación): ([React Leaflet][5])
* Leaflet Quick Start (tiles + attribution): ([leafletjs.com][2])
* OSM Tile Usage Policy (atribución obligatoria): ([operations.osmfoundation.org][6])

[1]: https://countries.dev "countries.dev.com:  Free Open-Source Countries API"
[2]: https://leafletjs.com/examples/quick-start "Quick Start Guide - Leaflet - a JavaScript library for interactive maps"
[5]: https://react-leaflet.js.org/docs/start-installation "Installation"
[6]: https://operations.osmfoundation.org/policies/tiles "Tile Usage Policy - OSMF Operations Working Group" 