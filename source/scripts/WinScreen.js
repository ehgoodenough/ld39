import * as Pixi from "pixi.js"

const SHAKE_SPEED = 50
const SHAKE_DISTANCE = 30

import {FRAME} from "scripts/Constants.js"
import {Win} from "scripts/Sounds.js"

export default class WinScreen extends Pixi.Sprite {
    constructor() {
        super(Pixi.Texture.from(require("images/victory.png")))
        this.visible = false

        this.time = 0 // in ms

        this.anchor.x = 0.5
        this.anchor.y = 0.5

        this.position.x = FRAME.WIDTH / 2
        this.position.y = FRAME.HEIGHT / 2

        this.stack = 10000000000000
    }
    update(delta) {
        if(!!this.parent
        && !!this.parent.badguy) {
            if(this.parent.badguy.hasExploded) {
                this.time += delta.ms

                this.rotation = Math.sin(this.time / SHAKE_SPEED) / SHAKE_DISTANCE

                if(this.time > 2000) {
                    if(this.visible != true) {
                        Win.play()
                    }
                    this.visible = true
                }
            }
        }
    }
}
