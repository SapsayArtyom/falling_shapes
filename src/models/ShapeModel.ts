import { Vec2, ShapeType } from '../types';
import { polygonArea } from '../helper/math';

export class ShapeModel {
    id: number;
    type: ShapeType;
    color: number;
    pos: Vec2;
    vel: Vec2 = { x: 0, y: 0 };

    radius?: number;
    rx?: number;
    ry?: number;
    polyLocal?: Vec2[];

    constructor(id: number, type: ShapeType, color: number, pos: Vec2) {
        this.id = id;
        this.type = type;
        this.color = color;
        this.pos = pos;
    }

    update(dt: number, g: number) {
        this.vel.y += g * dt;
        this.pos.x += this.vel.x * dt;
        this.pos.y += this.vel.y * dt;
    }

    area(): number {
        switch (this.type) {
            case 'circle':
                if (!this.radius) return 0;
                return Math.PI * this.radius * this.radius;
            case 'ellipse':
                if (!this.rx || !this.ry) return 0;
                return Math.PI * this.rx * this.ry;
            default:
                return this.polyLocal ? polygonArea(this.polyLocal) : 0;
        }
    }
}
