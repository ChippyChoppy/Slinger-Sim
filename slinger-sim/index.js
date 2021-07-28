const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const width = canvas.width = 320;
const height = canvas.height = 480;
const gravity = 0.4;
const mouse = { x: 0, y: 0 };
const p1 = { x: 0, y: 0 };

let isMouseDown = false;

canvas.style.marginTop = window.innerHeight / 2 - height / 2 + "px";

function Circle(x,y,r, color) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = color

    this.vel= { x: 0, y: 0 }
}

function update() {

}

function render() {
    context.beginPath();
    context.lineWidth = 5;
    context.strokeStyle = "blue";
    context.fillStyle = circle.color
    context.arc(circle.x, circle.y, circle.r, 0, Math.PI * 2);
    context.stroke();
    context.fill();
    context.closePath();
}

function frame() {
    update();
    render();
    requestAnimationFrame(frame);
}

canvas.onmousedown = function( { offsetX, offsetY }) {
    isMouseDown = true;
    p1.x = offsetX;
    p1.y = offsetY;
    circle.x = offsetX
    circle.y = offsetY
}

document.onmouseup = function( { offsetX, offsetY }) {
    isMouseDown = false;
    mouse.x = offsetX;
    mouse.y = offsetY;
}

canvas.onmousemove = function( { offsetX, offsetY }) {
    mouse.x = offsetX;
    mouse.y = offsetY;
    if (isMouseDown) {
        circle.x = offsetX;
        circle.y = offsetY;
    }
}

const circle = new Circle(width / 2, height / 2, 15, "orange")

frame();