import React, { useRef } from 'react'
import { useNavigate } from "react-router-dom";
import './CreateGame.css'
import './../../components/StyledButton.css'
import './../../components/StyledInput.css'
import UserNameActions from '../../flux/actions/UserNameActions'
import IsHostActions from '../../flux/actions/IsHostActions';

const CreateGame = () => {
    const pseudoInput = useRef(null)
    const navigate = useNavigate()

    const onSubmit = (eventSubmit) => {
        CreateGame.validCreation(pseudoInput.current.value, eventSubmit, navigate)
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
                    value='Créer une partie'
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
        UserNameActions.changeUserName(value)
        IsHostActions.setIsHost(true)
        navigate('/GameLobby')
    }
}

export default CreateGame