import * as PIXI from 'pixi.js';
class Entity extends PIXI.Container {
    body = null;
    sHeight = 0;
    sWidth = 0;
    g = null;
    constructor(){
        super();
        this.g = new PIXI.Graphics();
        this.addChild(this.g);
    }
    draw = ()=>{
    }  
}

export default Entity;