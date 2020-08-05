const REST_ADDR = "http://localhost:9001/";

function getAllStudents() {
    let request = new XMLHttpRequest();
    request.open('GET', REST_ADDR + "all", true);    

    console.log('Request sent');

    request.onload = function() {
        console.log('In onload handler');

        tbl = $('#StudentList tbody');
        tbl.empty();
            
        data = JSON.parse(this.response);
        console.log(data);
        
        data.forEach((student) => {
            tbl.append('<tr><td>' + student.regno + '</td><td>' + student.name + '</td><td>' + student.address + '</td></tr>');
        });
    }

    request.send();
}

function addNewStudent(id, name, address) {
    let request = new XMLHttpRequest();
    request.open('POST', REST_ADDR + "insert", true);
    console.log('Request sending ...');
    //request.send("regno=" + id + "&name=" + name + "&address=" + address);

    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    request.send(JSON.stringify({
        regno : id,
        name : name,
        address : address
    }));
}

function addNewStudentFromForm() {
    let id = parseInt($("#NewStudentID").val());
    let name = $("#NewStudentName").val();
    let address = $("#NewStudentAddress").val();

    if(name.length == 0 || address.length == 0) 

    addNewStudent(id, name, address);
    window.alert('Added the new student: ' + name);

    getAllStudents();

    return false;
}

function deleteStudent(id){
    let request = new XMLHttpRequest();
    request.open('GET', REST_ADDR + 'student/'+ id, true);
    request.send();

}

function deleteStudentFromForm(){
    let id = parseInt($("#NewStudentID").val());

    deleteStudent(id);
    window.alert('Student deleted');

    getAllStudents();

    return false;
}

function setupOnLoad() {
    getAllStudents();
}