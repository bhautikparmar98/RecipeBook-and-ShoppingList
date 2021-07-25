import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Ingrediant } from '../share/ingrediant.model';
import { ShoplistService } from './shoplist.service';
@Component({
  selector: 'app-shoppinglist',
  templateUrl: './shoppinglist.component.html',
  styleUrls: ['./shoppinglist.component.css'],
})
export class ShoppinglistComponent {
  ingrediants: Observable <{ingrediants : Ingrediant[]}>;
  private subscription : Subscription;
  //  ingrediants: Ingrediant[] = [
  //   new Ingrediant('Apple',5),
  //   new Ingrediant('Tomatoes',10)
  // ];

  constructor(private slService: ShoplistService, 
              private store : Store<{shoppinglist : {ingrediants : Ingrediant[]} }>) { }

    ngOnInit(){
      this.ingrediants=this.store.select('shoppinglist')
      console.log(this.ingrediants);
      // this.store.select('shoppinglist').subscribe(ingrediants=>{
      //   this.ingrediants=ingrediants.ingrediants;
      // }

      
      //this return data as Observable
      
      // this.ingrediants=this.slService.getIngredients();
      // this.subscription=this.slService.ingredientsChanged
      // .subscribe(
      //   (ingredients: Ingrediant [] )=>{
      //     this.ingrediants = ingredients;
      //   })

      
    }
    onEditItem(index: number){
      this.slService.StartedEditing.next(index);
  }
 

  // onIngrediantAdded(ingrediant: Ingrediant){
  //   console.log("here"+ingrediant);
  //   this.ingrediants.push(ingrediant);
  // }
  }
