import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingrediant } from '../share/ingrediant.model';
export class ShoplistService{

    private ingrediants: Ingrediant[] = [
        new Ingrediant('Apple',5),
        new Ingrediant('Tomatoes',10)
      ];

   ingredientsChanged = new Subject<Ingrediant []>(); /// event to inform the component that new data is available
    StartedEditing = new Subject<number>();
    index: number;
   getIngredients(){
       return this.ingrediants.slice(); /// slice method used for returning the copy of ingredients
   }
   getIngredient(index : number){
      return this.ingrediants[index];
   }

   AddIngredients(ingrediant : Ingrediant){
    this.ingrediants.push(ingrediant);
    this.ingredientsChanged.next(this.ingrediants.slice());
   }

   addIngredients(ingredients : Ingrediant []){
    this.ingrediants.push(...ingredients);
    this.ingredientsChanged.next(this.ingrediants.slice());
   }
   updateIngredient(index: number , newIngrediant: Ingrediant){
        this.ingrediants[index]=newIngrediant;
        this.ingredientsChanged.next(this.ingrediants.slice());
   }
   deleteIngredient(index: number){
        if(index > -1){
        this.ingrediants.splice(index,1);
        this.ingredientsChanged.next(this.ingrediants.slice());
        }
   }
} 