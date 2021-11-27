import React, { useEffect, useState } from "react"
import PlayerFish from "./PlayerFish"

const MyFish = (props) => {
    const [y, setY] = useState(300)

    const handleKeyUp = (keyUpEvent) => {
        let newY
        if (keyUpEvent.code === 'KeyW' || 'ArrowUp' ) {
            newY = y - 10
        } else if (keyUpEvent.code === 'KeyS' || 'ArrowDown' ) {
            console.log('aeaze')
            newY = y + 10
        } else {
            newY = y
        }
        console.log(keyUpEvent)
        setY(newY)
    }

    useEffect(() => {
        window.addEventListener('keyup', handleKeyUp)

        // return window.removeEventListener('keyup', handleKeyUp)
    })
  
    return <PlayerFish x={50} y={y}/>
}



export default MyFish