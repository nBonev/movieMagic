import movies from "../movies.js";

export default {
    findMovie(movieId) {
        const result = movies.find(movie => movie.id === movieId);
    
        return result;
    }
}