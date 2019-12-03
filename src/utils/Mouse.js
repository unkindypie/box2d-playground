import app from '../pixi/pixiapp';

const mouse = {
    position: {x:0, y:0},
    isPressed: false
};
app.view.onmousedown = (e) => { 
    mouse.isPressed = true;
    mouse.position.x = e.clientX;
    mouse.position.y = e.clientY;
}
app.view.onmousemove = (e)=>{
    mouse.position.x = e.clientX;
    mouse.position.y = e.clientY;
}
app.view.onmouseup = (e)=> {
    mouse.isPressed = false;
}

export default mouse;