import React, { useEffect, useState } from 'react'
import './GameLobby.css'
import './../../components/StyledInput.css'
import './../../components/StyledButton.css'
import LoadingCircle from '../../components/LoadingCircle/LoadingCircle'
import GameLobbyHttpServices from '../../services/http/GameLobbyHttpService'
import GameLobbyWSServices from '../../services/webSockets/GameLobbyWSService'

const NB_MAX_PLAYERS = 10
const GameLobby = () => {

    let [isLoading, setIsLoading] = useState(true)
    let [players, setPlayers] = useState([])
    let [playersSlots, setPlayersSlots] = useState([])
    let [waitingSlots, setWaitingSlots] = useState([])
    let [roomId, setRoomId] = useState("")

    useEffect(() => {
        const newPlayersSlots = players.map(player => {
            return (
                <div>
                    <input 
                        type='text'
                        className='styledInput'
                        value={player.name}
                    /> 
                </div>
            )
        })
        setPlayersSlots(newPlayersSlots)
    }, [players])

    useEffect(() => {
        let newWaitingSlots = []
        for (let index = 0; index < (NB_MAX_PLAYERS - players.length); index++){
            newWaitingSlots.push(
                <div>
                    <input 
                        type='text'
                        className='styledInput'
                        value='en attente de joueurs ...'
                    /> 
                </div>
            )
        }
        setWaitingSlots(newWaitingSlots)        
    }, [players])

    useEffect(() => {
        if (isLoading) {
            GameLobbyHttpServices.generateRoomId(
                (res) => {
                    setRoomId(res['data'])
                    setIsLoading(false)
    
                    GameLobbyWSServices.connectWebSocket(roomId)
                 },
                (err) => console.log(err)
            )
        }
    },[isLoading])

    return (
        <div className={'page gameLobby'}>
            <div className={'gameLobby__modal'}>
                {
                    isLoading ?
                        <LoadingCircle />
                        :
                        <>
                            <input 
                                type='text'
                                className='styledInput'
                                value='http://monlienverslelobby/aeazeazcnodsf'
                            />
                            <div className='gameLobby__players'>
                                { playersSlots }
                                { waitingSlots }
                            </div>
                            <input 
                                type='button' 
                                className='styledButton'
                                value='Lancer la partie'
                            />
                        </>
                }
            </div>
        </div>
    )
}

export default GameLobby