class Particle
{
    private particlesCount = 20; // Number of sparks when ball strikes the paddle
    private partX = 100;
    private particles = [];
    private ctx;

    public run()
    {
        for (var k = 0; k < this.particlesCount; k++)
        {
            this.particles.push(this.createParticles(this.partX, 100, 1));
        }

        // Emit particles/sparks
        this.emitParticles();

    }

    private  createParticles(x, y, m)
    {
        return {
            x: x || 0,
            y: y || 0,
            radius: 1.2,
            vx: -1.5 + Math.random() * 3,
            vy: m * Math.random() * 1.5
        };
    }

    public emitParticles()
    {
        for (var j = 0; j < this.particles.length; j++)
        {
            var par = this.particles[j];

            this.ctx.beginPath();
            this.ctx.fillStyle = "red";
            if (par.radius > 0)
            {
                this.ctx.arc(par.x, par.y, par.radius, 0, Math.PI * 2, false);
            }
            this.ctx.fill();

            par.x += par.vx;
            par.y += par.vy;

            // Reduce radius so that the particles die after a few seconds
            par.radius = Math.max(par.radius - 0.05, 0.0);

        }
    }


}