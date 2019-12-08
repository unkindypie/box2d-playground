import Entity from './Entity';
import * as tr from './utils/translator';
import { Graphics } from 'pixi.js'
import planck from 'planck-js';

export default class Box extends Entity {
    
    constructor(world, x,y, width, height, g){
        super();

        this.sHeight = height;
        this.sWidth = width;
        this.doNotClear = !!g;
        if(g){
            this.g = g;
        }
        
        this.body = world.createDynamicBody({
            x: tr.xToWorld(x),
            y: tr.yToWorld(y)
        })
        const fixtureDefenition = {
            density: 0.2,
            friction: 0.3,
            restriction: 0.5,
        }

        this.body.createFixture({
            shape: planck.Box(tr.xToWorld(this.sWidth/2), tr.xToWorld(this.sHeight/2)),
            fixtureDefenition
        })
        this.body.setMassData({
            mass : 1,
            center : planck.Vec2(),
            I : 1
          })
        this.body.setLinearVelocity(planck.Vec2(0,0));        
    }
    draw = ()=>{
        const position = tr.toScreen(this.body.getPosition());
        if(!this.doNotClear){
            this.g.clear();
        }
        //угол перевернутый, т.к. верх и низ тоже перевернуты
        this.g.setTransform(position.x, position.y, 1, 1, -this.body.getAngle())
        this.g.lineStyle(2, 0xd1d1d1, 1);
        this.g.beginFill(0xf2fbfc);
 
        this.g.drawRect(-this.sWidth/2, -this.sHeight/2, this.sWidth, this.sHeight);
        this.g.endFill();
    }  
}