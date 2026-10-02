import { useState } from "react";
import MapView from "./components/MapView";
import CountryPanel from "./components/CountryPanel";
import "leaflet/dist/leaflet.css";

function App() {
  const [coord, setCoord] = useState({ lat: -41.469, lng: -72.942 });

  const [region, setRegion] = useState(null);
  const [countries, setCountries] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleMapClick = async ({ lat, lng }) => {
    setCoord({ lat, lng });

    // Limpiamos posibles estados anteriores
    setIsLoading(true);
    setError(null);
    setCountries([]);
    setRegion(null);

    try {
      // Determinamos la región según las coordenadas
      const selectedRegion = getRegion(lat, lng);

      if (!selectedRegion) {
        throw new Error(
          "No se pudo determinar una región para esta ubicación"
        );
      }

      setRegion(selectedRegion);

      // Llamamos a la api de countries.dev :]
      const response = await fetch(
        `https://countries.dev/region/${selectedRegion}`
      );

      if (!response.ok) {
        throw new Error(
          "No se pudieron obtener los países"
        );
      }

      const data = await response.json();

      setCountries(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Countries by Region</h1>

      <MapView
        coord={coord}
        onMapClick={handleMapClick}
      />

      <CountryPanel
        region={region}
        countries={countries}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
}

// Determinamos una región aproximada a partir de la latitud y la longitud
function getRegion(lat, lng) {
  // América
  if (lng >= -170 && lng <= -30) {
    return "Americas";
  }

  // Europa
  if ( lat >= 35 && lat <= 72 && lng >= -25 && lng <= 45 ) {
    return "Europe";
  }

  // África
  if ( lat >= -35 && lat <= 37 && lng >= -20 && lng <= 55 ) {
    return "Africa";
  }

  // Asia
  if ( lat >= 5 && lat <= 80 && lng >= 40 && lng <= 180 ) {
    return "Asia";
  }

  // Oceanía
  if ( lat >= -50 && lat <= 0 && lng >= 110 && lng <= 180 ) {
    return "Oceania";
  }

  // Antártida
  if (lat < -60) {
    return "Polar";
  }

  return null;
}

export default App;