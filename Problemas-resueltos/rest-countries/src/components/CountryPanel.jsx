export default function CountryPanel({ region, countries, isLoading, error }) {

  if (isLoading) { return <p>Cargando países...</p>; }
  if (error) { return <p>Error: {error}</p>; }
  if (!region) {
    return (
      <p>
        Haz click en el mapa para seleccionar una región
      </p>
    );
  }

  return (
    <div>
      <h2>Región: {region}</h2>

      <p>
        Países encontrados: {countries.length}
      </p>

      <ul>
        {countries.map((country) => (
          <li key={country.alpha3Code}>
            {country.name}
          </li>
        ))}
      </ul>
    </div>
  );
}