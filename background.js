
// http://stackoverflow.com/questions/7699615/cross-domain-xmlhttprequest-using-background-pages/7699773#7699773

chrome.runtime.onMessage.addListener(function(request, sender, callback) {
    if (request.action == 'xhttp') {
        var xhttp = new XMLHttpRequest();
        
        xhttp.onload = function() {
            callback(xhttp.responseText);
        };
        
        xhttp.open("GET", request.url, true);
        xhttp.send();
        
        return true;
    }
});

