///<reference path="../definitions/backbone/backbone.d.ts" />
///<reference path="../definitions/fpsmeter/fpsmeter.d.ts" />
///<reference path="./world/Level.ts" />
///<reference path="./entities/Player.ts" />
///<reference path="./math/Vector2D.ts" />
///<reference path="./ParticleEmitter.ts" />

class Game
{
    private canvas:HTMLCanvasElement;
    private ctx:CanvasRenderingContext2D;
    private then:any;
    private entities:Entity[] = [];
    private player:Player;
    private level:Level;
    private width:number;
    private height:number;
    private meter:FPSMeter;

    public run():void
    {
        this.meter = new FPSMeter();


        this.canvas = <HTMLCanvasElement>document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        if (!this.ctx)
        {
            // TODO: Show error
            return;
        }


        $.getJSON("resources/level.json", (req) =>
        {
            this.level = new Level();
            this.level.setup(req);
            this.width = this.canvas.width = this.level.map.width * Level.TILE_PIXEL_SIZE;
            this.height = this.canvas.height = this.level.map.height * Level.TILE_PIXEL_SIZE;
            this.player = this.level.player;
            this.entities.push(this.level);
            this.onReady();
        });

    }


    private onReady():void
    {
        // TODO: do not use singleton for this.
        Keyboard.setup();
        Keyboard.on('keydown', (e) =>
        {
            this.onKeyboard(e);
        });

        this.then = Date.now();
        this.loop();
    }

    private onKeyboard(e)
    {
        if (e.keys[38] || e.keys[32])
        {
            this.player.jump();
        }

        if (e.keys[39])
        {
            this.player.moveRight();
        }

        if (e.keys[37])
        {
            this.player.moveLeft();
        }
    }

    public loop():void
    {
        var now = Date.now();
        var delta = now - this.then;

        this.update(delta / 1000);
        this.render();

        this.then = now;
        requestAnimationFrame(() =>
        {
            this.loop();
        });
    }

    private update(delta):void
    {
        for (var i = 0; i < this.entities.length; i++)
        {
            this.entities[i].update(delta);
        }
    }

    private render()
    {
        this.meter.tickStart();
        this.ctx.clearRect(0, 0, this.width, this.height);
        for (var i = 0; i < this.entities.length; i++)
        {
            this.entities[i].render(this.ctx);
        }
        this.meter.tick();
    }
}
