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

  const updatePlayers = () => {
    setPlayers(playersStore.getState())
  }

  useEffect(() => {
    playersStore.addChangeListener(updatePlayers)
    return () => {
      playersStore.removeChangeListener(updatePlayers)
    }
  }, [])

  useEffect(() => {
    GameLobbyWSServices.websocket.onmessage = (msg) => {
      const playerToUpdate = JSON.parse(msg.data)
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
              return <PlayerFish key={`player_${index}`} x={player.x} y={player.y} />
            } else {
              return null
            }
          })
        }
        <ObjectImpactable canMove={true} x={widthStage-150} y={0} imageName={'bottleGreen'} maxHeight={heightStage} maxWidth={widthStage}/>
        <ObjectImpactable canMove={true} x={widthStage-150} y={0} imageName={'bottleBlue'} maxHeight={heightStage} maxWidth={widthStage}/>
        <ObjectImpactable canMove={true} x={widthStage-150} y={0} imageName={'bin'} maxHeight={heightStage} maxWidth={widthStage}/>
        <ObjectImpactable canMove={true} x={widthStage-150} y={0} imageName={'canette'} maxHeight={heightStage} maxWidth={widthStage}/>
      </Stage>
    </div>
  )
}

GamePlay.sendMyPositionToServer = (deltatY) => {
  GameLobbyWSServices.websocket.send(`/moveFish/${roomIdStore.getState()}/${userNameStore.getState()}/${deltatY}`)
}

export default GamePlay