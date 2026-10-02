import { useState } from "react";
import MapView from "./components/MapView";
import "leaflet/dist/leaflet.css";

function App() {
  const [coord, setCoord] = useState({ lat: -41.469, lng: -72.942 });

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleMapClick = async ({ lat, lng }) => {
    setCoord({ lat, lng });

    setIsLoading(true);
    setError(null);
    setData(null);

    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,wind_speed_10m,weather_code`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("No se pudo obtener el clima");
      }

      const result = await response.json();

      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Weather Map</h1>

      <MapView
        coord={coord}
        onMapClick={handleMapClick}
        data={data}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
}

export default App;