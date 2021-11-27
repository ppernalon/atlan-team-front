import React, { useEffect, useState } from 'react'
import { createBrowserHistory } from 'history'
import './GameLobby.css'
import './../../components/StyledInput.css'
import './../../components/StyledButton.css'
import LoadingCircle from '../../components/LoadingCircle/LoadingCircle'
import GameLobbyHttpServices from '../../services/http/GameLobbyHttpService'
import GameLobbyWSServices from '../../services/webSockets/GameLobbyWSService'
import userNameStore from '../../flux/stores/UserNameStore'
import RoomIdActions from '../../flux/actions/RoomIdActions'
import RoomIdStore from '../../flux/stores/RoomIdStore'
import roomIdStore from '../../flux/stores/RoomIdStore'

const NB_MAX_PLAYERS = 10

const GameLobby = () => {
    let [isLoading, setIsLoading] = useState(true)
    let [players, setPlayers] = useState([])
    let [playersSlots, setPlayersSlots] = useState([])
    let [waitingSlots, setWaitingSlots] = useState([])
    let [roomId, setRoomId] = useState(RoomIdStore.getState())
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
        const handleRoomIdChange = () => {
            const newRoomId = roomIdStore.getState()
            setJoinUrl(window.location.toString().replace('GameLobby', 'JoinGame') + '/' + newRoomId)
            setRoomId(roomIdStore.getState())
        }
        roomIdStore.addChangeListener(handleRoomIdChange)

        return () => {
            roomIdStore.removeChangeListener(handleRoomIdChange)
        }
    }, [])

    /*
        Handle the connexion to WebSocket
    */
    useEffect(() => {
        setJoinUrl(window.location.toString().replace('GameLobby', 'JoinGame') + '/' + roomId)
        if (isLoading) {
            console.log(roomId)
            console.log(roomId.length === 0)
            if (roomId.length === 0) {
                GameLobbyHttpServices.generateRoomId(
                    (res) => {
                        const newRoomId = res['data']

                        setRoomId(newRoomId)
                        RoomIdActions.changeRoomId(newRoomId)

                        GameLobbyWSServices.connectWebSocket(newRoomId)
                        // the host is the only new player
                        setPlayers([
                            {name: userNameStore.getState()}
                        ])
                     },
                    (err) => console.log(err)
                )
            } else {
                GameLobbyWSServices.connectWebSocket(roomId)
            }
            setIsLoading(false)
        } else {
            // GameLobbyWSServices.addEventListener('onNewPlayer', addPlayer)
        }

        return () => {
            if (!isLoading) {
                // GameLobbyWSServices.clos()
            }
        }
    }, [])

    const addPlayer = (player) => {
        setPlayers(prevPlayers => prevPlayers.push(player))
    }

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