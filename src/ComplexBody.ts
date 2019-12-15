import * as PIXI from 'pixi.js';
import Entity from './Entity';
import * as tr from './utils/translator';
import planck from 'planck-js';

class ComplexBody extends Entity {
    matrix = [];
    boxSize = tr.xToWorld(64);
    constructor(world, x, y) {
        super()
        
        this.body = world.createBody();
        for (let i = 0; i < 10; i++) {
            this.matrix.push([]);
            for (let j = 0; j < 10; j++) {
                this.matrix[i][j] = planck.Box(this.boxSize/2,this.boxSize/2);
                this.body.createFixture(this.matrix[i][j], {type: 'static'});
            }
        }

        
        
        this.body.setAngle(0);
    }
    draw = () => {
        const position = tr.toScreen(this.body.getPosition());
        this.g.clear();

        //угол перевернутый, т.к. верх и низ тоже перевернуты
        this.g.setTransform(position.x, position.y, 1, 1, -this.body.getAngle())
        this.g.lineStyle(2, 0xd1d1d1, 1);
        this.g.beginFill(0xf2fbfc);
 
        this.g.drawRect(-this.sWidth/2, -this.sHeight/2, this.sWidth, this.sHeight);
        this.g.endFill();
    }
}