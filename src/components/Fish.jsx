import * as PIXI from "pixi.js"
import fishImage from '../assets/fish/Fish1.png'

const SIZE = 500
const SPEED = 3


const target = new PIXI.Sprite.from(fishImage)



let _viewport, _active, _velocity, _time, _last

export function start() {
    _active = true
    _last = Date.now()
}

export function setup(viewport) {
    viewport.addChild(target)
    target.width = SIZE
    target.height= SIZE
    target.anchor.set(0.5)
    target.position.set( 0 , 0)
    _viewport = viewport
    changeTarget()
}

export function update() {
    if (_active) {
        target.x += _velocity[0]
        target.y += _velocity[1]
        const now = Date.now()
        _time -= now - _last
        _last = now
        if (_time <= 0) {
            changeTarget()
        }
    }
    requestAnimationFrame(() => update())
}

export function get() {
    return target
}

function changeTarget() {
    const x = 0
    const y = 0
    _velocity = [SPEED, SPEED]
    _time = Math.sqrt(Math.pow(x - target.x, 2) + Math.pow(y - target.y, 2)) / (SPEED * 60 / 1000)
}

