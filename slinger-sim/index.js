const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const width = canvas.width = 320;
const height = canvas.height = 480;
const gravity = 0.4;
const mouse = { x: 0, y: 0 };
const p1 = { x: 0, y: 0 };

let isMouseDown = false;

canvas.style.marginTop = window.innerHeight / 2 - height / 2 + "px";

function drawLine(x1, y1, x2, y2) {
    context.beginPath();
    context.strokeStyle = "magenta";
    context.lineWidth = 3;
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
    context.closePath();
}

function Circle(x, y, r, color) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = color

    this.vel = { x: 0, y: 0 }
}

function update() {
    if (circle.x - circle.r < 0 || circle.x + circle.r > width) {
        circle.vel.x *= -1;
    }
    if (circle.y - circle.r < 0 || circle.y + circle.r > height) {
        circle.vel.y *= -1;
    }
    if (height - circle.y - circle.r * 2 < - circle.r) {
        circle.y = height - circle.r
    }
    if (isMouseDown) {
        const dx = mouse.x - p1.x;
        const dy = mouse.y - p1.y;
        const dir = Math.atan2(dy, dx);
        const d = Math.sqrt(dx * dx + dy * dy);

        circle.vel.x = -Math.cos(dir) * (d * 0.1)
        circle.vel.y = -Math.sin(dir) * (d * 0.1)
    } else {
        circle.vel.x *= 0.99;
        circle.vel.y *= 0.99;
        circle.vel.y += gravity;
        circle.x += circle.vel.x;
        circle.y += circle.vel.y;
    }

}

function render() {
    context.clearRect(0, 0, width, height); //maybe not best prax to clear everytime, but best for simplicity at the moment
    context.beginPath();
    context.lineWidth = 5;
    context.strokeStyle = "blue";
    context.fillStyle = circle.color
    context.arc(circle.x, circle.y, circle.r, 0, Math.PI * 2);
    context.stroke();
    context.fill();
    context.closePath();

    if (isMouseDown) {
        const dir = Math.atan2(p1.y = mouse.y, p1.x - mouse.x);
        const cos = Math.cos(dir);
        const sin = Math.sin(dir);

        drawLine(p1.x, p1.y, mouse.x, mouse.y)
    }
}

function frame() {
    update();
    render();
    requestAnimationFrame(frame);
}

canvas.onmousedown = function ({ offsetX, offsetY }) {
    isMouseDown = true;
    p1.x = offsetX;
    p1.y = offsetY;
    circle.x = offsetX
    circle.y = offsetY
}

document.onmouseup = function ({ offsetX, offsetY }) {
    isMouseDown = false;
    mouse.x = offsetX;
    mouse.y = offsetY;
}

canvas.onmousemove = function ({ offsetX, offsetY }) {
    mouse.x = offsetX;
    mouse.y = offsetY;
    if (isMouseDown) {
        circle.x = offsetX;
        circle.y = offsetY;
    }
}

const circle = new Circle(width / 2, height / 2, 15, "orange")

frame();