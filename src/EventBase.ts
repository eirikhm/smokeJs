class EventBase
{
    private static eventHook:JQuery;
    private static ensureHook():void
    {
        if (!this.eventHook)
        {
            this.eventHook = $({});
        }
    }

    public static on(event:string,callback:(event:JQueryEventObject, ...args:any[]) => void):EventBase
    {
        this.ensureHook();
        this.eventHook.on.apply(this.eventHook, arguments);
        return this;
    }

    public static off(event:string,callback:(event:JQueryEventObject, ...args:any[]) => void):EventBase
    {
        this.ensureHook();
        this.eventHook.off.apply(this.eventHook, arguments);
        return this;
    }

    /**
     * @param event
     * @param args
     * @returns {JQueryEventObject}
     */
    public static trigger(event:string, args?:any):JQueryEventObject
    {
        this.ensureHook();
        var e = $.Event(event, args);
        this.eventHook.trigger(<any>e, args);
        return e;
    }

    public static clear():void
    {
        this.ensureHook();
        this.eventHook.unbind();
    }
}