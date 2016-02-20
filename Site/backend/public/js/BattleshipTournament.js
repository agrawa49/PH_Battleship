/*
	@ Harris Christiansen (Harris@HarrisChristiansen.com)
	2016-02-20
	For: Purdue Hackers - Battleship
	Battleship: Manage Tournament Client
*/

var GAME_SERVER = "ws://127.0.0.1:23346";

var ws = null;

$(document).ready(function() {
	if ("WebSocket" in window) {
		ws = new WebSocket(GAME_SERVER);
		
		ws.onopen = function() {
			console.log("Connected");
		};
		
		ws.onmessage = function (evt) { 
			var received_msg = evt.data;
			console.log("Received: "+received_msg);
		};
		
		ws.onclose = function() { 
			console.log("Disconnected");
			ws = null;
		};
	} else { // WebSocket not supported
		alert("WebSocket NOT supported by your Browser!");
	}
});
		
function sendMsgToServer(msg) {
	if(ws != null) {
		ws.send(msg);
	}
}

function setTournamentMode(selectedMode) {
	if(selectedMode == "N") { // Normal Mode
		setMasterDelay("0.2");
		sendMsgToServer("mode 0");
	} else if(selectedMode == "T") { // Tournament Mode
		setMasterDelay("1.0");
		sendMsgToServer("mode 1");
		sendMsgToServer("reset"); // End all current games
	}
}

function setMasterDelay(selectedDelay) {
	sendMsgToServer("masterDelay "+selectedDelay);
}