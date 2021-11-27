import React from 'react'
import './StyledEndPopUp.css'
import './../../components/StyledInput.css'
import { useNavigate } from "react-router-dom";



const EndPopUp = (props) => {
    const navigate = useNavigate()
    if(props.display){
        const onSubmit = (eventSubmit) => {
            navigate('/')
        }
        return (
            <div className={'EndPopUpBackground'}>
                <div className={'Ranking'}>
                    Tu as fini {props.ranking}ème !
                </div>
                <form onSubmit={onSubmit}>
                    <input 
                        type='submit' 
                        className='styledButton'
                        value='Créer une partie'
                    />
                </form>
            </div>
            )
    }
    else{
        return(<></>)
    }
}

export default EndPopUp