import React, { useEffect, useState } from 'react'
import { Stage } from '@inlet/react-pixi'
import Background from '../components/Background'
import PlayerFish from '../components/PlayerFish'
import MyFish from '../components/MyFish'
import ObjectImpactable from '../components/ObjectImpactable'
import CardQuestion from '../components/CardQuestion'
import playersStore from '../flux/stores/PlayersStore'
import GameLobbyWSServices from '../services/webSockets/GameLobbyWSService'
import userNameStore from '../flux/stores/UserNameStore'
import roomIdStore from '../flux/stores/RoomIdStore'
import EndPopUp from '../components/EndPopUp/EndPopUp'
import PlayersActions from '../flux/actions/PlayersActions'

const widthStage = window.innerWidth - 45
const heightStage = window.innerHeight - 45

const GamePlay = () => {
  let [players, setPlayers] = useState(playersStore.getState())
  let [obstacles, setObstacles] = useState({});
  let [isObstaclesInit, setIsObstaclesInit] = useState(false)

  const updatePlayers = () => {
    setPlayers(playersStore.getState())
  }

  function updateLoop(){
    GameLobbyWSServices.websocket.send(`/loopGame/${roomIdStore.getState()}`)
    window.requestAnimationFrame(updateLoop)
  }

  // start requesting positions
  window.requestAnimationFrame(updateLoop)


  useEffect(() => {
    playersStore.addChangeListener(updatePlayers)
    return () => {
      playersStore.removeChangeListener(updatePlayers)
    }
  }, [])

  useEffect(() => {
    GameLobbyWSServices.websocket.onmessage = (msg) => {
      const parsedMsg = JSON.parse(msg.data)
      if (parsedMsg.type && parsedMsg.type === "obstacles") {
        let newObstaclesState = parsedMsg
        delete newObstaclesState["type"]
        Object.keys(newObstaclesState).forEach(key => {
          if (!isObstaclesInit){
            const rd = Math.floor(Math.random() * 4)
            const imageNames = ['bin', 'bottleBlue', 'bottleGreen', 'canette']
            newObstaclesState[key].type = imageNames[rd]
            setIsObstaclesInit(true)
          } else {
            newObstaclesState[key].type = obstacles[key].type
          }

        })
        setObstacles(newObstaclesState)
      } else {
        const playerToUpdate = parsedMsg
        const newPayersState = playersStore.getState().map(player => {
          if (player.name === playerToUpdate.username) {
            let updatedPlayer = Object.assign({}, player)
            updatedPlayer.y = player.y + playerToUpdate.deltaY
            return updatedPlayer
          }
          return player
        })
        PlayersActions.setPlayers(newPayersState)
      }
    }
  })

  return(
    <div>
      <EndPopUp ranking={4} display={false}/>
      <CardQuestion question= {" Plus de la moitié des espèces marines pourraient disparaître d'ici 2100 ?"}/>
      <Stage width={widthStage} height={heightStage} options={{ backgroundColor: 0x1C2842 }}>
        <Background canMove={true} x={0} y={0} height={heightStage} width={widthStage}/>
        <MyFish sendMyPositionToServer={GamePlay.sendMyPositionToServer} />
        {
          players.map((player, index) => {
            if (player.name !== userNameStore.getState()) {
              return <PlayerFish key={`player_${index}`} color={'gray'} x={player.x} y={player.y} />
            } else {
              return null
            }
          })
        }
        {
          Object.keys(obstacles).map(key => {
            return (
              <ObjectImpactable 
                key={key} 
                canMove={true} 
                x={-obstacles[key].positionX} 
                y={obstacles[key].positionY} 
                imageName={obstacles[key].type} 
                maxHeight={heightStage} 
                maxWidth={widthStage}
              />
            )
          })
        }
      </Stage>
    </div>
  )
}

GamePlay.sendMyPositionToServer = (deltatY) => {
  GameLobbyWSServices.websocket.send(`/moveFish/${roomIdStore.getState()}/${userNameStore.getState()}/${deltatY}`)
}

export default GamePlay