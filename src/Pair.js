import * as PIXI from 'pixi.js';
import Entity from './Entity';
import * as tr from './utils/translator';
import planck from 'planck-js';
import Box from './Box';

class Pair extends Entity {
    constructor(world, x, y){
        super();
        this.box1 = new Box(world, x-50, y, 50, 50);
        this.box2 = new Box(world, x+50, y, 50, 50);
        this.addChild(this.box1);
        this.addChild(this.box2);

        this.distJoint = world.createJoint(planck.DistanceJoint({
            frequencyHz: 3,
            dampingRatio: 0.1,
            length: tr.xToWorld(100)
        }, this.box1.body, this.box2.body));
        
    }
    draw = ()=>{
        this.g.clear();
        this.box1.draw();
        this.box2.draw();
        this.g.lineStyle(3, 0xd1d1d1, 1);
        const box1Pos = tr.toScreen(this.box1.body.getPosition());
        const box2Pos = tr.toScreen(this.box2.body.getPosition());
        this.g.moveTo(box1Pos.x, box1Pos.y);
        this.g.lineTo(box2Pos.x, box2Pos.y);
    }
}
export default Pair;