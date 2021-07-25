import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingrediant } from 'src/app/share/ingrediant.model';
import { ShoplistService } from '../../shoplist.service';
import * as ShoplistActions from '../store/shoplist.action';
@Component({
  selector: 'app-shoplistedit',
  templateUrl: './shoplistedit.component.html',
  styleUrls: ['./shoplistedit.component.css']
})
export class ShoplisteditComponent{
  //@Output() IngrediantAdded = new EventEmitter<Ingrediant>();
  

  constructor( private slService : ShoplistService,private store: Store<{shoppinglist : {ingrediants : Ingrediant[] }}>) { }
  EditMode= false; 
  editItemIndex: number;
  editItem: Ingrediant;
  subscription: Subscription;
  @ViewChild('f') slForm : NgForm;

  ngOnInit(): void {
    this.subscription=this.slService.StartedEditing
      .subscribe( (index:number) =>{
          this.EditMode= true;
          this.editItemIndex=index;
          this.editItem= this.slService.getIngredient(index);
          this.slForm.setValue({
            name: this.editItem.name,
            amount:this.editItem.amount
          });
  })
//console.log(this.editItem)
};
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
  onSubmit(form: NgForm){
    const value= form.value;
    const newIngrediant = new Ingrediant(value.name,value.amount);
    //this.IngrediantAdded.emit(newIngrediant);
    //console.log(newIngrediant);
    if(this.EditMode){
      this.slService.updateIngredient(this.editItemIndex,newIngrediant);
        }else{
      //this.slService.AddIngredients(newIngrediant);
      this.store.dispatch(new ShoplistActions.AddIngrediant(newIngrediant));
    }  
    form.reset();
    this.EditMode=false;
  } 
  onClear(){
    this.slForm.reset();
    this.EditMode = false;
  }
  onDelete(){
    this.slService.deleteIngredient(this.editItemIndex);
    this.onClear();
  }
}
