// Get Data printed on screen and start unpacking it
const baseURL = "https://ci-swapi.herokuapp.com/api/";

function getData(type, cb) {
    var xhr = new XMLHttpRequest();
    // Open a Connection (GET to retrieve/POST to send, URL we want to retrieve/send to)
    xhr.open("GET", baseURL + type + "/");
    // Send Request
    xhr.send(); 
    // Listener here is waiting for xhr's state to change, will add responseText if everything okay
    // xhr maintains an internal state as it completes various parts of our request operation
    // readystate of 4 means the operation has been completed
    // status code 200 means request succeeded
    xhr.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            // When script gets to this stage it runs the function that we passed to getData() as an argument
            cb(JSON.parse(this.responseText));
        }
    };
}

// Get Data printed on screen
function writeToDocument(type) {
    // Set el to an empty string so it is cleared every time a button is clicked
    var el = document.getElementById("data");
    el.innerHTML = "";
    getData(type, function(data) {
        data = data.results;

        data.forEach(function(item){
            Object.keys(item).forEach(function(key) {
                console.log(key);
            })
            el.innerHTML += "<p>" + item.name + "</p>";
        });
    });
}