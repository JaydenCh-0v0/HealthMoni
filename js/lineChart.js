
// *** use data
var rcd_title = "Blood Pressure - systolic (mmHg)";
var rcd_data = [102,104,109,105,106,104,110];
var rcd_date = ["12/10","13/10","14/10","15/10","16/10","17/10","18/10"];
var rcd_color = "#ff7782";

// *** line-chart
var ctx = document.getElementById("line-chart").getContext('2d');
var chart = new Chart(ctx, {
	type: 'line',
	data: {
	  	labels: rcd_date,
	  	datasets: [{ 
		  	data: rcd_data,
		  	label: rcd_title,
		  	borderColor: rcd_color,
		  	fill: false
		}]
	}, options: {title: {display: false}}
});