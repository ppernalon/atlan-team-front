import backgroundImage from '../assets/background.png'
import { useEffect, useState } from 'react'
import { Stage, Sprite, useTick } from '@inlet/react-pixi'


const Background = (props) => {
    const [x, setX] = useState(props.x);
  
    useTick(delta => {
      if (props.canMove){
        setX(x - 0.5 * delta)
      }
    });
  
    return <Sprite height={props.height} image={backgroundImage} x={x} y={0} />
  }

  export default Background