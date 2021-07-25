import { Inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { DataStorageService } from "../share/data-storage.service";
import { Recipes } from './recipes.model'
import { RecipesService } from "./recipes.service";
@Injectable({providedIn:'root'})
export class RecipeResolverService implements Resolve<Recipes []>{
    constructor(private dataStorageService: DataStorageService, private recipesservice:RecipesService){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipes[] | Observable<Recipes[]> | Promise<Recipes[]> {
        const recipes = this.recipesservice.getRecipes();
        if(recipes.length===0){
            return this.dataStorageService.fetchRecipes();
        }else{
            return recipes;
        }
        
    }
}