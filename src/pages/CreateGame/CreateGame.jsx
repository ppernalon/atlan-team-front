import React, { useRef } from 'react'
import { useNavigate } from "react-router-dom";
import './CreateGame.css'
import './../../components/StyledButton.css'
import './../../components/StyledInput.css'
import GameLobbyHttpService from  '../../services/http/GameHttpLobbyService'

const CreateGame = () => {
    const pseudoInput = useRef(null)
    const navigate = useNavigate()

    const onSubmit = (eventSubmit) => {
        CreateGame.validCreation(pseudoInput.current.value, eventSubmit, navigate)
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
                    value='Créer une partie'
                    onClick={() => GameLobbyHttpService.generateRoomId(
                        (res) => console.log(res),
                        (err) => console.log(err)
                    )}
                />
            </form>
        </div>
    )
}

CreateGame.validCreation = (value, eventSubmit, navigate) => {
    eventSubmit.preventDefault()
    if (value.length < 5){
        window.alert("Le pseudo doit contenir au moins 5 caractères")
    } else {
        navigate('/GameLobby')
    }
}

export default CreateGame