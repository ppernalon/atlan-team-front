import dispatcher from '../fluxDispatcher'

export default class IsHostActions{
    static setIsHost(isHost){
        const isHostToken = {
            type: 'HOST_SET',
            payload: isHost
        }
        dispatcher.dispatch(isHostToken)
    }
}