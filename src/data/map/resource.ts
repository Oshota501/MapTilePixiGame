export type resource_data = {
    name : string ;
    in : number ;
    out : number ;
    cost : number ;
    stock : number ;
}
export class MaterialResource {
    public foods : resource_data[] = [
        {
            name:"rice",
            in:10,
            out:10,
            cost:1,
            stock:30,
        }
    ] ;
    public material : resource_data[] = [
        {
            name:"wood",
            in:10,
            out:10,
            cost:1,
            stock:30,
        },
    ] ;
    constructor(){
        
    }
}