///<reference path="../../definitions/backbone/backbone.d.ts" />

class Keyboard extends EventBase
{
    private static keysDown;

    public static setup():void
    {
        this.keysDown = {};

        $(document).keydown((e:KeyboardEvent) => {
            this.keysDown[e.which] = true;
            this.trigger('keydown',{keys:this.keysDown});
            return false;
        });

        $(document).keyup((e:KeyboardEvent) => {
            delete this.keysDown[e.which];
            return false;
        });
    }

    public static isDown(key):boolean
    {
        return this.keysDown[key];

    }
}