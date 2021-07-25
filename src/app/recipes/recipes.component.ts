import { Component,  OnInit } from '@angular/core';
import { Recipes } from './recipes.model';
import { RecipesService } from './recipes.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent implements OnInit {

  SelectedRecipe: Recipes;
  
  constructor(private recipesservice: RecipesService) { 
   
  }
  func(a: Recipes){
    this.SelectedRecipe=a;
    console.log("here"+this.SelectedRecipe);
  }
  ngOnInit(): void {
    this.recipesservice.recipeSelected
      .subscribe(
        (recipe: Recipes)=>{
          this.SelectedRecipe=recipe
        }
      )
  }
  
}
