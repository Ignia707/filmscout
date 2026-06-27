// Connect backend to frontend


const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// helper function to get data
const fetchFromAPI = async(endPoint) => {
    
    let lastError;

    // Consecutive trials before error
    for (let i = 0; i < 7; i++) {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}${endPoint}`);
            const movies = await response.json();

            if(response.ok && movies.success) {
                return movies.data;
            }

            lastError = new Error(movies.message || 'Error fetching movies');

        } catch(err){
            lastError = err;
        }

        await delay(200);
    } 
    
    throw lastError;
}


// getfunctions - to GET movies from response objects

const getDiscoverMovies = async() => {
    return await fetchFromAPI('/discover');

}

const searchMovies = async(query) => {
    return await fetchFromAPI(`/search?query=${encodeURIComponent(query)}`);
}

const getTrendingMovies = async() => {
    return await fetchFromAPI('/trending');
}


export { 
    getDiscoverMovies,
    searchMovies,
    getTrendingMovies
 };