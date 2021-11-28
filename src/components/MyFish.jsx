import React, { useEffect, useState } from "react"
import PlayerFish from "./PlayerFish"
import GameLobbyWSServices from "../services/webSockets/GameLobbyWSService"
import { useTick } from '@inlet/react-pixi'
import roomIdStore from '../flux/stores/RoomIdStore'
import isHostStore from "../flux/stores/IsHostStore"

const height = 600
const heightSea = height * 135 / 800
const heightSand = height * 55 / 800 
const middle = (height - (heightSea + heightSand - 55 )) / 2 + 45

const MyFish = (props) => {
    let [y, setY] = useState(middle)

    useTick(() => {
        if (isHostStore.getState()){
            GameLobbyWSServices.websocket.send(`/loopGame/${roomIdStore.getState()}`)
        }
    })

    const handleKeyDown = (keyEvent) => {
        setY(prevY => {
            let isInCav = props.worldX > 16500 && props.worldX < 33400
            let newY
            if (keyEvent.code === 'KeyW' || keyEvent.code === 'ArrowUp' ) {
                if ((isInCav && prevY > (middle + 15) && prevY - 10 <= (middle + 15)) || ( prevY - 10 < heightSea - 45 )){
                    newY = prevY
                } else {
                    newY = prevY - 10
                }
                
            } else if ( keyEvent.code === 'KeyS' || keyEvent.code === 'ArrowDown' ) {
                if ((isInCav && prevY < (middle - 15) && prevY + 10 >= (middle - 15)) || ( prevY + 10 > height - heightSand - 55 )){
                    newY = prevY
                } else {
                    newY = prevY + 10
                }
            } else {
                newY = prevY
            }
            if (props.sendMyPositionToServer) {
                props.sendMyPositionToServer(newY - prevY)
            }
            return newY
        })
    }

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown)

        return () => { 
            window.removeEventListener('keydown', handleKeyDown) 
        }
    })

    return <PlayerFish color={'orange'} x={25} y={y}/>
}



export default MyFish