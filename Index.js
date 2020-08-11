const REST_ADDR = "http://localhost:9001/";

//Comment control

function getAllComments() {
    let request = new XMLHttpRequest();
    request.open('GET', REST_ADDR + "all", true);    

    console.log('Request sent');

    request.onload = function() {
        console.log('In onload handler');

        tbl = $('#CommentList tbody');
        tbl.empty();
            
        data = JSON.parse(this.response);
        console.log(data);
        
        data.forEach((comment) => {
            tbl.append('<tr><td>' + comment.comment + '</td><td>' + comment.name + '</td></tr>');
        });
    }

    request.send();
}

function addNewComment(comment, name) {
    let request = new XMLHttpRequest();
    request.open('POST', REST_ADDR + "insert", true);
    console.log('Request sending ...');
    //request.send("comment=" + comment + "&name=" + name);

    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    request.send(JSON.stringify({
        comment : comment,
        name : name
    }));
}

function addNewCommentFromForm() {
    let comment = $("#NewComment").val();
    let name = $("#NewUserName").val();

    if(name.length == 0) {
        name = "Anonymous";
    }

    if(comment.length == 0) {
        window.alert("Sorry, you didn't enter any comment!");
    } else {
        //window.alert('comment ' + comment + ' name ' + name);    

        addNewComment(comment, name);
        window.alert('Added the new comment: ' + name);

        getAllComments();
    }

    return false;
}

function deleteComment(id){
    let request = new XMLHttpRequest();
    request.open('GET', REST_ADDR + 'comment/'+ id, true);
    request.send();

}

function deleteCommentFromForm(){
    let id = parseInt($("#NewCommentID").val());

    deleteStudent(id);
    window.alert('Comment deleted');

    getAllStudents();

    return false;
}

function setupOnLoad() {
    getAllComments();
}

//Youtube control
let homepage_data = undefined;

function getHomepageData() {
    let request = new XMLHttpRequest();
    request.open('GET', REST_ADDR + "allHome", true);    

    console.log('Request sent');

    request.onload = function() {
        console.log('In onload handler');
            
        data = JSON.parse(this.response);
        console.log(data);

        homepage_data = data;
        poster_id = 0;

        // Update the homepage images
        data.forEach((item) => {
            id_tag = '#Poster' + poster_id;  // #Poster0, #Poster1, etc.
            poster_img = $(id_tag);
            poster_img.attr('src', item.image);
            poster_img.attr('alt', item.altText);
            poster_img.attr('title', item.altText);
            poster_img.click(function() { updateHomeData(item); });
            poster_id++;
        });
    }

    request.send();
}

function updateHomeData(item) {
    $('#movieTrailer').attr('src', 'https://www.youtube.com/embed/' + item.video);
    $('#movieTitle').html(item.title);
    $('#movieDesc').html(item.description);
}

function setupHomepageOnload() {
    getHomepageData();
    getAllComments();

}


//Image control