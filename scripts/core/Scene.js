import { Object } from "../classes.js";

class Scene extends Object {
	constructor() {
	
		super();
		
		this.type = "Scene";
	}

	render(ctx){
		
		this.updateAllTransforms(this);
		this.drawAllObjects(ctx, this);

	}

	// Helper function. Updates transforms of every object and their children recursively.
	updateAllTransforms(object) {
		
		object.updateTransform();

		
		for (const child of object.children){
			
			this.updateAllTransforms(child);
		}
	}

	// Helper function. Goes through all objects and their children recursively and drawn them on screen.
	drawAllObjects(ctx, object){
		if (object.type !== "Scene"){
			object.draw(ctx)
		}

		for (const child of object.children){
			this.drawAllObjects(ctx, child)
		}
	}
}

export { Scene };