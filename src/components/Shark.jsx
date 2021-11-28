import React from 'react'
import { AnimatedSprite } from '@inlet/react-pixi'
import shark1 from '../assets/shark/Shark1.png'
import shark2 from '../assets/shark/Shark2.png'
import shark3 from '../assets/shark/Shark3.png'
import shark4 from '../assets/shark/Shark4.png'
import shark5 from '../assets/shark/Shark5.png'
import shark6 from '../assets/shark/Shark6.png'
import shark7 from '../assets/shark/Shark7.png'
import shark8 from '../assets/shark/Shark8.png'

const Shark = (props) => {
    const images = [shark1, shark2, shark3, shark4, shark5, shark6, shark7, shark8]
    return <AnimatedSprite animationSpeed={0.1} images={images} x={props.x} y={props.y} />
}

export default Shark