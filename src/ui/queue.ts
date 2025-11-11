import { Town } from "../data/map/city";

class SelectTownQueue {
    private queue : Town | void = undefined ;
    /**
     * 
     * @returns [type,queue]
     */
    public getQueue (): [true, Town ]|[false,void]{
        if(typeof this.queue == "undefined"){
            return [false,undefined] ;
        }
        return [true,this.queue] ;
    }
    public setQueue (town:Town): void {
        this.queue = town ;
    }
    constructor(){

    }
}

export const queue = {
    town : new SelectTownQueue() ,
}