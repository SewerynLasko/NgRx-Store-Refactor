import { Action } from '@ngrx/store';
import { Pizza } from './../../models/pizza.model';

export const LOAD_PIZZAS = '[PRODUCTS] Load Pizzas';
export const LOAD_PIZZAS_FAIL = '[PRODUCTS] Load Pizzas Fail';
export const LOAD_PIZZAS_SUCCESS = '[PRODUCTS] Load Pizzas Success';

export const CREATE_PIZZA = '[PRODUCTS] Create Pizza';
export const CREATE_PIZZA_FAIL = '[PRODUCTS] Create Pizza Fail';
export const CREATE_PIZZA_SUCCESS = '[PRODUCTS] Create Pizza Success';

export const UPDATE_PIZZA = '[PRODUCTS] Update Pizza';
export const UPDATE_PIZZA_FAIL = '[PRODUCTS] Update Pizza Fail';
export const UPDATE_PIZZA_SUCCESS = '[PRODUCTS] Update Pizza Success';

export const REMOVE_PIZZA = '[PRODUCTS] Remove Pizza';
export const REMOVE_PIZZA_FAIL = '[PRODUCTS] Remove Pizza Fail';
export const REMOVE_PIZZA_SUCCESS = '[PRODUCTS] Remove Pizza Success';

export class LoadPizzas implements Action {
  readonly type = LOAD_PIZZAS;
}

export class LoadPizzasFail implements Action {
  readonly type = LOAD_PIZZAS_FAIL;
  constructor(public payload: any) {}
}

export class LoadPizzasSuccess implements Action {
  readonly type = LOAD_PIZZAS_SUCCESS;
  constructor(public payload: Pizza[]) {}
}

export class CreatePizza implements Action {
  readonly type = CREATE_PIZZA;
  constructor(public payload: Pizza) {}
}

export class CreatePizzaSuccess implements Action {
  readonly type = CREATE_PIZZA_SUCCESS;
  constructor(public payload: Pizza) {}
}

export class CreatePizzaFail implements Action {
  readonly type = CREATE_PIZZA_FAIL;
  constructor(public payload: any) {}
}

export class UpdatePizza implements Action {
  readonly type = UPDATE_PIZZA;
  constructor(public payload: Pizza) {}
}

export class UpdatePizzaSuccess implements Action {
  readonly type = UPDATE_PIZZA_SUCCESS;
  constructor(public payload: Pizza) {}
}

export class UpdatePizzaFail implements Action {
  readonly type = UPDATE_PIZZA_FAIL;
  constructor(public payload: any) {}
}

export class RemovePizza implements Action {
  readonly type = REMOVE_PIZZA;
  constructor(public payload: Pizza) {}
}

export class RemovePizzaSuccess implements Action {
  readonly type = REMOVE_PIZZA_SUCCESS;
  constructor(public payload: Pizza) {}
}

export class RemovePizzaFail implements Action {
  readonly type = REMOVE_PIZZA_FAIL;
  constructor(public payload: any) {}
}

export type PizzasAction =
  | LoadPizzas
  | LoadPizzasFail
  | LoadPizzasSuccess
  | CreatePizza
  | CreatePizzaFail
  | CreatePizzaSuccess
  | UpdatePizza
  | UpdatePizzaFail
  | UpdatePizzaSuccess
  | RemovePizza
  | RemovePizzaFail
  | RemovePizzaSuccess;
