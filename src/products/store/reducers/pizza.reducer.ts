import { Pizza } from './../../models/pizza.model';
import * as actionTypes from '../actions/pizzas.action';
// this is defining a slice of state that our reducer will manage in entire state tree
// we are controlling the props that we add and making use of static type checking
export interface PizzaState {
  data: Pizza[];
  loading: boolean;
  loaded: boolean;
}

// start off with our application state
export const initialState: PizzaState = {
  data: [],
  loading: false,
  loaded: false
};

// reducers- will return modified slice of state
export function reducer(state = initialState, action: actionTypes.PizzasAction): PizzaState {
  switch (action.type) {
    case actionTypes.LOAD_PIZZAS: {
      // new state object
      return {
        ...state,
        loading: true
      };
    }

    case actionTypes.LOAD_PIZZAS_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: true // loaded- allows to control things like loading spinners or route guards
      };
    }

    case actionTypes.LOAD_PIZZAS_FAIL: {
      return {
        ...state,
        loaded: false,
        loading: false
      };
    }
  }

  return state;
}
