import { MapContainer, TileLayer, CircleMarker, useMapEvents, Popup } from "react-leaflet";
import WeatherPanel from "./WeatherPanel";

function MapClick({ onMapClick }) {
  useMapEvents({
    click(e) {
      onMapClick({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });

  return null;
}

export default function MapView({ coord, onMapClick, data, isLoading, error }) {
  return (
    <MapContainer
      center={[-41.469, -72.942]}
      zoom={10}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MapClick onMapClick={onMapClick} />

      <CircleMarker
        center={[coord.lat, coord.lng]}
        radius={10}
      >
        <Popup>
          <WeatherPanel
            data={data}
            isLoading={isLoading}
            error={error}
          />
        </Popup>
      </CircleMarker>
    </MapContainer>
  );
}