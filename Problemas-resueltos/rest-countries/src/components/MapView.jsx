import { MapContainer, TileLayer, CircleMarker, useMapEvents } from "react-leaflet";

function MapClick({ onMapClick }) {
  useMapEvents({
    click(event) {
      onMapClick({ lat: event.latlng.lat, lng: event.latlng.lng });
    },
  });

  return null;
}

export default function MapView({ coord, onMapClick }) {
  return (
    <MapContainer
      center={[-41.469, -72.942]}
      zoom={3}
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
      />
    </MapContainer>
  );
}
