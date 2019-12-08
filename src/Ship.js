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
        this.addChild(this.g=new PIXI.Graphics());
    }
    radToDeg = 57.2958;
    rotateByTransform = (vec)=>{
        const {body} = this.cabin;
        body.setAngularVelocity(0);
        //box2d использует упоротую систему углов ( все, что слева - от 0 до 180, все что справа от -0 до -180)
        //так что атан используется тоже по упоротому
        const desiredAngle = -Math.atan2(vec.x, vec.y);
        
        //console.log('desired: ', desiredAngle * this.radToDeg);
        let totalRotation = desiredAngle - body.getAngle();
        //console.log('totalRotation: ', totalRotation * this.radToDeg)
        const change = .0174533 * 4;
        //поиск кратчайшего пути поворота к нужному углу (т.к. можно вертеться в другую сторону и это будет дольше)
        //т.е. если мы хотим повернуться больше, чем на 180 мы переносимся в другую половинку и теперь можно вернутся на меньшее значение
        while ( totalRotation < -180 * .0174533 ) totalRotation += 360 * .0174533;
        while ( totalRotation >  180 * .0174533 ) totalRotation -= 360 * .0174533;
        //console.log('afterFix: ', totalRotation * this.radToDeg)

        //если повернулся слишком сильно, то ставлю дискретное значение, чтобы всегда вертеться одинаково
        if(totalRotation > change){
            totalRotation = change;
        }
        if(totalRotation < -change){
            totalRotation = -change;
        }
        const newAngle =  body.getAngle() + totalRotation;
  
        body.setTransform(body.getPosition(), newAngle );
       
    }
    rotateByTorque = (vec)=>{
        const {body} = this.cabin;
        //body.setAngularVelocity(0);
        //box2d использует упоротую систему углов ( все, что слева - от 0 до 180, все что справа от -0 до -180)
        //так что атан используется тоже по упоротому
        const desiredAngle = -Math.atan2(vec.x, vec.y);

        //чтобы нельзя было раскрутить кораблик слишком сильно
        if(body.getAngularVelocity() > 10){
            body.setAngularVelocity(10);
        }
        if(body.getAngularVelocity() < -10){
            body.setAngularVelocity(-10);
        }

        const nextAngle = body.getAngle() + body.getAngularVelocity() / 3.5;
        let totalRotation = desiredAngle - nextAngle;

        //поиск кратчайшего пути поворота к нужному углу (т.к. можно вертеться в другую сторону и это будет дольше)
        //т.е. если мы хотим повернуться больше, чем на 180 мы переносимся в другую половинку и теперь можно вернутся на меньшее значение
        while ( totalRotation < -180 * .0174533 ) totalRotation += 360 * .0174533;
        while ( totalRotation >  180 * .0174533 ) totalRotation -= 360 * .0174533;

        body.applyTorque( totalRotation < 0 ? -15 : 15 );
    }
    rotateByImpulse = (vec)=> {
        const {body} = this.cabin;
        const desiredAngle = -Math.atan2(vec.x, vec.y);

        const nextAngle = body.getAngle() + body.getAngularVelocity() / 60;
        let totalRotation = desiredAngle - nextAngle;
        while ( totalRotation < -180 * .0174533 ) totalRotation += 360 * .0174533;
        while ( totalRotation >  180 * .0174533 ) totalRotation -= 360 * .0174533;
        let desiredAngularVelocity = totalRotation * 60;

        const change = .0174533 * 1;

        if(desiredAngularVelocity > change){
            desiredAngularVelocity = change;
        }
        if(desiredAngularVelocity < -change){
            desiredAngularVelocity = -change;
        }

        const impulse = body.getInertia() * desiredAngularVelocity;
        body.applyAngularImpulse( impulse );
    }
    updateRotation = (vec)=>{
        //this.rotateByTransform(vec);
        this.rotateByTorque(vec);
        //this.rotateByImpulse(vec);
    }

    moveByImulse = (stop)=>{
        const {body} = this.cabin;
        const velocity = body.getLinearVelocity();
        if(stop){
            body.setLinearVelocity(velocity.mul(0.95));  
            return;
        };
        // перевод из упоротого угла в вектор(не упоротый)
        let force = planck.Vec2(-Math.sin(body.getAngle()), Math.cos(body.getAngle()));

        force.mul(7);

        const velChange = force.sub(velocity);
        const impulse = velChange.mul(body.getMass());
        body.applyLinearImpulse(impulse, body.getWorldCenter());
    }
    moveByForce = (stop)=> {
        const {body} = this.cabin;
        if(stop){
            body.setLinearVelocity(body.getLinearVelocity().mul(0.95));  
            return;
        };
        // const maxVelocity = 5;
        // const velocity = body.getLinearVelocity();
        // velocity.x = Math.min(maxVelocity, Math.max(-maxVelocity, velocity.x));
        // velocity.y = Math.min(maxVelocity, Math.max(-maxVelocity, velocity.y));
        // body.setLinearVelocity(velocity);

        // перевод из упоротого угла в вектор(не упоротый)
        let force = planck.Vec2(-Math.sin(body.getAngle()), Math.cos(body.getAngle()));

        force.mul(10);
        
        body.applyForce(force, body.getWorldCenter());

    }
    move = (stop)=>{
        this.moveByImulse(stop)
    }
    stop = ()=>{
        //this.cabin.body.setLinearVelocity(planck.Vec2(0,0));
    }
    draw = ()=>{
        this.g.clear();
        this.cabin.draw();

        this.g.lineStyle(2, 0xFF00FF, 1);
        this.g.beginFill(0x650A5A, 0.25);
        const position = tr.toScreen(this.cabin.body.getWorldPoint(planck.Vec2(0, 1)));
        this.g.drawCircle(position.x, position.y, 3);
        this.g.endFill();

        
        // this.leftTurbin.draw();
        // this.rightTurbin.draw();
        // this.leftStrap.draw();
        // this.rightStrap.draw();
    }
}

