function getData(url, cb) {
    var xhr = new XMLHttpRequest();
    // Open a Connection (GET to retrieve/POST to send, URL we want to retrieve/send to)
    xhr.open("GET", url);
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

// initialise array and iterate over the arrays
function getTableHeaders(obj) {
    var tableHeaders = [];

    Object.keys(obj).forEach(function(key) {
        tableHeaders.push(`<td>${key}</td>`)
    });

    return `<tr>${tableHeaders}</tr>`;
}

function generatePaginationButtons(next, prev) {
    if(next && prev) {
        return `<button onclick="writetoDocument('${prev}')">Previous</button>
                <button onclick="writetoDocument('${next}')">Next</button>`;
    } else if(next && !prev) {
        return `<button onclick="writetoDocument('${next}')">Next</button>`;
    } else if(!next && prev) {
        return `<button onclick="writetoDocument('${prev}')">Previous</button>`;
    }
}
// Get Data printed on screen
function writeToDocument(url) {
    // New array to house each row of data for us
    var tableRows = [];
    // Set el to an empty string so it is cleared every time a button is clicked
    var el = document.getElementById("data");
    getData(url, function(data) {
        var pagination = "";
        if(data.next || data.previous) {
            pagination = generatePaginationButtons(data.next, data.previous);
        }
        data = data.results;
        var tableHeaders = getTableHeaders(data[0]);

        data.forEach(function(item){
            var dataRow = [];

            Object.keys(item).forEach(function(key) {
                var rowData = item[key].toString();
                var truncatedData = rowData.substring(0, 15);
                dataRow.push(`<td>${truncatedData}</td>`);
            });
            tableRows.push(`<tr>${dataRow}</tr>`);
        });

        el.innerHTML = `<table>${tableHeaders}${tableRows}</table>${pagination}`;

    });
}