import { Ingrediant } from '../share/ingrediant.model';
export class Recipes{
    public name: string;
    public description: string;
    public imagePath: string;
    public ingrediants : Ingrediant[]

    constructor(name:string, desc:string, imagePath:string ,ingrediants :Ingrediant[]){
        this.name=name;
        this.description=desc;
        this.imagePath=imagePath;
        this.ingrediants=ingrediants
    }
}