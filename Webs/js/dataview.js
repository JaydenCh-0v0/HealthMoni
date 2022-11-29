var data, num = 1;

getAllRecord();

function addAllDataOnList(){
    data.feeds.forEach(feed => {
        var date = feed.created_at;
        if (feed.field1 != null) appendDataOnList(num++, "Blood Pressure (systolic)" , date, feed.field1, "normal");
        if (feed.field2 != null) appendDataOnList(num++, "Blood Pressure (diastolic)", date, feed.field2, "normal");
        if (feed.field3 != null) appendDataOnList(num++, "Heart Rate"                , date, feed.field3, "normal");
        if (feed.field4 != null) appendDataOnList(num++, "Steps"                     , date, feed.field4, "normal");
    });
}

function getAllRecord() {
    var urlHere = "https://api.thingspeak.com/channels/1875551/feed.json?";
    urlHere = urlHere + "pi_key=NEI1NVRI0SIQ2RV6&results=100";
    console.log("Accessing " + urlHere);
    request.open('GET', urlHere, true);
    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            data = JSON.parse(request.responseText);
            console.log("Get All Record from ThingSpeak:" + data);
            addAllDataOnList();
        } else {
            console.error("Cannot get JSON from ThingSpeak");
        }
    };
    request.send();
}

function appendDataOnList(num, type, date, value, status){
    var newRow = document.createElement("tr");
    var _num = document.createElement("td");
    var _type = document.createElement("td");
    var _date = document.createElement("td");
    var _value = document.createElement("td");
    var _status = document.createElement("td");

    _num.innerHTML = num;
    _type.innerHTML = type;
    _date.innerHTML = date;
    _value.innerHTML = value;
    _status.innerHTML = status;
    
    newRow.append(_num);
    newRow.append(_type);
    newRow.append(_date);
    newRow.append(_value);
    newRow.append(_status);
    document.getElementById("rows").appendChild(newRow);
}