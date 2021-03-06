// Callback Example

function getData(cb) {
    var xhr = new XMLHttpRequest();
    // Open a Connection (GET to retrieve/POST to send, URL we want to retrieve/send to)
    xhr.open("GET", "https://ci-swapi.herokuapp.com/api/");
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

function printDataToConsole(data) {
    console.log(data);
}
// Calling getData(printDataToConsole) here is passing the function into getData() to be run
// Callbacks are only invoked when we want them to be
getData(printDataToConsole);