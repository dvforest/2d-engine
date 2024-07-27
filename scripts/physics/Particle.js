import { Vector2 } from "../classes.js";

class Particle {
	constructor(x, y, vx, vy, ax, ay, mass) {
		this.position = new Vector2(x, y);
		this.velocity = new Vector2(vx, vy);
		this.acceleration = new Vector2(ax, ay);
		this.mass = mass;
	}

	update() {

		// Update velocity based on acceleration
		this.velocity.add(this.acceleration);

		// Update position based on velocity
		this.position.add(this.velocity);

	}
}

export {Particle};