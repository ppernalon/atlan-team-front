import backgroundImage_1 from '../assets/background/bg_1.png'
import backgroundImage_2 from '../assets/background/bg_2.png'
import backgroundImage_3 from '../assets/background/bg_3.png'
import backgroundImage_4 from '../assets/background/bg_4.png'
import backgroundImage_5 from '../assets/background/bg_5.png'
import backgroundImage_6 from '../assets/background/bg_6.png'
import backgroundImage_7 from '../assets/background/bg_7.png'
import backgroundImage_8 from '../assets/background/bg_8.png'
import backgroundImage_9 from '../assets/background/bg_9.png'
import backgroundImage_10 from '../assets/background/bg_10.png'
import { useState } from 'react'
import { Sprite, useTick } from '@inlet/react-pixi'


const Background = (props) => {
    const [x, setX] = useState(props.x)
    const [width, setWidth] = useState(0)

    const backgrounds = [
      backgroundImage_1,
      backgroundImage_2,
      backgroundImage_3,
      backgroundImage_4,
      backgroundImage_5,
      backgroundImage_6,
      backgroundImage_7,
      backgroundImage_8,
      backgroundImage_9,
      backgroundImage_10
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

    return backgrounds.map((bg, index) => <Sprite key={"bg_" + index } height={props.height} image={bg} x={props.x + index*width} y={0} />)
  }

  export default Background