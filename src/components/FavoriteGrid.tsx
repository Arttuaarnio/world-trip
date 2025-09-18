import type { Country } from "../types.ts";
import { CountryCard } from "./CountryCard";

type FavoriteGridProps = {
  favorites: Country[];
  onRemove: (country: Country) => void;
};

export function FavoriteGrid({ favorites, onRemove }: FavoriteGridProps) {
  if (favorites.length === 0) {
    return <p>No favorites yet.</p>;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: "1rem",
        marginTop: "2rem",
        justifyContent: "center",
      }}
    >
      {favorites.map((country) => (
        <CountryCard
          key={country.name}
          country={country}
          isFavoriteView
          onRemoveFromFavorites={onRemove}
        />
      ))}
    </div>
  );
}
