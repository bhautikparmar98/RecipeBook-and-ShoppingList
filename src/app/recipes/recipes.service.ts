import { findReadVarNames } from '@angular/compiler/src/output/output_ast';
import { EventEmitter, Injectable, Injector, ɵINJECTOR_SCOPE } from '@angular/core';
import { inject } from '@angular/core/testing';
import { Subject } from 'rxjs/internal/Subject';
import { Ingrediant } from '../share/ingrediant.model';
import { ShoplistService } from '../shoppinglist/shoplist.service';
import { Recipes } from './recipes.model';
@Injectable()
export class RecipesService{
    recipeSelected = new EventEmitter<Recipes>();
    RecipeChanged = new Subject<Recipes[]>();
    // private recipes: Recipes[] = [
    //     new Recipes('Burger King - Burger',
    //      'It has Awesome Taste',
    //      'https://vignette.wikia.nocookie.net/secretmenu/images/d/d6/Rodeo_Burger.jpg/revision/latest/scale-to-width-down/340?cb=20141225224630',
    //      [ new Ingrediant('burger',1),
    //        new Ingrediant('french fries' ,20 )
    //     ]),
              
    //      new Recipes('Cheezeee Pizza',
    //      'It kills Hunger',
    //      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwbGI3m0J3dzuFG9TQYBIk7LYP_7eRN6Cvsw&usqp=CAU',
    //      [  new Ingrediant('Pizza Bread',1),
    //         new Ingrediant('Cheeze' ,5 ),
    //         new Ingrediant('veges' ,10 ),
    //      ])
    //   ];
    recipes :Recipes[]=[];
    constructor(private slService : ShoplistService){}
     
    setRecipes(recipes: Recipes[]){
        this.recipes=recipes;
        this.RecipeChanged.next(this.recipes.slice());
    }
    getRecipes(){
       return  this.recipes.slice();           // slice for returning the copy of array object
    }

    addIngredientsToShopinglist(ingredients : Ingrediant[]){
          this.slService.addIngredients(ingredients);    
    }
    getRecipe(index: number){
         return this.recipes[index]
    }
    onSubmit(recipe: Recipes){
      this.recipes.push(recipe);
      this.RecipeChanged.next(this.recipes.slice());
    }
    onUpdate(index: number, recipe: Recipes){
      this.recipes[index]=recipe;
      this.RecipeChanged.next(this.recipes.slice());
    }
    onDelete(index: number){
      this.recipes.splice(index,1);
      this.RecipeChanged.next(this.recipes.slice());
    }
}