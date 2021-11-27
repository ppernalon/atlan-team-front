import { Stage } from '@inlet/react-pixi'
import Background from '../components/Background'
import PlayerFish from '../components/PlayerFish'
import MyFish from '../components/MyFish'
import ObjectImpactable from '../components/ObjectImpactable'

const widthStage = window.innerWidth - 45
const heightStage = window.innerHeight - 45
const GamePlay = () => {

  return(
    <Stage width={widthStage} height={heightStage} options={{ backgroundColor: 0x1C2842 }}>
      <Background canMove={true} x={0} y={0} height={heightStage} width={widthStage}/>
      <PlayerFish x={125} y={200} />
      <MyFish />
      <ObjectImpactable canMove={true} x={widthStage-150} y={0} imageName={'bottleGreen'} maxHeight={heightStage} maxWidth={widthStage}/>
      <ObjectImpactable canMove={true} x={widthStage-150} y={0} imageName={'bottleBlue'} maxHeight={heightStage} maxWidth={widthStage}/>
      <ObjectImpactable canMove={true} x={widthStage-150} y={0} imageName={'bin'} maxHeight={heightStage} maxWidth={widthStage}/>
      <ObjectImpactable canMove={true} x={widthStage-150} y={0} imageName={'canette'} maxHeight={heightStage} maxWidth={widthStage}/>
    </Stage>
  )
    
}

export default GamePlay