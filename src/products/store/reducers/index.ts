import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { ProductState } from './index';
import { PizzaState, pizzaReducer } from './pizza.reducer';
import { ToppingsState, toppingsReducer } from './toppings.reducer';

export interface ProductState {
  pizzas: PizzaState;
  toppings: ToppingsState;
}

export const reducers: ActionReducerMap<ProductState> = {
  pizzas: pizzaReducer,
  toppings: toppingsReducer
};

export const getProductState = createFeatureSelector<ProductState>('products');
