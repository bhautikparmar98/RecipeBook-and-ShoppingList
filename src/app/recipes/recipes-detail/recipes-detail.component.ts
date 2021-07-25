import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params,Router } from '@angular/router';
//import { relative } from 'path';
//import { timeStamp } from 'console';
import {Recipes} from '../recipes.model';
import { RecipesService } from '../recipes.service';
@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css']
})
export class RecipesDetailComponent implements OnInit {
  //@Input() recipe:Recipes
  recipe:Recipes
  Id: number;
  constructor(private recipesservice: RecipesService, private route:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params:Params)=>{
        this.Id=+params['id'];
        this.recipe=this.recipesservice.getRecipe(this.Id);
      }
    )
  }
  onAddtoShoppinglist(){
    this.recipesservice.addIngredientsToShopinglist(this.recipe.ingrediants);
  }
  onEditRecipe(){
      this.router.navigate(['edit'], {relativeTo: this.route});
  }
  onDelete(){
    this.recipesservice.onDelete(this.Id);
    this.router.navigate(['/recipes']);
  }
}
