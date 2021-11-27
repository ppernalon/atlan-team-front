var websocket = null; 

export default class GameLobbyWSServices {

    static connectWebSocket(roomId) {
        if ('WebSocket' in window) {
            console.log(websocket)
            websocket = new WebSocket("ws://localhost:8080/connect/" + roomId);
            console.log("hourra")
        } else {
            alert("Your browser does not support it websocket");
        } 

        websocket.onmessage = e => console.log(e.data)
        websocket.onbeforeunload = function() {
            GameLobbyWSServices.clos();
        }
        window.onbeforeunload = function () {
            GameLobbyWSServices.clos();
        }   
    }
    
    
    static clos(){
        GameLobbyWSServices.websocket.close(3000,"Forced closure");
    }
    static send(){
        var msg = document.getElementById('text').value;
        websocket.send(msg);
    }
    static send_msg() {
    var t = "";
    if (this.webSocket != null) {
    var input_msg = document.getElementById("input_msg").value.trim();
    if (input_msg == "") {
        return;
    }
    this.webSocket.send(input_msg);
    //  Clear the information in the input box
    document.getElementById("input_msg").value = "";
    // var msg_board = document.getElementsByClassName("msg_board")[0];
    // var received_msg = input_msg;
    // var old_msg = msg_board.innerHTML;
    // msg_board.innerHTML = old_msg + received_msg + "<br>";
    // //  Let the scroll block move down
    // msg_board.scrollTop = msg_board.scrollTop + 40;
    } else {
    alert("You are disconnected, please re-enter the chat room...");
    }
    };
    
    static closeWs() {
        GameLobbyWSServices.webSocket.close();
    };
    
    static initWebSocket() {
    var roomName = document.getElementById("input_roomName").value;
    }
}
