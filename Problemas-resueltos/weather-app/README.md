## **Solución de actividad en Clase: “Weather Map” (React + React-Leaflet + Open-Meteo)**
---

### **Setup**

```bash
pnpm create vite weather-map
# Framework: React  | Variant: JavaScript
cd weather-map
pnpm add react-leaflet leaflet
pnpm install
```

En `src/main.jsx` o `src/App.jsx` **importa el CSS** de Leaflet:

```js
import "leaflet/dist/leaflet.css";
```

> Recuerda incluir **attribution** en la capa de tiles OSM. ([leafletjs.com][2])

---

## **Requisitos**

### 1) Estructura base ✔️

```
src/
  App.jsx
  components/
    MapView.jsx
    WeatherPanel.jsx
```

---

### 2) MapView: mapa con click y geolocalización ✔️

* Centrar inicialmente en **Puerto Montt** `[-41.469, -72.942]`.
* Intentar `navigator.geolocation.getCurrentPosition` para centrar si el usuario autoriza.
* Al **hacer click** en el mapa, guardar `{lat, lng}` y mostrar un **marcador**
(usa `CircleMarker` para evitar problemas de assets de iconos).

> La URL y la atribución siguen las guías de Leaflet/OSM. ([leafletjs.com][2])

---

### 3) Pedir el clima al hacer click ✔️

* El click en el mapa es el disparador. Ahí va el `fetch`, no en el render.
* Endpoint con **coordenadas** y **clima actual**.
* Guardar `data`, `isLoading` y `error` en el estado de `App`.


> Open-Meteo es **gratis y sin API key**; soporta CORS y variables por hora/día. ([Open Meteo][1])

---

### 4) WeatherPanel: mostrar 3 estados (carga, error, datos) ✔️

- Manejar el estado de carga y errores en el componente, y mostrar los datos si existen.
---

### 5) Integración en `App.jsx` ✔️

- `App` mantiene `coord`, `data`, `isLoading` y `error`, y le pasa el handler
  al mapa.
---

## **Criterios de aceptación (mínimos)** ✔️

1. El mapa **renderiza** con tiles OSM y **atribución visible**. ([leafletjs.com][2])
2. **Click** en el mapa → aparece un **marcador** y se guardan `{lat, lng}`.
3. Se consulta Open-Meteo con esas coordenadas y se muestran **temp**,
   **viento** y **weathercode**. ([Open Meteo][3])
4. UI maneja **tres estados**: `isLoading`, `error`, `data`.
5. Geolocalización: si el usuario acepta, el mapa **centra** en su posición.

---

## **Extensiones opcionales** ➖

* Botón **“Usar mi ubicación”** explícito (además del auto-intento).
* Convertir `weathercode` a texto (tabla propia simple).
* Mostrar **layer** de Marker con popup y los datos de clima.
* Añadir **control** para cambiar el **zoom** o un **minimap**.
* Caja de búsqueda por ciudad con **Open-Meteo Geocoding**. ([Open Meteo][4])
