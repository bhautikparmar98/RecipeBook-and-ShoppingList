import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecipesComponent} from './recipes/recipes.component';
import { RecipesListComponent } from './recipes/recipes-list/recipes-list.component';
import { RecipesDetailComponent } from './recipes/recipes-detail/recipes-detail.component';
import { RecipesItemComponent } from './recipes/recipes-list/recipes-item/recipes-item.component';
import { ShoppinglistComponent } from './shoppinglist/shoppinglist.component';
import { ShoplisteditComponent } from './shoppinglist/shoplistedit/shoplistedit/shoplistedit.component'; 
import { DropdownDirective } from './share/dropdown.directive';
import { ShoplistService } from './shoppinglist/shoplist.service';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecipesService } from './recipes/recipes.service';
import { AuthComponent } from './auth/auth.component';
import { LoadingSpinnerComponent } from './share/loading.spinner/loading.spinner.component';
import { AuthInterceptorService } from './auth/auth.interceptor.service';
import { StoreModule } from '@ngrx/store';
import { shoplistReducer } from './shoppinglist/shoplistedit/store/shoplist.reducer';
import { AlertComponent } from './share/alert/alert.component';


@NgModule({
  declarations: [
    AppComponent, 
    HeaderComponent,
    RecipesComponent,
    RecipesListComponent,
    RecipesDetailComponent,
    RecipesItemComponent,
    ShoppinglistComponent,
    ShoplisteditComponent ,
    DropdownDirective,
    RecipeStartComponent,
    RecipeEditComponent,
    AuthComponent,
    LoadingSpinnerComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot({shoppinglist : shoplistReducer})
  ],
  providers: [ShoplistService,RecipesService,{provide:HTTP_INTERCEPTORS,useClass:AuthInterceptorService,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule {
    
}


