import { Component, EventEmitter, Input, OnInit,Output } from '@angular/core';
import {Recipes} from '../../recipes.model';
import { RecipesService } from '../../recipes.service';
@Component({
  selector: 'app-recipes-item',
  templateUrl: './recipes-item.component.html',
  styleUrls: ['./recipes-item.component.css']
})
export class RecipesItemComponent implements OnInit {

  @Input() recipe: Recipes
  @Input() index: number
  //@Output() recipeSelected= new EventEmitter<void>();
  // onSelected(){
  //   // this.recipeSelected.emit();
  //   this.recipesservice.recipeSelected.emit(this.recipe);

  // }
  constructor(private recipesservice: RecipesService) { }

  ngOnInit(): void {

  }

}
