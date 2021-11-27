import backgroundImage from '../assets/background.png'
import { useState } from 'react'
import { Sprite, useTick } from '@inlet/react-pixi'


const Background = (props) => {
    const [x, setX] = useState(props.x);
  
    useTick(delta => {
      if (props.canMove){
        if(x <= -5000){
        }
        else{
          setX(x - 6 * delta)

        }
      }
    });
  
    return <Sprite height={props.height} image={backgroundImage} x={x} y={0} />
  }

  export default Background