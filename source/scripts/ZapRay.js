import * as Pixi from "pixi.js"

import {COLORS} from "scripts/Constants.js"

export default class ZapRay extends Pixi.Graphics {
    update(delta) {
        this.clear()

        if(!!this.parent
        && !!this.parent.badguy
        && !!this.parent.goodguy) {

            if(this.parent.goodguy.isAttacking) {
                this.lineStyle(2, COLORS.ELECTRICITY, 1)
                this.moveTo(this.parent.goodguy.position.x, this.parent.goodguy.position.y)
                this.lineTo(this.parent.badguy.position.x, this.parent.badguy.position.y)
            }
        }
    }
    get stack() {
        return -100
    }
}
