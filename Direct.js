const REST_ADDR = "http://localhost:9001/";

function getAllDirectors() {
    let request = new XMLHttpRequest();
    request.open('GET', REST_ADDR + "allDirect", true);    

    console.log('Request sent');

    request.onload = function() {
        console.log('In onload handler');

        //container = $('#DirectorsList');
        //container.html('');
            
        data = JSON.parse(this.response);
        console.log(data);
        
        // Only fetch first 5 directors
        let directNum = 0;

        data.forEach((director) => {
            if(directNum < 5) {
                idTag = '#Director' + directNum;
                nameContainer = $(idTag + ' .director-name');
                nameContainer.html(director.name);
                bioContainer = $(idTag + ' .director-desc');
                bioContainer.html(director.bio);
                img = $(idTag + ' .director-pic');
                img.attr('src', director.img);
                favouriteMovie = $(idTag + ' .director-movie-inner');
                favouriteMovie.html(director.movie);
            }
            directNum++;
            //tbl.append('<tr><td>' + comment.comment + '</td><td>' + comment.name + '</td></tr>');
        });
    }

    request.send();
}

function setupDirectorsOnLoad() {
    getAllDirectors();
}