import React from 'react'
import { Sprite } from '@inlet/react-pixi'
import bottleGreen from "../assets/objectImpactable/bottle.png"
import bottleBlue from "../assets/objectImpactable/bottle_2.png"
import canette from "../assets/objectImpactable/Canette.png"
import bin from "../assets/objectImpactable/poubelle.png"

const ObjectImpactable = (props) => {
    let bottleImage=''
    switch (props.imageName) {
        case 'bottleGreen':
          bottleImage=bottleGreen
          break;
        case 'bottleBlue':
          bottleImage=bottleBlue
          break
        case 'bin':
          bottleImage= bin
          break
        default:
        case 'canette':
          bottleImage= canette
          break
      }  
    return <Sprite image={bottleImage} x={props.x} y={props.y} />
  }

  export default ObjectImpactable