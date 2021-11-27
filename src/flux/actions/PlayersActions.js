import dispatcher from '../fluxDispatcher'

export default class PlayersActions {
    static addPlayer(playerName, pos){
        const playersToken = {
            type: 'ADD_PLAYER',
            payload: {
                name: playerName,
                x: pos.x,
                y: pos.y
            }
        }
        dispatcher.dispatch(playersToken)
    }

    static setPlayers(players){
        const playersToken = {
            type: 'SET_PLAYERS',
            payload: players
        }
        dispatcher.dispatch(playersToken)
    }

}