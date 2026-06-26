# filmScout - Movie Search App

A movie discovery app where users can search for movies and see trending searches based on real usage.

## Features

- Search movies via The Movie Database API
- Debounced search input 
- Trending Movies section — tracks and ranks the most-searched movies
- Responsive UI with Tailwind CSS

## Tech Stack

- **Frontend:** React (Vite)
- **Styling:** Tailwind CSS
- **Backend (current):** Appwrite (Cloud) - BaaS
- **Movie data:** TMDB API

## Status

- Currently building a custom Node.js/Express + MongoDB backend to replace Appwrite as a learning project
- The two backends are designed to be swappable via an `env` variable, so this README will be updated once that's live.

## Getting Started

```bash
npm install
npm run dev
```

Create a `.env.local` file with:
```bash
VITE_TMDB_API_KEY=your_tmdb_api_key

VITE_APPWRITE_PROJECT_ID=your_project_id

VITE_APPWRITE_DATABASE_ID=your_database_id

VITE_APPWRITE_TABLE_ID=your_table_id

VITE_APPWRITE_ENDPOINT=your_appwrite_region_endpoint
```

---