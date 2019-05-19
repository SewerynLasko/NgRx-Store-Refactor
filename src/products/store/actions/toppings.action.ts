import { Action } from '@ngrx/store';
import { Topping } from './../../models/topping.model';

export const LOAD_TOPPINGS = '[PRODUCTS] Load Toppings';
export const LOAD_TOPPINGS_SUCCESS = '[PRODUCTS] Load Toppings Success';
export const LOAD_TOPPINGS_FAIL = '[PRODUCTS] Load Toppings Fail';

export class LoadToppings implements Action {
  readonly type = LOAD_TOPPINGS;
  constructor() {}
}

export class LoadToppingsSuccess implements Action {
  readonly type = LOAD_TOPPINGS_SUCCESS;
  constructor(public payload: Topping[]) {}
}

export class LoadToppingsFail implements Action {
  readonly type = LOAD_TOPPINGS_FAIL;
  constructor(public payload: any) {}
}

export type ToppingsAction = LoadToppings | LoadToppingsSuccess | LoadToppingsFail;
