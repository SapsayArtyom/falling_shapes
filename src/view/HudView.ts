import { SceneModel } from '../models/SceneModel';

export class HudView {
    elCount = document.getElementById('count') as HTMLInputElement;
    elArea = document.getElementById('area') as HTMLInputElement;
    elRate = document.getElementById('rate') as HTMLInputElement;
    elG = document.getElementById('gravity') as HTMLInputElement;

    btnRateDec = document.getElementById('rate-dec') as HTMLButtonElement;
    btnRateInc = document.getElementById('rate-inc') as HTMLButtonElement;
    btnGDec = document.getElementById('g-dec') as HTMLButtonElement;
    btnGInc = document.getElementById('g-inc') as HTMLButtonElement;

    constructor(private model: SceneModel) {}

    bindControls(onRate: (delta: number) => void, onG: (delta: number) => void) {
        this.btnRateDec.onclick = () => onRate(-1);
        this.btnRateInc.onclick = () => onRate(+1);
        this.btnGDec.onclick = () => onG(-50);
        this.btnGInc.onclick = () => onG(+50);
    }

    update() {
        this.elCount.value = String(this.model.shapes.length);
        this.elArea.value = Math.round(this.model.areaSum()).toString();
        this.elRate.value = String(this.model.spawnRate.toFixed(0));
        this.elG.value = String(Math.round(this.model.gravity));
    }
}
