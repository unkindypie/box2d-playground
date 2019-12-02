import * as PIXI from 'pixi.js';
import random from 'random';

import app from './pixi/pixiapp';
import loader, { loadResourses } from './pixi/loader';

import Mouse from './utils/Mouse';


const boxes = [];

app.view.onmouseup = (e)=>{
    boxes.push({
        x:  e.clientX, 
        y: e.clientY,
        width: 100,
        height: 80
    })
}
const onLoad = () => {
    const graphics = new PIXI.Graphics();
    app.ticker.add((delta) => {
        graphics.clear();
        boxes.forEach((box)=>{
            graphics.beginFill(0xf2fbfc);
            graphics.drawRect(box.x, box.y, box.width, box.height);
            graphics.endFill();
           
        })
        app.stage.addChild(graphics)
    })
}

loadResourses(onLoad);




