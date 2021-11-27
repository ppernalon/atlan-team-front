import React, { useEffect, useState } from 'react'
import { createBrowserHistory } from 'history'
import './GameLobby.css'
import './../../components/StyledInput.css'
import './../../components/StyledButton.css'
import LoadingCircle from '../../components/LoadingCircle/LoadingCircle'
import GameLobbyHttpServices from '../../services/http/GameLobbyHttpService'
import GameLobbyWSServices from '../../services/webSockets/GameLobbyWSService'
import { useLocation } from "react-router-dom"

const NB_MAX_PLAYERS = 10

const GameLobby = () => {
    const location = useLocation()
    let gameId = location.pathname.replace('GameLobby', '')
    gameId = gameId.replace('/', '')
    gameId = gameId.replace('/', '')

    let [isLoading, setIsLoading] = useState(true)
    let [players, setPlayers] = useState([])
    let [playersSlots, setPlayersSlots] = useState([])
    let [waitingSlots, setWaitingSlots] = useState([])
    let [roomId, setRoomId] = useState(gameId)
    let [joinUrl, setJoinUrl] = useState("")

    useEffect(() => {
        const newPlayersSlots = players.map((player, index) => {
            return (
                <div key={`newPlayersSlots_${index}`}>
                    <input 
                        type='text'
                        className='styledInput'
                        readOnly={true}
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
                <div key={`waitingSlots_${index}`}>
                    <input 
                        type='text'
                        className='styledInput'
                        readOnly={true}
                        value='en attente de joueurs ...'
                    /> 
                </div>
            )
        }
        setWaitingSlots(newWaitingSlots)        
    }, [players])

    useEffect(() => {
        if (isLoading) {
            if (roomId.length === 0) {
                GameLobbyHttpServices.generateRoomId(
                    (res) => {
                        setRoomId(res['data'])
                        GameLobbyWSServices.connectWebSocket(res['data'])
                        const history = createBrowserHistory()
                        history.replace(`/GameLobby/${res['data']}`)
                        setJoinUrl(window.location.toString().replace('GameLobby', 'JoinGame'))
                     },
                    (err) => console.log(err)
                )
            } else {
                GameLobbyWSServices.connectWebSocket(roomId)
                setJoinUrl(window.location.toString().replace('GameLobby', 'JoinGame'))
            }
            
            setIsLoading(false)
        }
        
    }, [isLoading])

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
                                value={joinUrl}
                                readOnly={true}
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