
var arraySize = 7;

var request = new XMLHttpRequest(); 
var chart = null, title, rcd_title, rcd_color, rcd_data, rcd_date;
var username;
var dat_BPS, dat_BPD, dat_HR, dat_Steps, dat_Kcal, dat_Date;
var weight = 70, height = 183, kcalRatio = 101/3202500;

window.onload = function() {
    // menu listener
    const sideMenu = document.getElementById("aside");
    const menuBtn  = document.getElementById("menu-btn");
    const closeBtn = document.getElementById("close-btn");

    menuBtn.addEventListener('click', () => {
        sideMenu.style.display = 'block';
    })

    closeBtn.addEventListener('click', () => {
        sideMenu.style.display = 'none';
    })

    console.log("arrSize: "+arraySize);

    setMenuHypertext();
    getUserInfo();
    updateUserInfo();
    getAllRecord();
}

function setMenuHypertext(){
    const menu_home    = document.getElementById("menu_home");
    const menu_data    = document.getElementById("menu_data");
    const menu_booking = document.getElementById("menu_booking");
    const menu_doctors = document.getElementById("menu_doctors");
    const menu_logout  = document.getElementById("menu_logout");

    menu_home.href = "../html/home.php";
    menu_data.href = "../html/dataview.html";
    menu_booking.href = "../html/booking.html";
    menu_doctors.href = "../html/doctors.html";
    menu_logout.href  = "../php/logout.php";
}

function getUserInfo() {
    username = "Ani.0v0";
}

function updateUserInfo() {
    var ui_username = document.getElementById("username");
    ui_username.textContent = username;
    try {
        document.getElementById("welcome").textContent = "Hi, " + username;
    } catch (error) {}
}

function getAllRecord() {
    var urlHere = "https://api.thingspeak.com/channels/1875551/feed.json?";
    urlHere = urlHere + "pi_key=NEI1NVRI0SIQ2RV6&results=" + arraySize;
    console.log("Accessing " + urlHere);
    request.open('GET', urlHere, true);
    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            data = JSON.parse(request.responseText);
            console.log("Get All Record from ThingSpeak:" + data);
            dat_Date  = data.feeds.map(function(feed){ 
                var str = feed.created_at;
                return str.substring(5, 7)+"/"+str.substring(8, 10)+" "+str.substring(11, 19);
            });
            dat_BPS   = data.feeds.map(function(feed){ return feed.field1; });
            dat_BPD   = data.feeds.map(function(feed){ return feed.field2; });
            dat_HR    = data.feeds.map(function(feed){ return feed.field3; });
            dat_Steps = data.feeds.map(function(feed){ return feed.field4; });
            var kcalPerStep = weight*height*kcalRatio;
            dat_Kcal  = dat_Steps.map(function(step){ return step * kcalPerStep; });
            updateCardData();
            updateChart('BP_S');
        } else {
            console.error("Cannot get JSON from ThingSpeak");
        }
    };

    request.send();
}

function updateCardData() {
    console.log("updateCardData()");
    var card_BPS    = document.getElementById("card_BPS");
    var card_BPD    = document.getElementById("card_BPD");
    var card_HR     = document.getElementById("card_HR" );
    var card_Steps  = document.getElementById("card_Steps");

    card_BPS.textContent    = (dat_BPS[arraySize-1]!=null?dat_BPS[arraySize-1]:0)   + " mmHg" ;
    card_BPD.textContent    = (dat_BPD[arraySize-1]!=null?dat_BPD[arraySize-1]:0)   + " mmHg" ;
    card_HR.textContent     = (dat_HR[arraySize-1]!=null ?dat_HR[arraySize-1]:0)     + " bpm"  ;
    card_Steps.textContent  = (dat_Steps[arraySize-1]!=null?dat_Steps[arraySize-1]:0) + " steps";
}

function updateChart(type) {
    if(chart!==null)chart.destroy();
    var ctx = document.getElementById("line-chart").getContext('2d');
    var tit = document.getElementById("dataChartTitle");
    window.scrollTo(0, 0);
    updateChartData(type);

    tit.style.color = rcd_color;
    tit.textContent = title;

    chart = new Chart(ctx, {
		type: 'line',
		data: {
			labels: rcd_date,
			datasets: [{ 
				data: rcd_data,
				label: rcd_title,
				borderColor: rcd_color,
				fill: false
			}]
		}, 
        options: {
            title: {display: false}
        }
	});

    if(type == 'BP_S')  addBoundLine(chart, 140, 90);
    if(type == 'BP_D')  addBoundLine(chart, 90, 60);
    if(type == 'HR')    addBoundLine(chart, 100, 60);
    if(type == 'Steps') addKcalLine(chart, dat_Kcal, "Kcal", "#eeee00");
}

function updateChartData(type){
    switch(type){
        case 'BP_S':
            title = "Blood Pressure (systolic)";
            rcd_title = "Blood Pressure - systolic (mmHg)";
            rcd_color = "#ff7782";
            rcd_data = dat_BPS;
            break;
        case 'BP_D':
            title = "Blood Pressure (diastolic)";
            rcd_title = "Blood Pressure - diastolic (mmHg)";
            rcd_color = "#ff7782";
            rcd_data = dat_BPD;
            break;
        case 'HR':
            title = "Heart Rate";
            rcd_title = "Heart Rate (bpm)";
            rcd_color = "#2E87A3";
            rcd_data = dat_HR;
            break;
        case 'Steps':
            title = "Steps & Kcal";
            rcd_title = "Steps";
            rcd_color = "#ffbb55";
            rcd_data = dat_Steps;
            break;
    };
    rcd_date = dat_Date;
    console.log("updateChartData");
}

function addKcalLine(myChart, dat, lab, color) {
    myChart.data.datasets.push({ 
        data: dat,
        label: lab,
        borderColor: color,
        fill: false
    });
    myChart.update();
    console.log("addKcalLine");
}

function addBoundLine(myChart, upperBound, lowerBound){
    myChart.data.datasets.push({ 
        data: Array(arraySize).fill(upperBound),
        label: "Upper Bound",
        borderColor: "#ff0000",
        pointRadius: 0,
        fill: false
    });
    myChart.data.datasets.push({ 
        data: Array(arraySize).fill(lowerBound),
        label: "Lower Bound",
        borderColor: "#0000ff",
        pointRadius: 0,
        fill: true,
    });
    myChart.update();
}