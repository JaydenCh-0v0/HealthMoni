
//import UserData from './userData.js';

// *** login area
// username: the name of user
// password: the login password
// realname: the name of real world
// rule: the rule in system (-1: admin, 0: patient, 1: doctor, 2: both)
var objPeople = [
	{
		username: 	"user",
		password: 	"user",
		role: 		0,
		realname:	"User 001",
		age: 62,
		rcd_date: 	["12/10","13/10","14/10","15/10","16/10","17/10","18/10"],
		bp_systo: 	[102,104,109,105,106,104,110],
		bp_diast: 	[65,67,70,69,70,65,70],
		hr:			[80,74,80,80,82,79,82],
		walks: 		[10237,18923,4837,8347,12357,12482]
	},
	{
		username: "doctor",
		password: "doctor",
		role: 1,
		realname:	"Doctor 001",
		age: 41,
		rcd_date: 	[],
		bp_systo: 	[],
		bp_diast: 	[],
		hr:			[],
		walks: 		[]
	},
	{ 
		username: "Jayden",
		password: "Jayden",
		role: 2,
		realname:	"Jayden",
		age: 23,
		rcd_date: 	["12/10","13/10","14/10","15/10","16/10","17/10","18/10"],
		bp_systo: 	[102,104,109,105,106,104,110],
		bp_diast: 	[65,67,70,69,70,65,70],
		hr:			[80,74,80,80,82,79,82],
		walks: 		[10237,18923,4837,8347,12357,12482]
	},
    { 
		username: "admin",
		password: "admin",
		role: -1,
		realname:	"_Admin",
		age: 0,
		rcd_date: 	["12/10","13/10","14/10","15/10","16/10","17/10","18/10"],
		bp_systo: 	[102,104,109,105,106,104,110],
		bp_diast: 	[65,67,70,69,70,65,70],
		hr:			[80,74,80,80,82,79,82],
		walks: 		[10237,18923,4837,8347,12357,12482]
	}

]

var username, password, role, realname, age, rcd_date, bp_systo, bp_diast, hr, walks;
var chart_topic = "bp_systo";

function getInfo() {
	var _username = document.getElementById('username').value
	var _password = document.getElementById('password').value

	for(var i = 0; i < objPeople.length; i++) {
		// check is user input matches username and password of a current index of the objPeople array
		if( _username == objPeople[i].username && 
			_password == objPeople[i].password) {
			console.log(_username + " is logged in!!!")
			// get data
			username = objPeople[i].username;
			password = objPeople[i].password;
			role 	 = objPeople[i].role;
			realname = objPeople[i].realname;
			age 	 = objPeople[i].age;
			rcd_date = objPeople[i].rcd_date;
			bp_systo = objPeople[i].bp_systo;
			bp_diast = objPeople[i].bp_diast;
			hr 		 = objPeople[i].hr;
			walks 	 = objPeople[i].walks;
			// jump to home page
			window.location.href = "../html/home.html";
			return
		}
	}
	console.log("incorrect username or password")
}

