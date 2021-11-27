import { Stage } from '@inlet/react-pixi'
import Background from './Background'
import PlayerFish from './PlayerFish'
import MyFish from './MyFish'
import ObjectImpactable from './ObjectImpactable'

const widthStage = window.innerWidth - 45
const heightStage = window.innerHeight - 45

const GamePlay = () => {

  return(
    <Stage width={widthStage} height={heightStage} options={{ backgroundColor: 0x1C2842 }}>
      <Background canMove={true} x={0} y={0} height={heightStage} width={widthStage}/>
      <PlayerFish x={125} y={200} />
      <MyFish />
      <ObjectImpactable canMove={true} x={widthStage} y={heightStage} image={'bottleGreen'} />
    </Stage>
  )
}

export default GamePlay