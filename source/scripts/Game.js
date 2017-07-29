import * as Pixi from "pixi.js"
import Keyb from "keyb"

const WIDTH = 160
const HEIGHT = 90

export default class Game extends Pixi.Container {
    constructor() {
        super()

        this.renderer = Pixi.autoDetectRenderer({
            width: WIDTH, height: HEIGHT,
            transparent: true
        })

        this.addChild(this.player = new Player())
    }
    update(delta) {
        this.children.forEach((child) => {
            if(child.update instanceof Function) {
                child.update(delta)
            }
        })
    }
    render() {
        this.renderer.render(this)
    }
}

class Player extends Pixi.Sprite {
    constructor() {
        super(Pixi.Texture.from(require("images/pixel.png")))

        this.width = 12
        this.height = 12

        this.speed = 1.5

        this.position.x = 160 / 2
        this.position.y = 90 / 2

        this.anchor.x = 0.5
        this.anchor.y = 0.5
    }
    update(delta) {
        if(Keyb.isDown("W") || Keyb.isDown("<up>")) {
            this.position.y -= 1
        }
        if(Keyb.isDown("S") || Keyb.isDown("<down>")) {
            this.position.y += 1
        }
        if(Keyb.isDown("A") || Keyb.isDown("<left>")) {
            this.position.x -= 1
        }
        if(Keyb.isDown("D") || Keyb.isDown("<right>")) {
            this.position.x += 1
        }
    }
}
