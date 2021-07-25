import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Ingrediant } from 'src/app/share/ingrediant.model';
import { Recipes } from '../recipes.model';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
   id : number;      
   editMode = false;
   recipeForm: FormGroup;
   controls: AbstractControl[]
   
  constructor(private route: ActivatedRoute ,private router : Router, private recipeService: RecipesService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params:Params)=>{
          this.id=+params['id'];
          this.editMode = params['id']!=null;
          // console.log(this.editMode);
          this.initForm()
      }
    )
  }
  onSubmit(){
    // const recipe = new Recipes(this.recipeForm.value['name'],
    //       this.recipeForm.value['description'],
    //       this.recipeForm.value['imagePath'],
    //       this.recipeForm.value['ingrediants']
    // );
    if (this.editMode){
      this.recipeService.onUpdate(this.id,this.recipeForm.value);
    }else{
    this.recipeService.onSubmit(this.recipeForm.value);
    }
    this.onCancel();
  }
  onCancel(){
      this.router.navigate(['../'], {relativeTo:this.route});
  }
  onDeleteIngrediant(index : number){
    (<FormArray>this.recipeForm.get('ingrediants')).removeAt(index);
  }
  onAddIngredients(){
    (<FormArray>this.recipeForm.get('ingrediants')).push(
      new FormGroup({
        'name': new FormControl(null,Validators.required),
        'amount': new FormControl(null,[ Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      }
      )
    )
  }
  private initForm(){
    let recipeName = '';
    let RecipeImagePath = '';
    let description = '';
    let recipeIngrediants = new FormArray([]);
    if(this.editMode){ 
        const recipe = this.recipeService.getRecipe(this.id);
        recipeName=recipe.name;
        RecipeImagePath = recipe.imagePath;
        description = recipe.description;
        if ( recipe['ingrediants'] ){
          for (let ingrediant of recipe.ingrediants ){
            recipeIngrediants.push(
              new FormGroup({
                'name':new FormControl(ingrediant.name, Validators.required),
                'amount': new FormControl(ingrediant.amount,[ Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
              })
            );
          }
        }
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName ,Validators.required),
      'imagePath': new FormControl(RecipeImagePath ,Validators.required),
      'description': new FormControl(description ,Validators.required),
      'ingrediants': recipeIngrediants
    });
    // console.log("here",this.recipeForm.get('ingrediants'));
  }
  getControls() {
    return (this.recipeForm.get('ingrediants') as FormArray).controls;
  }
}
