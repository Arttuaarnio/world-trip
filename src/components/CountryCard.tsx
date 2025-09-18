import type { Country } from "../types.ts";

type Props = {
  country: Country;
  onAddToFavorites?: (country: Country) => void;
  onRemoveFromFavorites?: (country: Country) => void;
  isFavoriteView?: boolean;
};

export function CountryCard({
  country,
  onAddToFavorites,
  onRemoveFromFavorites,
  isFavoriteView = false,
}: Props) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        backgroundColor: "rgba(255, 255, 255, 0.52)",
        padding: "1rem",
        maxWidth: "360px",
      }}
    >
      <h3>{country.name}</h3>
      <img
        src={country.flag}
        alt={`${country.name} flag`}
        style={{ width: "100%", borderRadius: "4px", border: "1px solid #000000ff" }}
      />

      <p>
        <strong>Capital:</strong> {country.capital}
      </p>
      <p>
        <strong>Population:</strong> {country.population.toLocaleString()}
      </p>
      <p>
        <strong>Languages:</strong> {country.languages.join(", ")}
      </p>
      <p>
        <strong>Currency:</strong> {country.currency}
      </p>
      {country.rateToEur && (
        <p>
          <strong>Rate:</strong> 1 {country.currency} = {country.rateToEur} EUR
        </p>
      )}

      {!isFavoriteView && onAddToFavorites && (
        <button onClick={() => onAddToFavorites(country)}>
          Add to favorites
        </button>
      )}
      {isFavoriteView && onRemoveFromFavorites && (
        <button onClick={() => onRemoveFromFavorites(country)}>
          ❌ Remove
        </button>
      )}
    </div>
  );
}
