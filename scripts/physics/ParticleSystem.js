import { Vector2, Particle } from "../classes.js";

class ParticleSystem {
	constructor( amount ) {
		this.particles = [];
		this.forces = [];

		this.init = function() {
			for ( let i = 0; i < amount; i++ ) {
				const x = Math.random() * layout.width;
				const y = Math.random() * layout.height;
				const vx = ( Math.random() * 2 ) - 1;
				const vy = ( Math.random() * 2 ) - 1;
				const ax = 0;
				const ay = 0;
				const mass = 1;
				const particle = new Particle( x, y, vx, vy, ax, ay, mass );
				this.particles.push( particle );
			}
		}

		this.init();
	}

	addForce( force ) {
		// Add the force to the particle system's array of forces			
		this.forces.push( force );
	} 

	applyForce( particle ) {
		// Create a new vector to store the accumulated force
		const accumulatedForce = new Vector2( 0, 0 );

		// Accumulate all forces added to the particle system
		for ( let i = 0; i < this.forces.length; i++ ) {
			accumulatedForce.add( this.forces[ i ].generateForce( particle ) )				
		}

		// Apply the accumulated force to the particle
		particle.acceleration = accumulatedForce;
	}		

	update( canvas ) {
		for ( let i = 0; i < this.particles.length; i++) {	
			const particle = this.particles[ i ];

			this.applyForce( particle );
			particle.update();

			// Draw the particle on screen
			const radius = 1;
			canvas.fillEllipse( particle.position.x, particle.position.y, radius, radius, [ 1, 1, 1 ] );	
		}
	}
}

export { ParticleSystem };
