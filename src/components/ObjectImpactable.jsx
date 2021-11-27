import { useEffect, useState } from 'react'
import { Stage, Sprite, useTick } from '@inlet/react-pixi'


const Background = (props) => {
    const [y, setY] = useState(props.y);
  
    useTick(delta => {
      if (props.canMove){
        setY(y - 0.5 * delta)
      }
    });
    let linkImage='../assets/'
    switch (props.image) {
        case 'bottleGreen':
            linkImage='../assets/fish/Fish1.png'
            break;
        case 'bottleBlue':
            linkImage=""
            break
        case 'canette':
            linkImage=""
            break;
        default:
            linkImage=""
      }
  
    return <Sprite image={linkImage} x={props.x-60} y={y} />
  }

  export default Background