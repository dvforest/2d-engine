import { Object, Vector2 } from "../classes.js";

class UI extends Object{
    constructor(width, height){

        super();

        this.type = "UI";
        this.width = width;
        this.height = height;
        this.lineWidth = 0.5;
        this.color = "white";

    }

    draw(ctx){
        const t = new Vector2().applyMatrix3(this.worldTransform);
        const w = this.lineWidth;  
        ctx.strokeStyle = this.color;
        ctx.lineWidth = w;
        // Adjust stroke so that it lies inside the shape, not centered.
        ctx.strokeRect(t.x + w / 2, t.y + w /2, this.width - w, this.height - w);
    }
}

export { UI };