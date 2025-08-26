import { Vec2 } from '../types';

export function polygonArea(points: Vec2[]): number {
    let s = 0;
    for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
        s += points[j].x * points[i].y - points[i].x * points[j].y;
    }
    return Math.abs(s) * 0.5;
}

export function rand(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}

export function randInt(min: number, max: number): number {
    return Math.floor(rand(min, max + 1));
}

export function randomColor(): number {
    return Math.floor(Math.random() * 0xffffff);
}
