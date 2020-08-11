const REST_ADDR = "http://localhost:9001/";

function getAllDirectors() {
    let request = new XMLHttpRequest();
    request.open('GET', REST_ADDR + "allMovies", true);    

    console.log('Request sent');

    request.onload = function() {
        console.log('In onload handler');

            
        data = JSON.parse(this.response);
        console.log(data);
        
        // Only fetch first 5 Movies
        let movieNum = 0;

        data.forEach((movie) => {
            if(movieNum < 5) {
                idTag = '#Movie' + movieNum;  // #Movie0, ...
                titleContainer = $(idTag + ' .reviewTitle');  // #Movie0 .movie-name
                titleContainer.html(movie.title); 
                reviewContainer = $(idTag + '.reviewText');
                reviewContainer.html(movie.review);
                img = $(idTag + ' .movie-pic');
                img.attr('src', movie.img);
                chyrate =$(idTag + '.chyrate')



                idTag = '#Movie' + movieNum;
                nameContainer = $(idTag + ' .director-name');
                nameContainer.html(director.name);
                bioContainer = $(idTag + ' .director-desc');
                bioContainer.html(director.bio);
                img = $(idTag + ' .director-pic');
                img.attr('src', director.image);
                favouriteMovie = $(idTag + ' .director-movie-inner');
                favouriteMovie.html(director.movie);
            }
            movieNum++;
           
        });
    }

    request.send();
}

function setupDirectorsOnLoad() {
    getAllDirectors();
}