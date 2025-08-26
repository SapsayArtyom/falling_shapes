import { Application, Graphics, Container, Rectangle } from 'pixi.js';
import { SceneModel } from '../models/SceneModel';
import { ShapeModel } from '../models/ShapeModel';

export class PixiView {
    private app: Application;
    private root: Container;
    private gfxById = new Map<number, Graphics>();

    constructor(
        private host: HTMLElement,
        private model: SceneModel,
    ) {
        this.app = new Application();
        this.root = new Container();
    }

    async init() {
        await this.app.init({
            background: '0x000000',
            antialias: true,
            resizeTo: undefined,
            width: this.model.width,
            height: this.model.height,
        });
        this.app.stage.addChild(this.root);
        this.host.appendChild(this.app.canvas);

        this.app.stage.eventMode = 'static';
        this.app.stage.hitArea = new Rectangle(0, 0, this.model.width, this.model.height);
    }

    onPointerDown(cb: (x: number, y: number) => void) {
        this.app.stage.on('pointerdown', (e) => {
            const { x, y } = e.global;
            cb(x, y);
        });
    }

    private drawShape(s: ShapeModel) {
        let g = this.gfxById.get(s.id);
        if (!g) {
            g = new Graphics();
            g.eventMode = 'static';
            g.cursor = 'pointer';
            this.root.addChild(g);
            this.gfxById.set(s.id, g);
        }
        g.clear();

        if (s.radius != null) {
            g.circle(s.pos.x, s.pos.y, s.radius);
        } else if (s.rx != null && s.ry != null) {
            g.ellipse(s.pos.x, s.pos.y, s.rx, s.ry);
        } else if (s.polyLocal && s.polyLocal.length) {
            // Рисуем polyLocal, смещая на pos (чтобы падал)
            const p0 = s.polyLocal[0];
            g.moveTo(s.pos.x + p0.x, s.pos.y + p0.y);
            for (let i = 1; i < s.polyLocal.length; i++) {
                const p = s.polyLocal[i];
                g.lineTo(s.pos.x + p.x, s.pos.y + p.y);
            }
            g.closePath();
        }
        g.fill(s.color);
    }

    renderAll() {
        const seen = new Set<number>();
        for (const s of this.model.shapes) {
            this.drawShape(s);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (this.gfxById.get(s.id) as any).__shapeId = s.id;
            seen.add(s.id);
        }
        for (const [id, g] of this.gfxById) {
            if (!seen.has(id)) {
                g.destroy();
                this.gfxById.delete(id);
            }
        }
    }

    hitTest(x: number, y: number): number | null {
        const pt = { x, y };
        for (const [id, g] of Array.from(this.gfxById).reverse()) {
            if (g.containsPoint(pt)) return id;
        }
        return null;
    }

    getApp(): Application {
        return this.app;
    }
}
