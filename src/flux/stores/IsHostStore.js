import dispatcher from '../fluxDispatcher';
import EventEmitter from 'events';

let isHost = false

class IsHostStore extends EventEmitter {
    emitChange() {
        this.emit("HOST_UPDATE")
    }

    addChangeListener(callback) {
        this.on("HOST_UPDATE", callback)
    }

    removeChangeListener(callback) {
        this.removeListener("HOST_UPDATE", callback)
    }

    getState() {
        return isHost
    }
}

const isHostStore = new IsHostStore();

isHostStore.token = dispatcher.register((action) => {
    if (action.type === "HOST_SET") {
        isHost = action.payload
        isHostStore.emitChange()
    }
})

export default isHostStore;
