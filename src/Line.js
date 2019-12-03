import * as PIXI from 'pixi.js';
import Entity from './Entity';
import * as tr from './utils/translator';
import planck from 'planck-js';

class Line extends Entity {
    constructor(world, x1, y1, x2, y2){
        super()
        this.start = {x:x1, y:y1}
        this.end = {x:x2, y:y2}

        this.body = world.createBody();
        this.body.createFixture(planck.Edge(tr.toWorld(x1, y1), tr.toWorld(x2, y2)));
        this.body.setAngle(0);
    }
    draw = () =>{
        this.g.clear();

        this.g.lineStyle(5, 0xd1d1d1, 1);
        this.g.beginFill(0xf2fbfc);
        this.g.moveTo(this.start.x, this.start.y);
        this.g.lineTo(this.end.x, this.end.y);
        this.g.endFill();
    }
}

export default Line;