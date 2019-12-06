import * as PIXI from 'pixi.js';
import Entity from './Entity';
import * as tr from './utils/translator';
import planck from 'planck-js';
import Box from './Box';

export default class Ship extends Entity {
    constructor(world, x, y){
        super();
        this.turbinWidth = 50;
        this.strapWidth = this.turbinWidth/2;
        this.strapHeight = 10;
        this.cabinWidth = 70;
        this.cabin = new Box(world, x, y, this.cabinWidth, 120);
        // this.leftTurbin = new Box(world, x - this.turbinWidth/2 - this.strapWidth - this.cabinWidth/2, y + 20, this.turbinWidth, 80);
        // this.rightTurbin = new Box(world, x + this.turbinWidth/2 + this.strapWidth + this.cabinWidth/2, y + 20, this.turbinWidth, 80);

        // const yStrapOffset = 90;
        // this.leftStrap = new Box(world, x - this.strapWidth - this.turbinWidth, y + yStrapOffset, this.strapWidth + this.turbinWidth, this.strapHeight);
        // this.rightStrap = new Box(world, x + this.strapWidth  + this.turbinWidth, y + yStrapOffset, this.strapWidth + this.turbinWidth, this.strapHeight);

      
        // this.addChild(this.leftTurbin);
        // this.addChild(this.rightTurbin);
        // this.addChild(this.leftStrap);
        // this.addChild(this.rightStrap);

        this.addChild(this.cabin);
    }
    rotateByTransform = (vec)=>{
        const {body} = this.cabin;
        body.setAngularVelocity(0);
        const desiredAngle = -Math.atan2(vec.x, vec.y);
        const totalRotation = desiredAngle - body.getAngle();
        const change = .0174533;
        const newAngle =  body.getAngle() + Math.min( change, Math.max(-change, totalRotation));
        body.setTransform(body.getPosition(), newAngle );
    

    }
    move = (vec)=>{
        const {body} = this.cabin;
        const forceTarget = this.cabin.body.getWorldPoint(planck.Vec2(0, tr.yToWorld(60)));
        const force = planck.Vec2(Math.cos(body.getAngle()), Math.sin(body.getAngle()));

        this.rotateByTransform(vec);

        this.cabin.body.setLinearVelocity(force);
        //this.cabin.body.applyLinearImpulse(force);
        //this.cabin.body.applyForce(force, forceTarget);
       
      
    }
    draw = ()=>{
        this.g.clear();
        this.cabin.draw();
        
        // this.leftTurbin.draw();
        // this.rightTurbin.draw();
        // this.leftStrap.draw();
        // this.rightStrap.draw();
    }
}

