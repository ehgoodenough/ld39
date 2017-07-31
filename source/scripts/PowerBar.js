import * as Pixi from "pixi.js"

import {COLORS} from "scripts/Constants.js"
import {BAR_MARGIN} from "scripts/Constants.js"

const BORDER_X = 4
const BORDER_Y = 2
const TICK_COUNT = 11
const TICK_WIDTH = 3
const TICK_HEIGHT = 6

export default class PowerBar extends Pixi.Sprite {
    constructor() {
        super(Pixi.Texture.from(require("images/powerbar.png")))

        this.stack = 1000
        this.position.x = BAR_MARGIN
        this.position.y = BAR_MARGIN

        this.addChild(this.graphics = new Pixi.Graphics())
    }
    update(delta) {
        let goodguy
        if(!!this.parent
        && !!this.parent.goodguy) {
            goodguy = this.parent.goodguy
        } else {
            goodguy = {power: 0, maxpower: 1}
        }
        let percent = Math.max(Math.min(goodguy.power / goodguy.maxpower, 1), 0)
        let width = Math.ceil(percent * TICK_COUNT) * TICK_WIDTH

        this.graphics.clear()
        this.graphics.beginFill(COLORS.VOID)
        this.graphics.drawRect(BORDER_X + width, BORDER_Y, (TICK_COUNT * TICK_WIDTH) - width, TICK_HEIGHT)
    }
}
