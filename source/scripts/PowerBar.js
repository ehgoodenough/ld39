import * as Pixi from "pixi.js"

import {COLORS} from "scripts/Constants.js"
const MARGIN = 3

export default class PowerBar extends Pixi.Sprite {
    constructor() {
        super(Pixi.Texture.from(require("images/powerbar.png")))

        this.position.x = MARGIN
        this.position.y = MARGIN

        this.stack = 1000

        this.addChild(this.graphics = new Pixi.Graphics())
    }
    update(delta) {
        if(!!this.parent
        && !!this.parent.goodguy) {
            let goodguy = this.parent.goodguy
            let width = Math.ceil((goodguy.power / goodguy.maxpower) * 11) * 3

            this.graphics.clear()
            this.graphics.beginFill(COLORS.VOID)
            this.graphics.drawRect(width + 4, 1, 32 - width, 8)
        }
    }
}
