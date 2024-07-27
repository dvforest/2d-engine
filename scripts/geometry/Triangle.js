import { Vector2, Edge, Face, Mesh } from "../classes.js";

class Triangle extends Mesh{
    constructor(width, height, topVertexFactor = 0.5){

        super();

        const h = height;
        const w = width;
        const t = topVertexFactor;

        // Create triangle vertices.
        // Variable t determines where top vertex lies on the x axis between -0.5w and 0.5w. 
        this.vertices.push(new Vector2((w * t) - (w / 2), h / -2));
        this.vertices.push(new Vector2(w / 2, h / 2));
        this.vertices.push(new Vector2(w / -2, h / 2));

        //Create edges
        for (let i = 0; i < 3; i++){
            const v1 = this.vertices[i];
            const v2 = this.vertices[(i + 1) % 3];
            this.edges.push(new Edge(v1, v2));
        }

        //Create single face
        this.faces.push(new Face(this.vertices[0], this.vertices[1], this.vertices[2]))

    }
}

export { Triangle };