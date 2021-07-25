import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeResolverService } from './recipes/recipe-resolver.service';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipesDetailComponent } from './recipes/recipes-detail/recipes-detail.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppinglistComponent } from './shoppinglist/shoppinglist.component';

const appRoutes: Routes =[
  {path :'', redirectTo:'/recipes',pathMatch:'full'}, // Only redirect if full path is empty
  {path :'recipes', component: RecipesComponent, canActivate:[AuthGuard],
   children:[
    {path:'', component:RecipeStartComponent},
    {path:'new', component: RecipeEditComponent},
    {path:':id', component:RecipesDetailComponent, resolve:[RecipeResolverService]},
    {path:':id/edit', component:RecipeEditComponent, resolve:[RecipeResolverService]},
  ]},
  {path:'shoppinglist', component:ShoppinglistComponent},
  {path:'auth', component:AuthComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule { 

}
