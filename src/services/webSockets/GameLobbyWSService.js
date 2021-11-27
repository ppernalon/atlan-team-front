import userNameStore from "../../flux/stores/UserNameStore"

const path = "ws://localhost:8080"

const GameLobbyWSServices = {}

GameLobbyWSServices.websocket = null

GameLobbyWSServices.connectWebSocket = (roomId) => {
    if ('WebSocket' in window) {
        console.log(GameLobbyWSServices.websocket)
        const username = userNameStore.getState()
        GameLobbyWSServices.websocket = new WebSocket(`${path}/connect/${roomId}/${username}`)
        console.log(GameLobbyWSServices.websocket)
    } else {
        alert("Your browser does not support it websocket")
    } 

    GameLobbyWSServices.websocket.onbeforeunload = function() {
        GameLobbyWSServices.close()
    }


    window.onbeforeunload = function () {
        GameLobbyWSServices.close()
    }   
}

GameLobbyWSServices.close = () => {
    GameLobbyWSServices.websocket.close(3000, "Forced closure");
}

GameLobbyWSServices.addEventListener = (event, handle) => {
    GameLobbyWSServices.websocket.addEventListener(event, handle)
}

export default GameLobbyWSServices