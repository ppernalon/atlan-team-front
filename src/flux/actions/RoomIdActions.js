import dispatcher from '../fluxDispatcher'

export default class RoomIdActions{
    static changeRoomId(value) {
        const roomIdToken = {
            type: 'ROOM_ID_CHANGE',
            payload: value
        }
        dispatcher.dispatch(roomIdToken)
    }
}