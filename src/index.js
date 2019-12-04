import * as PIXI from 'pixi.js';
import random from 'random';
import planck from 'planck-js';

import app from './pixi/pixiapp';
import loader, { loadResourses } from './pixi/loader';
import * as tr from './utils/translator';
import Mouse from './utils/Mouse';
import Box from './Box';
import Line from './Line';
import Pair from './Pair';
import Ship from './Ship';

const box2d = planck.World({
    gravity: planck.Vec2(0, -9)
});
tr.setScreenHeight(app.view.height);

const entities = [];

document.documentElement.onkeyup = (e)=>{
    if(e.code === "Space"){
        const pair = new Pair(box2d, Mouse.position.x, Mouse.position.y);
        entities.push(pair);
        app.stage.addChild(pair);
    }
    if(e.key === 'p'){
        const ship = new Ship(box2d, Mouse.position.x, Mouse.position.y);
        entities.push(ship);
        app.stage.addChild(ship);
    }
}

const onLoad = () => {
    const line1 = new Line(box2d, 50, app.view.height - app.view.height * 0.2, app.view.width - 50, app.view.height - app.view.height * 0.2);
    entities.push(line1);
    app.stage.addChild(line1);
   

    app.ticker.add((delta) => {
        if(Mouse.isPressed){
            const box = new Box(box2d, Mouse.position.x, Mouse.position.y, random.int(40, 80), random.int(40, 80))
            entities.push(box);
            app.stage.addChild(box);
        }

        box2d.step(1/60);
        for(let i_ in entities){
            const i = parseInt(i_);
            entities[i].draw();
        }
    })
}

loadResourses(onLoad);




