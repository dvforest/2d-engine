import { Vector2, Object } from "../classes.js";

class Input extends Object {
	constructor() {

		super();

		this.mousePosition = new Vector2();
		this.mouseStart = new Vector2();
		this.isMouseDown = false;
		this.selectBoxWidth = 0.5;
		this.selectBoxColor = "white";
  }
  
 	onMouseDown(e, canvas) {
		// Record the starting position of the mouse
		this.mouseStart.set(e.clientX, e.clientY);
		this.clientToCanvas(this.mouseStart, canvas);

		// Assign current position to be the same as start position
		this.mousePosition.set(this.mouseStart.x, this.mouseStart.y);

		this.isMouseDown = true;

	}
	
	onMouseMove(e, canvas) {
		// Update the current mouse position.
		this.mousePosition.set(e.clientX, e.clientY);
		this.clientToCanvas(this.mousePosition, canvas);
	
	}
	
	onMouseUp(scene) {

		const s = this.mouseStart;
		const p = this.mousePosition;

		// If the selection is inside a mesh, make it active
			for (const object of scene.children){
								
				// Reset the object to inactive
				object.isActive = false;
				
				if (object.type == "Mesh"){
					
					// If mesh, start by checking the current mouse position.
					// If the point is inside the mesh, make it active and continue with the next one.
					if (object.isPointInside(p)){
						object.isActive = true;
						continue;
					}

					// If the first point didn't select anything, check if a select box is being drawn
					// To do so, compare start and current mouse x and y positions.
					else if (s.x !== p.x && s.y !== p.y){
						
						// Check mouse start position
						if (object.isPointInside(s)){
							object.isActive = true;
							continue;
						} 

						// Check select box corner 1
						const c1 = new Vector2(s.x, p.y);
						if (object.isPointInside(c1)){
							object.isActive = true;
							continue;
						}
						
						// Check select box corner 2
						const c2 = new Vector2(p.x, s.y);
						if (object.isPointInside(c2)){
							object.isActive = true;
							continue;
						}
						
						// Finally, check if any of the mesh vertices is within the select box.
						for (const v of object.vertices){
							
							// Add transforms to vertex
							const vt = v.copy().applyMatrix3(object.worldTransform);
							
							// To check if a point (vt) is inside a bounding box:
							// Compare the point's x value with the x value of the two corners of the box (p and s)
							// If both are larger, or both are smaller, then the point is outside
							// Do the same with the y value. If both comparisons are uneven, then the point is inside.
							if ( (vt.x < s.x !== vt.x < p.x) && (vt.y < s.y !== vt.y < p.y)){
								object.isActive = true;
								break;
							}
						}
					}
				}
			}

		// Stop mouse selection
		this.isMouseDown = false;
	}
	
	draw(ctx) {
		// If mouse is selecting and select box area isn't null, draw.
		if (this.isMouseDown && this.mouseStart !== this.mousePosition) {	
			const s = this.mouseStart;
			const p = this.mousePosition;
			const width = p.x - s.x;
			const height = p.y - s.y
			ctx.lineWidth = this.selectBoxWidth;
			ctx.strokeStyle = this.selectBoxColor;
			ctx.strokeRect(s.x, s.y, width, height);
		}
	}

	// Converts client coordinates (viewport) to canvas coordinates by substracting top and left canvas offset
	clientToCanvas(v, canvas) {
		const rect = canvas.getBoundingClientRect();
		v.x -= rect.left;
		v.y -= rect.top;
	}

}

export { Input };