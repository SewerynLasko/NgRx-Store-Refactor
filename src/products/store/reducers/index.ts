import { ActionReducerMap, createFeatureSelector } from '@ngrx/store'; // type check reducers- describes how the reducers look like and how are composed
import { ProductState } from './index';
import { PizzaState, reducer } from './pizza.reducer'; // this will contain all the reducers for this module

export interface ProductState {
  pizzas: PizzaState;
}

// register reducers
// a slice of state is managed by a reducer function
// a slice of state called 'pizza' is managed by this particular 'reducer' function
export const reducers: ActionReducerMap<ProductState> = {
  pizzas: reducer
};

// Create a base level of our state object- reference to the 'products' state
// selector for entire lazy loaded module. Input 'products' comes from StoreModule.forFeature('products', reducers) module init
export const getProductState = createFeatureSelector<ProductState>('products');
// This will return products.pizza
// That's how we compose application state. This will create a selector starting from the products
// Second argument can be another selector or function (like in this case)
