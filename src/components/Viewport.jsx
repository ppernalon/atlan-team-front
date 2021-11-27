import React from "react"
import * as PIXI from "pixi.js"
import { PixiComponent, useApp } from "@inlet/react-pixi"
import { Viewport as PixiViewport } from "pixi-viewport"
import * as Fish from './Fish'


const PixiComponentViewport = PixiComponent("Viewport", {
    create: (props) => {
      const viewport = new PixiViewport({
        screenWidth: props.width,
        screenHeight: props.height,
        worldWidth: props.width * 2,
        worldHeight: props.height * 2,
        interaction: props.app.renderer.plugins.interaction
      });
      Fish.start()  // starts the target moving
      viewport.follow(Fish.get(), {
          speed: 0,           // speed to follow in pixels/frame (0=teleport to location)
          acceleration: null, // set acceleration to accelerate and decelerate at this rate; speed cannot be 0 to use acceleration
          radius: null,       // radius (in world coordinates) of center circle where movement is allowed without moving the viewport
      })
      Fish.setup(viewport)
      return viewport;
    }
  });
  

const Viewport = (props) => {
    const app = useApp();
    return <PixiComponentViewport app={app} {...props} />;
}
  

export default Viewport;
