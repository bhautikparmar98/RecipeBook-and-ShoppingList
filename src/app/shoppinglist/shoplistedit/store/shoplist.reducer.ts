import { Ingrediant } from "src/app/share/ingrediant.model";
import * as ShoplistAction from "./shoplist.action"
const initialState = {
    ingrediants : [
                new Ingrediant('Apple',5),
                new Ingrediant('Tomatoes',10)]
}
export function shoplistReducer(state= initialState, action:ShoplistAction.AddIngrediant){
            // this arguments to the shoplistReducer Function provided by ngRx
    switch(action.type) {
        case ShoplistAction.ADD_INGREDIANTS:
            return {
                ...state,
                ingrediants : [...initialState.ingrediants, action.payload]
            }
        default :
            return state
    }
}