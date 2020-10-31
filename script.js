
// Called whe the page is loaded
window.onload = () =>  {
    getOriginals();
    getTrendingNow();
    getTopRated();
    getPopularMovies();
    getUpcomingMovies();
    getPopularTv();
    getTvAiringToday()
}

async function getMovieTrailer(id) {
    var url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=81c90e4339677485a28cc4b6293dc802&language=en-US`
    return await fetch(url)
    .then((response)=>{
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("something went wrong");
        }
    })
}

const setTrailer = (trailers) => {
    const iframe = document.getElementById('movieTrailer');
    const movieNotFound = document.querySelector('.movieNotFound');
    if(trailers.length > 0 ){
        movieNotFound.classList.add('d-none');
        iframe.classList.remove('d-none');
        iframe.src = `https://www.youtube.com/embed/${trailers[0].key}`
    } else {
        iframe.classList.add('d-none');
        movieNotFound.classList.remove('d-none');
    }
}


const handleMovieSelection = (e) => {
    const id = e.target.getAttribute('data-id');
    const iframe = document.getElementById('movieTrailer');
    // here we need the id of the movie
    getMovieTrailer(id).then((data)=>{
        const results = data.results;
        const youtubeTrailers = results.filter((result)=>{
            if(result.site == "YouTube" && result.type == "Trailer"){
                return true;
            } else {
                return false;
            }
        })
        setTrailer(youtubeTrailers);
    });

    // open modal
    $('#trailerModal').modal('show')
    // we need to call the api with the ID 


}

function showMovies(movies, element_selector, path_type ){
    var moviesEl = document.querySelector(element_selector);
    for(var movie of movies.results){
        var imageElement = document.createElement('img');
        imageElement.setAttribute('data-id', movie.id);
        imageElement.src = `https://image.tmdb.org/t/p/original${movie[path_type]}`;
        
        imageElement.addEventListener('click', (e)=>{
            handleMovieSelection(e); 
        });
        moviesEl.appendChild(imageElement);
    }
}

function fetchMovies(url, element_selector, path_type ){
    fetch(url)
    .then((response)=>{
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("something went wrong");
        }
    })
    .then((data)=>{
        showMovies(data, element_selector, path_type);
    })
    .catch((error_data)=>{
        console.log(error_data);
    })
}

function getOriginals(){
    var url = "https://api.themoviedb.org/3/discover/tv?api_key=81c90e4339677485a28cc4b6293dc802&with_networks=213";
    fetchMovies(url, ".original__movies", "poster_path");
}

function getTrendingNow(){
    var url = "https://api.themoviedb.org/3/trending/movie/week?api_key=81c90e4339677485a28cc4b6293dc802"
    fetchMovies(url, '#trending', 'backdrop_path' );
}

function getTopRated(){
    var url = "https://api.themoviedb.org/3/movie/top_rated?api_key=81c90e4339677485a28cc4b6293dc802&language=en-US&page=1"
    fetchMovies(url, "#top_rated", "backdrop_path");
}

function getPopularMovies(){
    var url = "https://api.themoviedb.org/3/movie/popular?api_key=81c90e4339677485a28cc4b6293dc802&language=en-US&page=1"
    fetchMovies(url, "#popular_movies", "backdrop_path");
}

function getUpcomingMovies(){
    var url = "https://api.themoviedb.org/3/movie/upcoming?api_key=81c90e4339677485a28cc4b6293dc802&language=en-US&page=1"
    fetchMovies(url, "#upcoming_movies", "backdrop_path");
}

function getPopularTv(){
    var url = "https://api.themoviedb.org/3/tv/popular?api_key=81c90e4339677485a28cc4b6293dc802&language=en-US&page=1"
    fetchMovies(url, "#popular_tv", "backdrop_path");
}

function getTvAiringToday(){
    var url = "https://api.themoviedb.org/3/tv/airing_today?api_key=81c90e4339677485a28cc4b6293dc802&language=en-US&page=1"
    fetchMovies(url, "#tv_airing_today", "backdrop_path");
}




