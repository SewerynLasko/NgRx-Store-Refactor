import { ActionReducerMap } from '@ngrx/store'; // type check reducers- describes how the reducers look like and how are composed
import { PizzaState, reducer } from './pizza.reducer';
// this will contain all the reducers for this module

export interface ProductState {
  pizzas: PizzaState;
}

// register reducers
// a slice of state is managed by a reducer function
// a slice of state called 'pizza' is managed by this particular 'reducer' function
export const reducers: ActionReducerMap<ProductState> = {
  pizzas: reducer
};
