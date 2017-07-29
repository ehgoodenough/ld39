import * as Pixi from "pixi.js"
import Keyb from "keyb"

import {FRAME} from "scripts/Constants.js"

import Player from "scripts/Player.js"
import Projectile from "scripts/Projectile.js"

export default class Game extends Pixi.Container {
    constructor() {
        super()

        this.renderer = Pixi.autoDetectRenderer({
            width: FRAME.WIDTH, height: FRAME.HEIGHT,
            transparent: true
        })

        // this.addChild(this.player = new Player())

        if("DEVELOPMENT") {
            window.game = this
        }
    }
    update(delta) {
        this.children.forEach((child) => {
            if(child.update instanceof Function) {
                child.update(delta)
            }
        })

        if(Keyb.isJustDown("<space>", delta.ms)) {
            for(var i = -3; i <= +3; i += 1) {
                this.addChild(new Projectile({
                    position: {x: FRAME.WIDTH, y: FRAME.HEIGHT / 2},
                    direction: Math.PI + (i * (Math.PI / 16))
                }))
            }
        }
    }
    render() {
        this.renderer.render(this)
    }
}
