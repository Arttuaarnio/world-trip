# 🌍 World Trip

A simple React + TypeScript application that lets you explore countries around the world.

You can search for a country and see:

- **The flag**
- **Capital city**
- **Population**
- **Official languages**
- **Local currency and exchange rate against EUR if available**

You can also **save countries to favorites** (stored in localStorage) and view them later.

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/Arttuaarnio/world-trip.git
cd world-trip
```

## Running the Project (Docker or Local)

### With Docker

Make sure you have Docker and docker-compose installed.

```bash
# Build and start
docker-compose up --build
```

App runs on [http://localhost:3000](http://localhost:3000)

### Local Development

```bash
# Install dependencies
npm install
```
```bash
# Start dev server
npm run dev
```

App runs on [http://localhost:5173](http://localhost:5173)

---

## Project Structure

```
.
├── src
│   ├── components      # (SearchBar.tsx, CountryCard.tsx, FavoriteGrid.tsx)
│   ├── pages           # (HomePage.tsx)
│   ├── services        # API services (countries.ts, currency.ts)
│   ├── App.tsx
│   └── main.tsx
├── public
├── package.json
├── Dockerfile
├── docker-compose.yml
├── .dockerignore
└── README.md
```

## Tech Stack

- **React + TypeScript + Vite** → frontend
- **REST Countries API** → country data
- **Frankfurter API** → currency rates
- **localStorage** → persist favorites
- **Docker + Nginx** → containerized production build
