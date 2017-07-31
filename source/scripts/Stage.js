import * as Pixi from "pixi.js"
import Keyb from "keyb"

import {FRAME} from "scripts/Constants.js"

import BadGuy from "scripts/BadGuy.js"
import GoodGuy from "scripts/GoodGuy.js"
import ZapRay from "scripts/ZapRay.js"
import PowerBar from "scripts/PowerBar.js"
import HullBar from "scripts/HullBar.js"
import WinScreen from "scripts/WinScreen.js"
import PromptScreen from "scripts/PromptScreen.js"

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
