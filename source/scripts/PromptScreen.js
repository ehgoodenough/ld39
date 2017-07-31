import * as Pixi from "pixi.js"

import BadGuy from "scripts/BadGuy.js"
import ZapRay from "scripts/ZapRay.js"

Pixi.settings.SCALE_MODE = Pixi.SCALE_MODES.NEAREST
const INSTRUCTIONS_SCREEN_1 = Pixi.Texture.from(require("images/instructions.png"))
const INSTRUCTIONS_SCREEN_2 = Pixi.Texture.from(require("images/instructions2.png"))

const SHAKE_SPEED = 50
const SHAKE_DISTANCE = 30

export default class PromptScreen extends Pixi.Sprite {
    constructor() {
        super(INSTRUCTIONS_SCREEN_1)

        this.stack = 10000000

        this.time = 0

        this.isDone = window.hasDonePrompts || false
        if(window.localStorage) {
            window.hasDonePrompts = window.localStorage.getItem("hasDonePrompts")
            this.isDone = window.localStorage.getItem("hasDonePrompts")
        }
        if(this.isDone == true || this.isDone == "true") {
            this.visible = false
        }
    }
    update(delta) {
        if(!this.parent
        || !this.parent.goodguy) {
            return
        }

        if(this.isDone) {
            this.visible = false
        } else if(this.isAlmostDone) {
            this.time += delta.ms
            this.rotation = Math.sin(this.time / SHAKE_SPEED) / SHAKE_DISTANCE

            if(this.parent.goodguy.isAttacking) {
                this.isDone = true
                window.hasDonePrompts = true
                if(window.localStorage) {
                    window.localStorage.setItem("hasDonePrompts", true)
                }
            }
        } else {
            if(this.parent.goodguy.power >= this.parent.goodguy.maxpower) {
                this.isAlmostDone = true
                this.texture = INSTRUCTIONS_SCREEN_2

                this.parent.addChild(new ZapRay())
                this.parent.addChild(this.parent.badguy = new BadGuy())
            }
        }
    }
}
