import React from "react"
import fish1 from '../assets/fish/Fish1.png'
import fish2 from '../assets/fish/Fish2.png'
import fish3 from '../assets/fish/Fish3.png'
import fish4 from '../assets/fish/Fish4.png'
import { AnimatedSprite } from '@inlet/react-pixi'

const PlayerFish = (props) => {  
    const images = [fish1, fish2, fish3, fish4]
    return <AnimatedSprite animationSpeed={0.1} images={images} x={props.x} y={props.y} />
}

export default PlayerFish