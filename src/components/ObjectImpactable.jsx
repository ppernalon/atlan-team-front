import { useEffect, useState } from 'react'
import { Stage, Sprite, useTick } from '@inlet/react-pixi'
import bottleGreen from "../assets/objectImpactable/bottle.png"
import bottleBlue from "../assets/objectImpactable/bottle_2.png"
import canette from "../assets/objectImpactable/Canette.png"
import bin from "../assets/objectImpactable/poubelle.png"



const ObjectImpactable = (props) => {
    const [y, setY] = useState(props.y);
    const [x, setX] = useState(Math.random() * props.maxWidth);
  
    useTick(delta => {
      if (props.canMove){
          if (y < props.maxHeight - 140){
            setY(y + Math.random()* 3 * delta)
            setX(x - 0.5 * delta)
          }
          else{
            setX(x - 0.5 * delta)
          }
      }

    });
    let bottleImage=''
    switch (props.imageName) {
        case 'bottleGreen':
          bottleImage=bottleGreen
            break;
        case 'bottleBlue':
          bottleImage=bottleBlue
            break
        case 'canette':
          bottleImage= canette
            break
        case 'bin':
          bottleImage= bin
          break
      }  
    return <Sprite image={bottleImage} x={x} y={y} />
  }

  export default ObjectImpactable