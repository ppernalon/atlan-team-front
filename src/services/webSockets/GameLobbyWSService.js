import userNameStore from "../../flux/stores/UserNameStore"

const path = "wss://atlanteam.herokuapp.com"

const GameLobbyWSServices = {}

GameLobbyWSServices.websocket = null

GameLobbyWSServices.connectWebSocket = (roomId) => {
    if ('WebSocket' in window) {
        const username = userNameStore.getState()
        GameLobbyWSServices.websocket = new WebSocket(`${path}/connect/${roomId}/${username}`)
    } else {
        alert("Your browser does not support it websocket")
    }
}

GameLobbyWSServices.close = () => {
    GameLobbyWSServices.websocket.close(3000, "Forced closure");
}

GameLobbyWSServices.addEventListener = (event, handle) => {
    GameLobbyWSServices.websocket.addEventListener(event, handle)
}

export default GameLobbyWSServices