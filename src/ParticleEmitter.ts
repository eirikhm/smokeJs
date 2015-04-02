class ParticleEmitter
{
    private particles:Particle[] = [];
    private position:Vector2D;
    private velocity:Vector2D;
    private spread:number;
    private drawColor:string;
    private width:number;
    private height:number;

    private maxParticles = 200; // experiment! 20,000 provides a nice galaxy
    private emissionRate = 4; // how many particles are emitted each frame
    private particleSize = 1;

    constructor(position:Vector2D, velocity:Vector2D, options?:any)
    {
        console.log('created with position',position);
        this.position = position;
        this.velocity = velocity;

        this.width = options.width || 0;
        this.height = options.height || 0;
        this.spread = options.spread || Math.PI / 32;
        this.drawColor = options.drawColor || "#999";
        this.maxParticles = options.maxParticles || 200;
        this.emissionRate = options.emissionRate || 4;
        this.particleSize = options.particleSize || 1;
    }

    public render(ctx):void
    {


        for (var i = 0; i < this.particles.length; i++)
        {
            var particle = <Particle>this.particles[i];
            particle.render(ctx);
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
                console.log('out of bounds');
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
    
    private createParticle():Particle
    {
        var angle:number = this.velocity.angle + this.spread + (Math.random() * this.spread * 2);
        var magnitude:number = this.velocity.magnitude;
        var position = new Vector2D(this.position.x, this.position.y);
        var velocity = Vector2D.fromAngle(angle, magnitude);
        /*
        var r =Math.round(Math.random() * 1*255);
        var g =Math.round(Math.random() * 1*255);
        var b =Math.round(Math.random() * 1*255);
        var color = 'rgb(' + r + ',' + g + ',' + b +')';
*/
        return new Particle(position, velocity,new Vector2D(),this.particleSize,this.drawColor);
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
            this.particles.push(this.createParticle());
        }
    }
}