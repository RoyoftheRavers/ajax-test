var xhr = new XMLHttpRequest();

// Open a Connection (GET to retrieve/POST to send, URL we want to retrieve/send to)
xhr.open("GET", "https://ci-swapi.herokuapp.com/api/");
// Send Function
xhr.send();

// Listener here is waiting for xhr's state to change, will add responseText if everything okay
// xhr maintains an internal state as it completes various parts of our request operation
// readystate of 4 means the operation has been completed
xhr.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
        document.getElementById("data").innerHTML = this.responseText;
    }
};

