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

const widthStage = 900
const heightStage = 600 

const GamePlay = () => {
  const height = 600
  const heightSea = height * 135 / 800
  const heightSand = height * 55 / 800 
  const middle = (height - (heightSea + heightSand - 55 )) / 2 + 45

  let [position, setPosition] = useState({x: 25, y: middle})
  let [players, setPlayers] = useState(playersStore.getState())
  let [obstacles, setObstacles] = useState({})
  let [isObstaclesInit, setIsObstaclesInit] = useState(false)
  let [isFinish, setIsFinish] = useState({isFinishB: false, ranking: ""})

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
      } else if (parsedMsg.type && parsedMsg.type === "player") {
        let newPlayersState = []
        
        let rawData = Object.assign({}, parsedMsg)
        delete rawData["type"]

        Object.keys(rawData).forEach(key => {
          newPlayersState.push(
            {
              name: key,
              x: +rawData[key].positionX,
              y: +rawData[key].positionY
            }
          )
          if (key === userNameStore.getState()){
            console.log(+rawData[key].positionX)
            setPosition({x: +rawData[key].positionX, y: +rawData[key].positionY})
          }
        })
        setPlayers(newPlayersState)

      } else if (parsedMsg.type && parsedMsg.type === "finish" && parsedMsg.username === userNameStore.getState()){
          setIsFinish({isFinishB: true, ranking: parsedMsg.place - 1})
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
    <div style={{
      display: 'Flex', 
      height: window.innerHeight, 
      justifyContent: 'center', 
      alignItems: 'center'
    }}>
      <EndPopUp ranking={isFinish.ranking} display={isFinish.isFinishB}/>
      {
        position.x > 6000 && position.x < 16000 ?  <CardQuestion question= {" Plus de la moitié des espèces marines pourraient disparaître d'ici 2100 ?"}/> : null
      }     
      <Stage width={widthStage} height={heightStage} options={{ backgroundColor: 0x1C2842 }}>
        <Background canMove={false} x={-position.x + 25} y={0} height={heightStage} width={widthStage}/>
        <MyFish sendMyPositionToServer={GamePlay.sendMyPositionToServer} worldX={position.x}/>
        {
          players.map((player, index) => {
            if (player.name !== userNameStore.getState()) {
              const pos = player.x - position.x
              console.log(player.x, position.x, pos)
              return <PlayerFish key={`player_${index}`} color={'gray'} x={pos} y={player.y} />
            } 
            else {
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
                x={obstacles[key].positionX - position.x} 
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