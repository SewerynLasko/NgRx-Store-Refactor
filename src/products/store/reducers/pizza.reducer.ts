import * as actionTypes from '../actions/pizzas.action';
import { Pizza } from './../../models/pizza.model';

export interface PizzaState {
  entities: { [id: number]: Pizza };
  loading: boolean;
  loaded: boolean;
}

export const initialState: PizzaState = {
  entities: {},
  loading: false,
  loaded: false
};

export function pizzaReducer(state = initialState, action: actionTypes.PizzasAction): PizzaState {
  switch (action.type) {
    case actionTypes.LOAD_PIZZAS: {
      return {
        ...state,
        loading: true
      };
    }

    case actionTypes.LOAD_PIZZAS_SUCCESS: {
      const pizzas = action.payload;
      const entities = pizzas.reduce(
        (entities: { [id: number]: Pizza }, pizza: Pizza) => {
          return {
            ...entities,
            [pizza.id]: pizza
          };
        },
        {
          ...state.entities
        }
      );

      return {
        ...state,
        loading: false,
        loaded: true,
        entities
      };
    }

    case actionTypes.LOAD_PIZZAS_FAIL: {
      return {
        ...state,
        loaded: false,
        loading: false
      };
    }

    case actionTypes.UPDATE_PIZZA_SUCCESS:
    case actionTypes.CREATE_PIZZA_SUCCESS: {
      const pizza = action.payload;
      const entities = {
        ...state.entities,
        [pizza.id]: pizza
      };
      return {
        ...state,
        entities
      };
    }

    case actionTypes.REMOVE_PIZZA_SUCCESS: {
      const pizza = action.payload;
      const { [pizza.id]: removed, ...entities } = state.entities;
      return {
        ...state,
        entities
      };
    }
  }

  return state;
}

export const getPizzasLoading = (state: PizzaState) => state.loading;
export const getPizzasLoaded = (state: PizzaState) => state.loaded;
export const getPizzasEntities = (state: PizzaState) => state.entities;
