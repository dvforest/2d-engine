import { Vector2, Edge, Face, Mesh } from "../classes.js";

class Rectangle extends Mesh {
	constructor(position, width, height){
	
		super(position);
				
		// Create 4 vertices
		this.vertices.push( new Vector2(-width / 2, -height / 2), // Top left
							new Vector2( width / 2, -height / 2), // Top right
							new Vector2(width / 2, height / 2), // Bottom right
							new Vector2(-width / 2, height / 2)); // Bottom left
		
		// Create 4 outer edges
		for (let i = 0; i < 4; i++){
			const vertex1 = this.vertices[i]; // Outer vertex
			const vertex2 = this.vertices[(i + 1) % 4]; // Next outer vertex. Loop with modulo.

			// Add edge to the array
			this.edges.push(new Edge(vertex1, vertex2));
		}
		
		// Create one diagonal edge
		this.edges.push(new Edge(this.vertices[0], this.vertices[2]));

		// Create two faces
		this.faces.push(new Face(this.vertices[0], this.vertices[1], this.vertices[2]),
						new Face(this.vertices[2], this.vertices[3], this.vertices[0]));
	}
}

export { Rectangle };