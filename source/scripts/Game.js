import * as Pixi from "pixi.js"
import {FRAME} from "scripts/Constants.js"

import Stage from "scripts/Stage.js"

export default class Game {
    constructor() {
        this.renderer = Pixi.autoDetectRenderer({
            width: FRAME.WIDTH, height: FRAME.HEIGHT,
            transparent: true
        })

        if("DEVELOPMENT") {
            window.game = this
        }

        this.startStage()
    }
    update(delta) {
        if(!!this.stage) {
            this.stage.update(delta)
        }
    }
    render() {
        this.renderer.render(this.stage)
    }
    startStage() {
        this.stage = new Stage()
        this.stage.parent = this
    }
}
