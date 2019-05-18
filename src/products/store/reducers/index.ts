import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store'; // type check reducers- describes how the reducers look like and how are composed
import * as fromPizzas from '../reducers/pizza.reducer';
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
export const getPizzaState = createSelector(
  getProductState,
  (state: ProductState) => state.pizzas
);

export const getPizzasEntities = createSelector(
  getPizzaState,
  fromPizzas.getPizzasEntities
);
// Entity to array selector. Second argument- a function
export const getAllPizzas = createSelector(
  getPizzasEntities,
  entities => {
    // [1,2,3].map(entity that corresponds with id)
    return Object.keys(entities).map(id => entities[parseInt(id, 10)]);
  }
);
export const getPizzasLoading = createSelector(
  getPizzaState,
  fromPizzas.getPizzasLoading
);
export const getPizzasLoaded = createSelector(
  getPizzaState,
  fromPizzas.getPizzasLoaded
);
// the whole point of the selector is to allow us to spearate application state from the components trees
// we can compose app state and pass the slices that we need to particular component
