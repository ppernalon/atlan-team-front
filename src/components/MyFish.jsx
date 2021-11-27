import React, { useEffect, useState } from "react"
import PlayerFish from "./PlayerFish"

const MyFish = (props) => {
    let [y, setY] = useState(300)

    const handleKeyDown = (keyEvent) => {
        setY(prevY => {
            let newY
            if (keyEvent.code === 'KeyW' || keyEvent.code === 'ArrowUp' ) {
                newY = prevY - 10
            } else if ( keyEvent.code === 'KeyS' || keyEvent.code === 'ArrowDown' ) {
                newY = prevY + 10
            } else {
                newY = prevY
            }
            if (props.sendMyPositionToServer) {
                props.sendMyPositionToServer(newY)
            }
            return newY
        })
    }

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown)

        return () => { 
            window.removeEventListener('keydown', handleKeyDown) 
        }
    }, [])
  


    return <PlayerFish x={25} y={y}/>
}



export default MyFish