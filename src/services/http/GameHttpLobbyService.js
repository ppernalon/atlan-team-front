import AbstractHttpServices from "./AbstractHttpServices"

const API_PATH = {
    generate: '/connect'
}

export default class GameLobbyHttpServices extends AbstractHttpServices {
    static generateRoomId(onResolve, onError){
        this.getHttp(API_PATH.generate)
            .then(onResolve)
            .catch(onError)
    }
}