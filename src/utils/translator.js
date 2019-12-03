import { Vec2 } from 'planck-js';

let scalar = 0.02;
let sHeight = 920;

export const setScreenHeight = (height)=>{
    sHeight = height;
}

export const xToWorld = (x)=>{
    return x * scalar;
}
export const xToScreen = (x)=>{
    return x / 0.02;
}

export const yToWorld = (y)=>{
    return (sHeight- y) * scalar;
}
export const yToScreen = (y)=>{
    return sHeight - y / 0.02;
}

export const toWorld = (x, y) => {
    return Vec2(xToWorld(x), yToWorld(y))
}

export const toScreen = (vec2) => {
    return {x: xToScreen(vec2.x), y: yToScreen(vec2.y)}
}