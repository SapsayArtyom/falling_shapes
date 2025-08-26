import { ShapeModel } from './ShapeModel';
import { randomColor, rand, randInt } from '../helper/math';
import { ShapeType } from '../types';

let idCounter = 1;

export class ShapeFactory {
    constructor(
        private width: number,
        private height: number,
    ) {}

    createRandomAt(x: number, y: number): ShapeModel {
        const types: ShapeType[] = ['tri', 'quad', 'penta', 'hexa', 'circle', 'ellipse', 'random'];
        const t = types[randInt(0, types.length - 1)];
        return this.create(t === 'random' ? this.randomConcreteType() : t, x, y);
    }

    createRandomAtTop(): ShapeModel {
        const t = this.randomConcreteType();
        const x = rand(0, this.width);
        const y = -20;
        return this.create(t, x, y);
    }

    private randomConcreteType(): ShapeType {
        const all: ShapeType[] = ['tri', 'quad', 'penta', 'hexa', 'circle', 'ellipse'];
        return all[randInt(0, all.length - 1)];
    }

    create(type: ShapeType, x: number, y: number): ShapeModel {
        const m = new ShapeModel(idCounter++, type, randomColor(), { x, y });

        switch (type) {
            case 'circle': {
                m.radius = rand(8, 30);
                break;
            }
            case 'ellipse': {
                m.rx = rand(10, 28);
                m.ry = rand(8, 22);
                break;
            }
            default: {
                const sides = type === 'tri' ? 3 : type === 'quad' ? 4 : type === 'penta' ? 5 : 6;
                const r = rand(12, 34);
                m.polyLocal = Array.from({ length: sides }, (_, i) => {
                    const a = (i / sides) * Math.PI * 2;
                    return { x: Math.cos(a) * r, y: Math.sin(a) * r };
                });
            }
        }
        return m;
    }
}
