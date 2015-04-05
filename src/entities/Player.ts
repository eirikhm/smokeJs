///<reference path="../entities/PhysicsEntity.ts" />

class Player extends PhysicsEntity
{
    public static EVENT_PLAYER_KILLED:string = 'EVENT_PLAYER_KILLED';
    public static EVENT_PLAYER_HURT:string = 'EVENT_PLAYER_HURT';
    public static EVENT_PLAYER_ITEM_PICKUP:string = 'EVENT_PLAYER_ITEM_PICKUP';

    public color = "blue";

    constructor(obj)
    {
        super(obj);
        this.type = Entity.EntityTypes.PLAYER;
        this.velocityX = this.velocityY  = 0;
    }

    public render(ctx):void
    {
        super.render(ctx);
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = 'red';

        if (this.facingLeft)
        {
            ctx.fillRect(this.x, this.y, 10, 15);
        }
        else
        {
            ctx.fillRect(this.x + this.width-10, this.y, 10, 15);
        }
    }

    public jump():void
    {
        if (!this.jumping)
        {
            this.jumping = true;
            this.velocityY = -this.speed * 2;
        }
    }

    public moveLeft():void
    {
        this.facingLeft = true;
        if (this.velocityX > -this.speed)
        {
            this.velocityX--;
        }
    }

    public moveRight():void
    {
        this.facingRight = true;
        if (this.velocityX < this.speed)
        {
            this.velocityX++;
        }
    }

    public canShoot():boolean
    {
        var now = Date.now();
        var delta = now - this.lastShot;
        if (delta < 200)
        {
            return false;
        }
        return true;
    }

    private lastShot:number = null;

    public currentWeapon:string = 'normal';
    public shoot():Projectile
    {
        if (!this.canShoot())
        {
            return;
        }

        this.lastShot = Date.now();

        return this.createBullet(this.currentWeapon);
    }

    public collectItem(item:Entity):void
    {
        this.color = 'purple';
        this.health += 20; // todo: fetch from item specs
        this.trigger(Player.EVENT_PLAYER_ITEM_PICKUP);
    }

    protected onKilled():void
    {
        super.onKilled();
        this.trigger(Player.EVENT_PLAYER_KILLED);
    }

    protected onHurt():void
    {
        super.onHurt();
        this.trigger(Player.EVENT_PLAYER_HURT);
    }

    private createBullet(type:string):Projectile
    {
        var options = {
            velocityX: 2,
            velocityY: 0,
            width: 32,
            height: 32,
            color: 'blue',
            damage: 10
        };

        if (type == 'normal')
        {
            options.color = 'orange';
            options.damage = 10;
            options.velocityX = 75;
        }

        if (type == 'other')
        {
            options.color = 'pink';
            options.velocityX = 100;
            options.damage = 25;
        }

        var b = new Projectile(options);
        b.x = this.x;
        b.y = this.y;

        if (this.facingLeft)
        {
            b.velocityX = -b.velocityX;
        }

        return b;
    }
}