import React, { useRef } from 'react'
import { useNavigate } from "react-router-dom";
import '../CreateGame/CreateGame.css'
import './../../components/StyledButton.css'
import './../../components/StyledInput.css'

const JoinGame = () => {
    const pseudoInput = useRef(null)
    const navigate = useNavigate()

    const onSubmit = (eventSubmit) => {
        JoinGame.joinLobby(pseudoInput.current.value, eventSubmit, navigate)
    }

    return (
        <div className={'page createGame'}>
            <form className={'createGame__form'} onSubmit={onSubmit}>
                <div>
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
        navigate('/GameLobby')
    }
}

export default JoinGame