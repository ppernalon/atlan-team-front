import dispatcher from '../fluxDispatcher'
import EventEmitter from 'events'

/*
    {
        name: String,
        x: Int,
        y: Int
    } []
*/
let players = []

class PlayersStore extends EventEmitter {
    emitChange() {
        this.emit("PLAYERS_UPDATED")
    }

    addChangeListener(callback) {
        this.on("PLAYERS_UPDATED", callback)
    }

    removeChangeListener(callback) {
        this.removeListener("PLAYERS_UPDATED", callback)
    }

    getState() {
        return players
    }
}

const playersStore = new PlayersStore()

playersStore.token = dispatcher.register((action) => {
    if (action.type === "SET_PLAYERS") {
        players = action.payload
        playersStore.emitChange()
    }
})

export default playersStore
