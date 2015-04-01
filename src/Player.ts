class Player extends Entity
{

    public render(ctx):void
    {
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    public update(delta):void
    {
        this.velocityX *= 0.9; // friction
        this.velocityY += 0.2; // gravity

        this.x += this.velocityX;
        this.y += this.velocityY;

        /*
        if (this.y >= 500 - this.height)
        {
            this.y = 500 - this.height;
            this.jumping = false;
        }
        */
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
        if (this.velocityX > -this.speed)
        {
            this.velocityX--;
        }
    }

    public moveRight():void
    {
        if (this.velocityX < this.speed)
        {
            this.velocityX++;
        }
    }
}