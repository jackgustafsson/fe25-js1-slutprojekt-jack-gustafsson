/**
 * api.js är applikationens API-lager och ansvarar för all kommunikation med The Movie Database.
 * Med hjälp av en API-nyckel kan man hämta film- och persondata och returnera det.
 */

const API_KEY = "8999991e6f1cb75c9801b737d0158922"

export async function getTopRatedMovies(){
    try{
        const url = `https://api.themoviedb.org/3/movie/top_rated?page=1&api_key=${API_KEY}`;
        const response = await axios.get(url);
        return response.data.results;    
    } catch(error) {
        throw error;
    }
}

export async function getPopularMovies(){
    try{
        const url = `https://api.themoviedb.org/3/movie/popular?page=1&api_key=${API_KEY}`;
        const response = await axios.get(url);
        return response.data.results;
    } catch(error) {
        throw error;
    }
}

export async function getPeopleBySearch(name){
    try{
        const url = `https://api.themoviedb.org/3/search/person?query=${name}&page=1&api_key=${API_KEY}`;
        const response = await axios.get(url);
        return response.data.results;
    } catch(error) {
        throw error;   
    }
}

export async function getMoviesBySearch(movie){
    try{
        const url = `https://api.themoviedb.org/3/search/movie?query=${movie}&page=1&api_key=${API_KEY}`;
        const response = await axios.get(url);
        return response.data.results;
    } catch(error) {
        throw error;
    }
}

export async function getMovie(id){
    try{
        const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`;
        const response = await axios.get(url);
        return response.data;
    } catch(error) {
        throw error;
    }
}   