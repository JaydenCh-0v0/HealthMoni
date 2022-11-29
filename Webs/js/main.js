
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
		age: 62
	},
	{
		username: "doctor",
		password: "doctor",
		role: 1,
		realname:	"Doctor 001",
		age: 41
	},
	{ 
		username: "Jayden",
		password: "Jayden",
		role: 2,
		realname:	"Jayden",
		age: 23
	},
    { 
		username: "admin",
		password: "admin",
		role: -1,
		realname:	"_Admin",
		age: 0
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
			// jump to home page
			window.location.href = "../html/home.html";
			return
		}
	}
	console.log("incorrect username or password")
}

