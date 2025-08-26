import { ShapeModel } from './ShapeModel';
import { ShapeFactory } from './ShapeFactory';

export class SceneModel {
    width: number;
    height: number;
    gravity = 400;
    spawnRate = 3; // shapes per second
    shapes: ShapeModel[] = [];

    private factory: ShapeFactory;
    private spawnAccumulator = 0;

    constructor(w: number, h: number) {
        this.width = w;
        this.height = h;
        this.factory = new ShapeFactory(w, h);
    }

    tick(dt: number) {
        this.spawnAccumulator += this.spawnRate * dt;
        while (this.spawnAccumulator >= 1) {
            this.spawnAccumulator -= 1;
            this.shapes.push(this.factory.createRandomAtTop());
        }

        for (const s of this.shapes) s.update(dt, this.gravity);

        const margin = 30;
        this.shapes = this.shapes.filter((s) => s.pos.y < this.height + margin);
    }

    spawnAt(x: number, y: number) {
        this.shapes.push(this.factory.createRandomAt(x, y));
    }

    removeById(id: number) {
        this.shapes = this.shapes.filter((s) => s.id !== id);
    }

    areaSum(): number {
        let a = 0;
        for (const s of this.shapes) a += s.area();
        return a;
    }
}
