import * as Pixi from "pixi.js"
import Keyb from "keyb"

import {FRAME} from "scripts/Constants.js"

import BadGuy from "scripts/BadGuy.js"
import GoodGuy from "scripts/GoodGuy.js"
import ZapRay from "scripts/ZapRay.js"

export default class Stage extends Pixi.Container {
    constructor() {
        super()

        this.addChild(this.zapray = new ZapRay())
        this.addChild(this.goodguy = new GoodGuy())
        this.addChild(this.badguy = new BadGuy())
    }
    update(delta) {
        this.children.forEach((child) => {
            if(child.update instanceof Function) {
                child.update(delta)
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
