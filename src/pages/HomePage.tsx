import { useEffect, useState } from "react";
import { SearchBar } from "../components/SearchBar";
import { CountryCard } from "../components/CountryCard";
import { FavoriteGrid } from "../components/FavoriteGrid";
import { fetchCountryByName } from "../services/countries";
import { fetchCurrencyRate } from "../services/currency";
import type { Country } from "../types";

export default function HomePage() {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [favorites, setFavorites] = useState<Country[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // fetch localStorage favorites
  useEffect(() => {
    const saved = localStorage.getItem("favorites");
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  const handleSearch = async (query: string) => {
    setLoading(true);
    setError(null);

    try {
      // search country
      const countryData = await fetchCountryByName(query);

      const country: Country = {
        name: countryData.name.common,
        flag: countryData.flags.png,
        capital: countryData.capital?.[0] ?? "N/A",
        population: countryData.population,
        languages: Object.values(countryData.languages || {}),
        currency: Object.keys(countryData.currencies || {})[0] || "N/A",
        countryCode: countryData.cca2,
      } as any;

      // search currency rate to EUR if available
      if (country.currency !== "EUR" && country.currency !== "N/A") {
        try {
          const rateData = await fetchCurrencyRate(country.currency);
          country.rateToEur = rateData.rates.EUR;
        } catch {
          console.warn("Currency fetch failed");
        }
      }

      setSelectedCountry(country);
    } catch (err) {
      setError("Country not found");
      setSelectedCountry(null);
    } finally {
      setLoading(false);
    }
  };

  const addToFavorites = (country: Country) => {
    if (!favorites.some((c) => c.name === country.name)) {
      const updated = [...favorites, country];
      setFavorites(updated);
      localStorage.setItem("favorites", JSON.stringify(updated));
    }
  };

  const removeFromFavorites = (country: Country) => {
    const updated = favorites.filter((c) => c.name !== country.name);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <div
      style={{
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <h1>Welcome to World Trip</h1>
      <h2>Search for a country and add it to favorites!</h2>
      <SearchBar onSearch={handleSearch} />

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {selectedCountry && (
        <CountryCard
          country={selectedCountry}
          onAddToFavorites={addToFavorites}
        />
      )}

      <h2>Favorites</h2>
      <FavoriteGrid favorites={favorites} onRemove={removeFromFavorites} />
    </div>
  );
}
