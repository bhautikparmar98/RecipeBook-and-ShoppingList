import {Action} from "@ngrx/store";
import { Ingrediant } from "src/app/share/ingrediant.model";

export const ADD_INGREDIANTS = " ADD_INGREDIANTS";

export class AddIngrediant implements Action{
    readonly type = ADD_INGREDIANTS;
    constructor(public payload: Ingrediant){}
}