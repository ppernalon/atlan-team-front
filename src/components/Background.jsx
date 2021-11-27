import backgroundImage_1 from '../assets/background.png'
import { useState } from 'react'
import { Sprite, useTick } from '@inlet/react-pixi'


const Background = (props) => {
    const [x, setX] = useState(props.x)
    const [width, setWidth] = useState(0)

    const backgrounds = [
      backgroundImage_1,
      backgroundImage_1,
      backgroundImage_1,
      backgroundImage_1,
      backgroundImage_1,
      backgroundImage_1,
      backgroundImage_1,
      backgroundImage_1,
      backgroundImage_1,
      backgroundImage_1
    ]

    const img = new Image()
    img.onload = () => {
      setWidth(img.width)
    }
    img.src = backgroundImage_1
  
    useTick(delta => {
      if (props.canMove){
        if(x <= -width*backgrounds.length + window.innerWidth){
        }
        else{
          setX(x - 12 * delta)
        }
      }
    })

    return backgrounds.map((bg, index) => <Sprite key={"bg_" + index } height={props.height} image={bg} x={x + index*width} y={0} />)
  }

  export default Background