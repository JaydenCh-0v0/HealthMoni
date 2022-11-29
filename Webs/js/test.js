var request = new XMLHttpRequest(), data; 

window.onload = function() {
    var urlHere = "https://api.thingspeak.com/channels/1875551/feed.json?";
    urlHere = urlHere + "pi_key=NEI1NVRI0SIQ2RV6&results=7";
    console.log(urlHere);
    request.open('GET', urlHere, true);
    request.send();
}

request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
        data = JSON.parse(request.responseText);
        console.log(data);
        var test = document.getElementById("test");
        test.textContent = "-.-";
        test.textContent = data.feeds.map(function(feed){ return feed.field1; });
    } else {
        console.error("Cannot get JSON from ThingSpeak");
    }
};

