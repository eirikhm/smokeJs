///<reference path="../../definitions/backbone/backbone.d.ts" />

class Keyboard extends EventBase
{
    private static keysDown;
    private static mustRelease;

    public static setup():void
    {
        this.keysDown = {};
        this.mustRelease = {};


        $(document).keydown((e:KeyboardEvent) =>
        {
            if (!this.mustRelease[e.which])
            {
                this.keysDown[e.which] = true;
                this.trigger('keydown', {keys: this.keysDown});
            }
            return false;

        });

        $(document).keyup((e:KeyboardEvent) =>
        {
            delete this.mustRelease[e.which];
            delete this.keysDown[e.which];
            return false;
        });
    }

    public static isDown(key):boolean
    {
        return this.keysDown[key];
    }

    public static releaseKey(key):void
    {
        delete this.keysDown[key];
        this.mustRelease[key] = true;
    }
}