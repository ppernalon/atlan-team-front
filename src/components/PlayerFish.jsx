import React from "react"

import grayFish1 from '../assets/fish/gray/Fish1.png'
import grayFish2 from '../assets/fish/gray/Fish2.png'
import grayFish3 from '../assets/fish/gray/Fish3.png'
import grayFish4 from '../assets/fish/gray/Fish4.png'

import purpleFish1 from '../assets/fish/purple/Fish1.png'
import purpleFish2 from '../assets/fish/purple/Fish2.png'
import purpleFish3 from '../assets/fish/purple/Fish3.png'
import purpleFish4 from '../assets/fish/purple/Fish4.png'

import orangeFish1 from '../assets/fish/orange/Fish1.png'
import orangeFish2 from '../assets/fish/orange/Fish2.png'
import orangeFish3 from '../assets/fish/orange/Fish3.png'
import orangeFish4 from '../assets/fish/orange/Fish4.png'

import { AnimatedSprite } from '@inlet/react-pixi'

const PlayerFish = (props) => {  
    const grayImages = [grayFish1, grayFish2, grayFish3, grayFish4]
    const orangeImages = [orangeFish1, orangeFish2, orangeFish3, orangeFish4]
    const purpleImages = [purpleFish1, purpleFish2, purpleFish3, purpleFish4]
    const colors = {
        gray: grayImages,
        orange: orangeImages,
        purple: purpleImages
    }
    return <AnimatedSprite animationSpeed={0.1} images={colors[props.color]} x={props.x} y={props.y} />
}

export default PlayerFish