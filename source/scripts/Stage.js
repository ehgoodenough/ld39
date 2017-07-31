import * as Pixi from "pixi.js"
import Keyb from "keyb"

import {FRAME} from "scripts/Constants.js"

import BadGuy from "scripts/BadGuy.js"
import GoodGuy from "scripts/GoodGuy.js"
import ZapRay from "scripts/ZapRay.js"
import PowerBar from "scripts/PowerBar.js"
import HullBar from "scripts/HullBar.js"
import WinScreen from "scripts/WinScreen.js"

export default class Stage extends Pixi.Container {
    constructor() {
        super()

        this.addChild(this.goodguy = new GoodGuy())
        this.addChild(new PowerBar())
        this.addChild(new WinScreen())
        this.addChild(this.hull = new HullBar())

        this.addChild(this.prompt = new PromptScreen())
        if(this.prompt.isDone) {
            this.addChild(new ZapRay())
            this.addChild(this.badguy = new BadGuy())
            this.goodguy.power = this.goodguy.maxpower
            this.hull.position.y = this.hull.behere
        }
    }
    update(delta) {
        this.children.forEach((child) => {
            if(child.update instanceof Function) {
                child.update(delta)
            }
        })
    }
    addChild(child) {
        super.addChild(child)
        this.children.sort(function(a, b) {
            a = a.stack || 0
            b = b.stack || 0
            if(a < b) {
                return -1
            } else if(a > b) {
                return +1
            } else {
                return 0
            }
        })
    }
    restart() {
        if(!!this.parent) {
            this.parent.startStage({
                // ...
            })
        }
    }
}

Pixi.settings.SCALE_MODE = Pixi.SCALE_MODES.NEAREST
const SEARCH_SCREEN = Pixi.Texture.from(require("images/search.png"))
const INSTRUCTIONS_SCREEN_1 = Pixi.Texture.from(require("images/instructions.png"))
const INSTRUCTIONS_SCREEN_2 = Pixi.Texture.from(require("images/instructions2.png"))

const SHAKE_SPEED = 50
const SHAKE_DISTANCE = 30
// TODO: TELL THEM TO UPLUG IT!!

class PromptScreen extends Pixi.Sprite {
    constructor() {
        super(INSTRUCTIONS_SCREEN_1)

        this.stack = 10000000

        this.time = 0

        this.isDone = window.hasDonePrompts || false
        if(this.isDone == true) {
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

// todo: do not restart the tutorial when resetting the scene!!!
// todo: start the game when they finish the second instructions
