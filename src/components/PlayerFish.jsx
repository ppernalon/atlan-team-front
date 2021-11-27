import React from "react"
import fish from '../assets/fish/Fish1.png'
import { Sprite } from '@inlet/react-pixi'

const PlayerFish = (props) => {  
    return <Sprite image={fish} x={props.x} y={props.y} />
}

export default PlayerFish