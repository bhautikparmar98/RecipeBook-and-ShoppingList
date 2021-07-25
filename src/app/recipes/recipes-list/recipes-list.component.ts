import { Component, EventEmitter, OnDestroy, OnInit ,Output} from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, provideRoutes, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipes } from '../recipes.model';
import { RecipesService } from '../recipes.service';
@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
  
export class RecipesListComponent implements OnInit, OnDestroy {
 // @Output() recipeWasSelected = new EventEmitter<Recipes>();
 
  // recipes: Recipes[] = [
  //   new Recipes('A test Recipe', 'This is simple test','https://www.forksoverknives.com/wp-content/uploads/vegan-quesadilla-recipe-quick-easy-plant-based-recipes.jpg'),
  //   new Recipes('A test2 Recipe', 'This is simple test','https://www.forksoverknives.com/wp-content/uploads/vegan-quesadilla-recipe-quick-easy-plant-based-recipes.jpg')
  // ];
  recipes :Recipes[]
  subscription: Subscription;
  constructor(private recipesservice: RecipesService, private router: Router, private route : ActivatedRoute) {
   }
  ngOnInit(){
    this.subscription = this.recipesservice.RecipeChanged
              .subscribe(
                (recipes: Recipes[])=>{
                  this.recipes=recipes;
                }
              )
    this.recipes=this.recipesservice.getRecipes(); 
  }
  //  onRecipeSelected(recipe: Recipes){
  //   this.recipeWasSelected.emit(recipe);
  //   console.log(recipe);
  // }
  onNewRecipe(){
    this.router.navigate(['new'],{relativeTo:this.route})
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
