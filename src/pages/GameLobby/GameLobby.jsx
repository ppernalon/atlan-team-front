import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import './GameLobby.css'
import './../../components/StyledInput.css'
import './../../components/StyledButton.css'
import LoadingCircle from '../../components/LoadingCircle/LoadingCircle'
import GameLobbyHttpServices from '../../services/http/GameLobbyHttpService'
import GameLobbyWSServices from '../../services/webSockets/GameLobbyWSService'
import userNameStore from '../../flux/stores/UserNameStore'
import RoomIdActions from '../../flux/actions/RoomIdActions'
import roomIdStore from '../../flux/stores/RoomIdStore'
import PlayersActions from '../../flux/actions/PlayersActions'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NB_MAX_PLAYERS = 10

const GameLobby = () => {
    let [isLoading, setIsLoading] = useState(true)
    let [players, setPlayers] = useState([])
    let [playersSlots, setPlayersSlots] = useState([])
    let [waitingSlots, setWaitingSlots] = useState([])
    let [roomId, setRoomId] = useState(roomIdStore.getState())
    let [joinUrl, setJoinUrl] = useState("")

    const navigate = useNavigate()

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
    })
    
    const addPlayer = (player) => {
        setPlayers(prevPlayers => {
            if (prevPlayers.includes(player)){
                return prevPlayers
            }
            return [...prevPlayers, player]
        })
    }

    /*
        Handle the connexion to WebSocket
    */
    useEffect(() => {
        setJoinUrl(window.location.toString().replace('GameLobby', 'JoinGame') + '/' + roomId)
        if (isLoading) {
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

                        setIsLoading(false)
                     },
                    (err) => console.log(err)
                )
            } else {
                GameLobbyWSServices.connectWebSocket(roomIdStore.getState())
                setIsLoading(false)
            }
        } else {
            GameLobbyWSServices.websocket.onmessage = (msg) => {
                if (msg.data === "GAME_STARTING"){
                    navigate('/InGame')
                } else {
                    let newPlayersStore = []
                    setPlayers([])
                    let users = msg.data
                    users = users.replaceAll('[', '')
                    users = users.replaceAll(',', '')
                    users = users.replaceAll(']', '')
                    users = users.split(' ')
                    users.forEach(username => {
                        addPlayer({name: username})
                        newPlayersStore.push({name: username, x: 25, y: 200})
                    })
                    PlayersActions.setPlayers(newPlayersStore)
                }
            }
        }
    }, [isLoading, roomId, joinUrl, navigate])

    const onClickButton = () => {
        GameLobbyWSServices.websocket.send(`/startGame/${roomIdStore.getState()}`)
    }
    const copyURL = () => {
        navigator.clipboard.writeText(joinUrl)
        toast("Lien copié !")
    }

    return (
        <div className={'page gameLobby'}>
            <div className={'gameLobby__modal'}>
                {
                    isLoading ?
                        <LoadingCircle />
                        :
                        <>
                            <div>Invite tes ami(e)s avec le l'URL</div>
                            <button 
                                className='buttonUrl'
                                onClick={copyURL}
                            >
                                {joinUrl}
                            </button>
                        
                            <div className='gameLobby__players'>
                                { playersSlots }
                                { waitingSlots }
                            </div>
                            <button 
                                onClick={onClickButton}
                                className='styledButton'>
                                Lancer la partie
                            </button>
                            <ToastContainer />
                        </>
                }
            </div>
        </div>
    )
}

export default GameLobby