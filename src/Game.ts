///<reference path="../definitions/backbone/backbone.d.ts" />
class Game
{
    private global_width = window.innerWidth;
    private global_height = window.innerHeight;
    private ratio = 1;
    private canvas;
    private ctx;
    private then:any;
    private entities = [];
    private player;
    private map;

    public run():void
    {
        $.getJSON("resources/level.json", (req) =>
        {
            this.map = new Level();
            this.map.setup(req);
            this.entities.push(this.map);
            this.foo();
        });

    }

    private foo():void
    {
        this.player = new Player();


        this.entities.push(this.player);

        // TODO: do not use singleton for this.
        Keyboard.setup();
        Keyboard.on('keydown', (e) =>
        {
            console.log('keydown',e);
            this.onKeyboard(e);
        });

        this.then = Date.now();
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        if (!this.ctx)
        {
            // TODO: Show error
            return;
        }
        window.addEventListener('resize', this.rescale);
        this.rescale();
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
            this.map.collideEntity(this.entities[i]);
        }
    }

    private rescale()
    {
        this.global_width = window.innerWidth;
        this.global_height = window.innerHeight;
        if (this.ctx.webkitBackingStorePixelRatio < 2)
        {
            this.ratio = window.devicePixelRatio || 1;
        }
        this.canvas.setAttribute('width', this.global_width * this.ratio);
        this.canvas.setAttribute('height', this.global_height * this.ratio);
    }

    private render()
    {
        this.ctx.clearRect(0, 0, this.global_width * this.ratio, this.global_height * this.ratio);
        for (var i = 0; i < this.entities.length; i++)
        {
            this.entities[i].render(this.ctx);
        }

    }

    private updateEntity(entity):void
    {

    }
}
