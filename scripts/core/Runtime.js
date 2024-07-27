class Runtime{
    constructor(){
        this.time = 0;
        this.previousTime = 0;
        this.dt = 0;
        this.fps = 0;
    }

    update(time){
        // Update delta time
        this.time = time;
        this.dt = (this.time - this.previousTime) / 1000;
        this.previousTime = this.time;

        // Update fps
        this.fps = Math.round(1 / this.dt);
    }

}

export { Runtime };