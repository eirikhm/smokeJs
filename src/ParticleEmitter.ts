class ParticleEmitter
{
    private particles:Particle[] = [];
    private position:Vector2D;
    private velocity:Vector2D;
    private spread:number;
    private drawColor:string;
    private width:number;
    private height:number;

    private  maxParticles = 200; // experiment! 20,000 provides a nice galaxy
    private  emissionRate = 4; // how many particles are emitted each frame

    constructor(position:Vector2D, velocity:Vector2D, width:number, height:number, spread?:number)
    {
        this.position = position;
        this.velocity = velocity;
        this.spread = spread || Math.PI / 32;
        this.drawColor = "#999"; // So we can tell them apart from Fields later
        this.width = width;
        this.height = height;
    }

    public emitParticle():Particle
    {
        var angle:number = this.velocity.angle + this.spread + (Math.random() * this.spread * 2);
        var magnitude:number = this.velocity.magnitude;
        var position = new Vector2D(this.position.x, this.position.y);
        var velocity = Vector2D.fromAngle(angle, magnitude);
        return new Particle(position, velocity);
    }

    public render(ctx):void
    {

        // Set the color of our particles
        ctx.fillStyle = 'rgb(0,0,255)';

        // For each particle
        for (var i = 0; i < this.particles.length; i++)
        {
            var particle = <Particle>this.particles[i];
            particle.render(ctx);
        }
    }

    private emit()
    {
        // if we're at our max, stop emitting.
        if (this.particles.length > this.maxParticles)
        {
            return;
        }

        // for [emissionRate], emit a particle
        for (var j = 0; j < this.emissionRate; j++)
        {
            this.particles.push(this.emitParticle());
        }
    }

    public update(delta):void
    {
        this.emit();
        // a new array to hold particles within our bounds
        var currentParticles = [];

        for (var i = 0; i < this.particles.length; i++)
        {
            var particle = <Particle>this.particles[i];
            var pos = particle.position;

            // If we're out of bounds, drop this particle and move on to the next
            if (pos.x < 0 || pos.x > this.width || pos.y < 0 || pos.y > this.height)
            {
                continue;
            }

            // Move our particles
            particle.move();

            // Add this particle to the list of current particles
            currentParticles.push(particle);
        }

        // Update our global particles, clearing room for old particles to be collected
        this.particles = currentParticles;
    }
}