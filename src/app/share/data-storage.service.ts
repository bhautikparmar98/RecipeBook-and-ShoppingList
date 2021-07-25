import { HttpClient, HttpClientModule, HttpParams} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipes } from "../recipes/recipes.model";
import { RecipesService } from "../recipes/recipes.service";
import {exhaustMap, map, take, tap} from 'rxjs/operators';
import { AuthService } from "../auth/auth.service";
@Injectable({providedIn :'root'})

export class DataStorageService{
     constructor(private http: HttpClient, private recipesService:RecipesService, private authservice:AuthService){ }
     
     storeRecipes(){
        const recipes=this.recipesService.getRecipes();
        this.http.put('https://recipe-book-and-shoplist-default-rtdb.firebaseio.com/recipes.json',recipes)
            .subscribe(response=>{
                console.log(response);
            });
     }
     fetchRecipes(){  
            return this.http.get<Recipes[]>('https://recipe-book-and-shoplist-default-rtdb.firebaseio.com/recipes.json')  
         .pipe( map(recipes=>{
            return recipes.map(recipe=>{
                return {...recipe, ingrediants:recipe.ingrediants ? recipe.ingrediants: [] }
            })
         }),
         tap(recipes=>{
            this.recipesService.setRecipes(recipes);
         }))  
       
     }
} 