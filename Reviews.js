const REST_ADDR = "http://localhost:9001/";

function getAllReviews() {
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
            console.log('Looking at movie: ' + movieNum);

            if(movieNum < 50) {
                idTag = '#Movie' + movieNum;  // #Movie0, ...
                titleContainer = $(idTag + ' .reviewTitle');  // #Movie0 .movie-name
                titleContainer.html(movie.title); 
                reviewContainer = $(idTag + ' .reviewText');
                reviewContainer.html(movie.review);
                img = $(idTag + ' .movie-pic');
                //console.log(img);
                img.attr('src', 'images/' + movie.image);
                
                chyrate = $(idTag + ' .chyrate');
                chyrate.html(movie.chyrate);
                dateContainer = $(idTag + ' .releaseDate');
                dateContainer.html(movie.releaseDate);
            }
            movieNum++;
           
        });
    }

    request.send();
}

function setupReviewsOnLoad() {
    getAllReviews();
}