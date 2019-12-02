import * as PIXI from 'pixi.js';

const app = new PIXI.Application({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
    resolution: window.devicePixelRatio,
    backgroundColor: 0xcaf5fa
});

document.body.appendChild(app.view);

export default app;