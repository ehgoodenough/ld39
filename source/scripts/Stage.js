import * as Pixi from "pixi.js"
import Keyb from "keyb"

import {FRAME} from "scripts/Constants.js"

import BadGuy from "scripts/BadGuy.js"
import GoodGuy from "scripts/GoodGuy.js"

export default class Stage extends Pixi.Container {
    constructor() {
        super()

        this.addChild(this.badguy = new BadGuy())
        this.addChild(this.goodguy = new GoodGuy())
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
