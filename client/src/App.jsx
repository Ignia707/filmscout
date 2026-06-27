// App component

// React tools
import { useState, useEffect } from 'react';
import { useDebounce } from 'react-use';

// Components and styles
import './App.css'
import Search from './components/Search';
import Spinner from './components/Spinner';
import MovieCard from './components/MovieCard';
import { getDiscoverMovies, searchMovies as searchMoviesAPI, getTrendingMovies } from './services/api';


export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  const [trendingError, setTrendingError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [isTrendingLoading, setIsTrendingLoading] = useState(false);

  const [movieList, setMovieList] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);

  // Optimize search - debouncing
  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

  // fetch movies on query
  useEffect(() => {
      // search, fetch movies 
      async function fetchMovies (query = '') {
        setIsLoading(true);
        setErrorMessage('');

        try {
          // gets results : all movies OR searched results
          const results = query 
            ? await searchMoviesAPI(query) 
            : await getDiscoverMovies();
          
          setMovieList(results);

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

  // fetch trending movies on mount
  useEffect(() => {
    // load trending movies ONLY once - after initial render
    async function loadTrendingMovies() {
      setIsTrendingLoading(true);
      setTrendingError('');

      try {
        const movies = await getTrendingMovies();

        setTrendingMovies(movies);

      } catch(e) {
        console.error(`Error fetching trending movies: ${e}`);
        setTrendingError('Unable to fetch trending movies. Please try again.');

      } finally {
        setIsTrendingLoading(false);
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

        <section className='trending'>
          {isTrendingLoading ? (
              <Spinner />
            ) : trendingError ? (
              <p className='text-red-500'>{trendingError}</p>
            ) : trendingMovies.length > 0 ? (
              <>
                <h2>Trending Movies</h2>
                <ul>
                  {trendingMovies.map((movie, index) => 
                    <li key={movie.$id}>
                      <p>{index + 1}</p>
                      <img src={movie.poster_url} alt={movie.title}/>
                    </li>
                  )}
                </ul>
              </>
            ) : (
              <p className='text-red-500'>Off-trending season. We'll get back with trending movies soon</p>
            )}
        </section>


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

