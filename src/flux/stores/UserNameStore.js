import dispatcher from '../fluxDispatcher';
import EventEmitter from 'events';

let userName = ''

class UserNameStore extends EventEmitter {
    emitChange() {
        this.emit("NEW_USERNAME")
    }

    addChangeListener(callback) {
        this.on("NEW_USERNAME", callback)
    }

    removeChangeListener(callback) {
        this.removeListener("NEW_USERNAME", callback)
    }

    getState() {
        return userName
    }
}

const userNameStore = new UserNameStore();

userNameStore.token = dispatcher.register((actionPayload) => {
    if (actionPayload.type === "NEW_USERNAME") {
        userName = actionPayload.payload
        userNameStore.emitChange()
    }
})

export default userNameStore;
