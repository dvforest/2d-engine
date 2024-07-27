import { Vector2 } from "../classes.js";

class GravityForce {
	constructor( constant, mass, x, y ) {
		this.constant = constant;
		this.mass = mass
		this.position = new Vector2( x, y );
	}

	generateForce( particle ) {
		// Find the distance between the particle and the center of gravity
		const vector = new Vector2( this.position.x - particle.position.x, this.position.y - particle.position.y );
		const distance = vector.magnitude();

		// Apply Newton's law of universal gravitation and return the force vector
		const forceMagnitude  = ( this.constant * this.mass * particle.mass ) / ( distance ** 2 );
		vector.normalize();
		vector.scale( forceMagnitude );
		return vector;
	}
}

export { GravityForce };