export default function WeatherPanel({ data, isLoading, error }) {
  if (isLoading) {
    return <p>Cargando clima...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!data) {
    return <p>Haz click en el mapa para consultar el clima</p>;
  }

  return (
    <div>
      <h2>Clima actual</h2>

      <p>
        Temperatura:{" "}
        {data.current.temperature_2m}{" "}
        {data.current_units.temperature_2m}
      </p>

      <p>
        Viento:{" "}
        {data.current.wind_speed_10m}{" "}
        {data.current_units.wind_speed_10m}
      </p>

      <p>
        Weather code:{" "}
        {data.current.weather_code}
      </p>
    </div>
  );
}