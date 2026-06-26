// App component

// React tools
import { useState, useEffect } from 'react';
import { useDebounce } from 'react-use';

// Components and styles
import './App.css'
import Search from './components/Search';
import Spinner from './components/Spinner';
import MovieCard from './components/MovieCard';
import { getTrendingMovies, updateSearchCount } from './services/appwrite';

// API end point - to get movies
const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY      = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS  = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
} 

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [movieList, setMovieList] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);

  // Optimize search - debouncing
  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);


  useEffect(() => {
      // search, fetch movies 
      async function fetchMovies (query = '') {
        setIsLoading(true);
        setErrorMessage('');

        try {
          const endPoint = query
          ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
          : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
          
          const response = await fetch(endPoint, API_OPTIONS);
          if (!response.ok) {
            throw new Error('Failed to fetch movies');
          }

          const data = await response.json();    
          setMovieList(data.results || []);

          if(query && data.results.length > 0) {
            await updateSearchCount(query, data.results[0]);
          }

        } catch (error) {
          console.error(`Error fetching movies: ${error}`);
          
          setMovieList([]);
          setErrorMessage('Failed to fetch movies. Please try again.');

        } finally {
          setIsLoading(false);

        }
    }

    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    // load trending movies ONLY once - after initial render
    async function loadTrendingMovies() {
    try {
      const movies = await getTrendingMovies();

      setTrendingMovies(movies);

    } catch(e) {
      console.error(`Error fetching trending movies: ${e}`);
      
    }
  }

  loadTrendingMovies();
  }, []);

  
  return (
    <main>
      <div className="pattern"/>

      <div className='wrapper'>
        <header>
          <img src='hero.png' alt='hero-banner'/>
          <h1>Find <span className='text-gradient'>Movies</span> That Resonate With You</h1>

        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        </header>

        {trendingMovies.length > 0 && (
          <section className='trending'>
            <h2>Trending Movies</h2>

            <ul>
              {trendingMovies.map((movie, index) => 
                <li key={movie.$id}>
                  <p>{index + 1}</p>
                  <img src={movie.poster_url} alt={movie.title}/>
                </li>
              )}
            </ul>
          </section>
        )}

        <section className='all-movies'>
          {debouncedSearchTerm.length !== 0 
          ? (<> <br /><br /> </>)
          : <h2>Popular</h2>}

          {isLoading ? (
            <Spinner />
          ) : (
            errorMessage ? (
              <p className='text-red-500'>{errorMessage}</p>
            ) : (
              <ul>
                {movieList.length !== 0
                ? movieList.map((movie) => (
                  <MovieCard key={movie.id} movie={movie}/>
                ))
                : <p className='text-white'>🚧 Seems like we don't have what you ask</p>
              }
              </ul>
            )
          )}
        </section>
      </div>
    </main>
  );
}

