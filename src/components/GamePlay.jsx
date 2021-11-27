import { Stage, Sprite } from '@inlet/react-pixi'
import fish from '../assets/fish/Fish1.png'
import Viewport from './Viewport'
import {update as FishUpdate} from './Fish'

const widthStage = window.innerWidth - 45
const heightStage = window.innerHeight - 45

const GamePlay = () => {
  requestAnimationFrame(() => FishUpdate())
  return(
    <Stage width={widthStage} height={heightStage} options={{ backgroundColor: 0x1C2842 }}>
      <Viewport width={widthStage/5} height={heightStage/5} >
      </Viewport>
      <Sprite image={fish} x={100} y={100} />

    </Stage>
  )
}

export default GamePlay