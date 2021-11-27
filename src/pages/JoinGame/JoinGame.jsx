import React, { useRef } from 'react'
import { useNavigate, useLocation } from "react-router-dom"
import RoomIdActions from '../../flux/actions/RoomIdActions'
import UserNameActions from '../../flux/actions/UserNameActions'
import '../CreateGame/CreateGame.css'
import './../../components/StyledButton.css'
import './../../components/StyledInput.css'

const JoinGame = () => {
    const location = useLocation()
    let roomId = location.pathname.replace('JoinGame', '')
    roomId = roomId.replace('/', '')
    roomId = roomId.replace('/', '')
    RoomIdActions.changeRoomId(roomId)

    const pseudoInput = useRef(null)
    const navigate = useNavigate()

    const onSubmit = (eventSubmit) => {
        JoinGame.joinLobby(pseudoInput.current.value, eventSubmit, navigate)
    }

    return (
        <div className={'page createGame'}>
            <form className={'createGame__form'} onSubmit={onSubmit}>
                <div className={'titleGame'}>
                    Hurry Fish
                </div>
                <input 
                    type='text' 
                    className='styledInput'
                    placeholder='Pseudo'
                    ref={pseudoInput}
                />
                <input 
                    type='submit' 
                    className='styledButton'
                    value='Join the game'
                />
            </form>
        </div>
    )
}

JoinGame.joinLobby = (value, eventSubmit, navigate) => {
    eventSubmit.preventDefault()
    if (value.length < 5){
        window.alert("Le pseudo doit contenir au moins 5 caractères")
    } else {
        UserNameActions.changeUserName(value)
        navigate('/GameLobby')
    }
}

export default JoinGame