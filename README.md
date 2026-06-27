# FilmScout - Movie Search App

A movie discovery app where users can search for movies and see trending searches based on real usage.

## Features

- Search and discover movies via The Movie Database (TMDB) API
- Debounced search input
- Trending Movies section — tracks and ranks the most-searched terms
- Responsive UI with Tailwind CSS

## Tech Stack

- **Frontend:** React (Vite), Tailwind CSS
- **Backend:** Node.js, Express, MongoDB
- **Movie data:** TMDB API
- **Deployment:** Vercel (frontend), Render (backend)

## Architecture

This started as a tutorial project using Appwrite (BaaS) for search tracking. It's since been rebuilt with a custom Express + MongoDB backend, which now also proxies TMDB requests server-side (keeping the API key off the client). `client/src/services/appwrite.js` is kept in the repo as a reference to the original implementation.
```
filmScout/

├── client/   → React frontend

└── server/   → Express + MongoDB backend
```
## Getting Started

**Backend**
```bash
cd server
npm install
npm run dev
```
Create `server/.env`:
```bash
PORT=3000
MONGO_URI=your_mongodb_connection_string
TMDB_API_KEY=your_tmdb_api_key
FRONTEND_URL=http://localhost:5173
```

**Frontend**
```bash
cd client
npm install
npm run dev
```
Create `client/.env.local`:
```bash
VITE_BACKEND_API_URL=http://localhost:3000/api/movies
```
---