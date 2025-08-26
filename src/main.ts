import { SceneModel } from './models/SceneModel';
import { PixiView } from './view/PixiView';
import { HudView } from './view/HudView';
import { AppController } from './controller/AppController';

const STAGE_W = 800,
    STAGE_H = 600;

const stageHost = document.getElementById('stage')!;
const model = new SceneModel(STAGE_W, STAGE_H);
const view = new PixiView(stageHost, model);
const hud = new HudView(model);
const app = new AppController(model, view, hud);

app.start();
