import { SceneModel } from '../models/SceneModel';
import { PixiView } from '../view/PixiView';
import { HudView } from '../view/HudView';
import { Ticker } from 'pixi.js';

export class AppController {
    private tickerFn?: (ticker: Ticker) => void;

    constructor(
        private model: SceneModel,
        private view: PixiView,
        private hud: HudView,
    ) {}

    async start() {
        await this.view.init();

        this.view.onPointerDown((x, y) => {
            const id = this.view.hitTest(x, y);
            if (id != null) this.model.removeById(id);
            else this.model.spawnAt(x, y);
        });

        this.hud.bindControls(
            (d) => {
                this.model.spawnRate = Math.max(0, Math.min(30, this.model.spawnRate + d));
            },
            (d) => {
                this.model.gravity = Math.max(0, Math.min(3000, this.model.gravity + d));
            },
        );

        this.tickerFn = (ticker: Ticker) => {
            let dt = ticker.deltaMS / 1000;
            dt = Math.min(dt, 0.05);
            this.model.tick(dt);
            this.view.renderAll();
            this.hud.update();
        };

        this.view.getApp().ticker.add(this.tickerFn);
    }

    stop() {
        if (this.tickerFn) {
            this.view.getApp().ticker.remove(this.tickerFn);
            this.tickerFn = undefined;
        }
    }
}
