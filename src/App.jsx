// App component

// React tools
import { useState, useEffect } from 'react';
import { useDebounce } from 'react-use';

// Components and styles
import './App.css'
import Search from './components/Search';
import Spinner from './components/Spinner';
import MovieCard from './components/MovieCard';

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
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <main>
      <div className="pattern"/>

      <div className='wrapper'>
        <header>
          <img src='hero.png' alt='hero-banner'/>
          <h1>Find <span className='text-gradient'>Movies</span> That Resonate With You</h1>

        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        </header>

        <section className='all-movies'>
          {debouncedSearchTerm.length !== 0 
          ? (<> <br /><br /> </>)
          : <h2 className='mt-[50px]'>Popular</h2>}

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

