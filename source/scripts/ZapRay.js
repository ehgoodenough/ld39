import * as Pixi from "pixi.js"

import {COLORS} from "scripts/Constants.js"
import {getDistance} from "scripts/Geometry.js"
import {getDirection} from "scripts/Geometry.js"

const BEND = Math.PI / 8

export default class ZapRay extends Pixi.Graphics {
    update(delta) {
        this.clear()

        if(!!this.parent
        && !!this.parent.badguy
        && !!this.parent.goodguy) {
            if(this.parent.goodguy.isAttacking) {
                var points = [
                    this.parent.goodguy.position,
                    this.parent.badguy.position
                ]

                // Bzzz!
                points = this.electrifyPoints(points)
                points = this.electrifyPoints(points)
                points = this.electrifyPoints(points)
                points = this.electrifyPoints(points)
                points = this.electrifyPoints(points)

                let alpha = 1
                let thickness = Math.round(Math.random() + 1)
                this.lineStyle(thickness, COLORS.ELECTRICITY, alpha)
                
                let point = points.shift()
                this.moveTo(point.x, point.y)
                points.forEach((point) => {
                    this.lineTo(point.x, point.y)
                })
            }
        }
    }
    electrifyPoints(points) {
        // for each point, put a point between them
        // (this'll just make a line, but that's fine for now)
        // then find the perpendicular angle and randomize on that
        // do that recursively for X generations.
        return points.reduce((points, nextPoint) => {
            if(points.length == 0) {
                return [nextPoint]
            }

            let previousPoint = points[points.length - 1]
            let tweenPoint = new Pixi.Point()

            let direction = getDirection(previousPoint, nextPoint)
            let distance = getDistance(previousPoint, nextPoint)

            distance /= 2
            direction += (Math.random() * BEND) - (BEND / 2)

            tweenPoint.x = previousPoint.x + Math.cos(direction) * distance
            tweenPoint.y = previousPoint.y + Math.sin(direction) * distance

            return points.concat([tweenPoint, nextPoint])
        }, [])
    }
    get stack() {
        return -100
    }
}
