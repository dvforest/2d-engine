import { Matrix3, Mesh, Polygon, Triangle, Runtime, Scene, UI, Vector2, Input } from "./scripts/classes.js";

const canvas = document.getElementById("main");
const ctx = canvas.getContext("2d");

// Scene Graph
const runtime = new Runtime();
const scene = new Scene();
const input = new Input();

const canvasOutline = new UI(canvas.width, canvas.height);
const polygon = new Polygon(20, 100);
polygon.position.set(150, 150);
scene.add(canvasOutline);
scene.add(polygon);
scene.add(input);

// Event Listeners
canvas.addEventListener("mousedown", e => input.onMouseDown(e, canvas));
canvas.addEventListener("mousemove", e => input.onMouseMove(e, canvas));
canvas.addEventListener("mouseup", e => input.onMouseUp(scene));

function loop(time) {

    // Update runtime.
    // Pass time stamp from requestAnimationFrame so delta time can be updated.
    runtime.update(time);

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Render all objects contained in the scene
    scene.render(ctx);

    // Continue loop
    requestAnimationFrame(loop);

}

//Launch loop
requestAnimationFrame(loop);

