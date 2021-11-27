import dispatcher from '../fluxDispatcher';
import EventEmitter from 'events';

let roomId = ''

class RoomIdStore extends EventEmitter {
    emitChange() {
        this.emit("ROOM_ID_CHANGE")
    }

    addChangeListener(callback) {
        this.on("ROOM_ID_CHANGE", callback)
    }

    removeChangeListener(callback) {
        this.removeListener("ROOM_ID_CHANGE", callback)
    }

    getState() {
        return roomId
    }
}

const roomIdStore = new RoomIdStore()

roomIdStore.token = dispatcher.register((action) => {
    if (action.type === "ROOM_ID_CHANGE") {
        roomId = action.payload
        roomIdStore.emitChange()
    }
})

export default roomIdStore
