import * as PIXI from 'pixi.js';
import random from 'random';
import planck from 'planck-js';

import app from './pixi/pixiapp';
import loader, { loadResourses } from './pixi/loader';

const boxes = [];
const box2d = planck.World({
    gravity: planck.Vec2(0, -9)
});

const toWorld = (x)=>{
    return x * 0.02;
}
const toScreen = (x)=>{
    return x / 0.02;
}

app.view.onmousedown = (e)=>{
    const scrWidth = 70;
    const scrHeight = 65;
    
    const body = box2d.createDynamicBody({
        x: toWorld(e.clientX),
        y: toWorld(app.view.height - e.clientY)
    })
    const fixtureDefenition = {
        density: 0.2,
        friction: 0.3,
        restriction: 0.5,
    }
    body.createFixture({
        shape: planck.Box(toWorld(scrWidth/2), toWorld(scrHeight/2)),
        fixtureDefenition
    })
    body.setMassData({
        mass : 1,
        center : planck.Vec2(),
        I : 1
      })

    const graphics = new PIXI.Graphics();
    app.stage.addChild(graphics)
    boxes.push({
        x: e.clientX, 
        y: e.clientY,
        width: scrWidth,
        height: scrHeight,
        body,
        graphics
    })
    
}
const onLoad = () => {
    

    var bar = box2d.createBody();
    bar.createFixture(planck.Edge(planck.Vec2(-20, 5), planck.Vec2(20, 5)));
    bar.setAngle(0);
    

    app.ticker.add((delta) => {
        
        box2d.step(1/60);

        boxes.forEach((box)=>{
            const pos = box.body.getPosition();
            const { graphics } = box;
            graphics.clear();

            //угол перевернутый, т.к. верх и низ тоже перевернуты
            graphics.setTransform(toScreen(pos.x),app.view.height - toScreen(pos.y), 1, 1, -1 * box.body.getAngle())
            graphics.lineStyle(2, 0xFEEB77, 1);
            graphics.beginFill(0xf2fbfc);
     
            graphics.drawRect(-box.width/2, -box.height/2, box.width, box.height);
            graphics.endFill();
            
           
        })
        
    })
}

loadResourses(onLoad);




