import dispatcher from '../fluxDispatcher'

export default class UserNameActions {
    static changeUserName(userName){
        const userNameToken = {
            type: 'NEW_USERNAME',
            payload: userName
        }
        dispatcher.dispatch(userNameToken)
    }
}