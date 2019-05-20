import * as fromToppings from '../actions/toppings.action';
import { Topping } from './../../models/topping.model';

export interface ToppingsState {
  entities: { [id: number]: Topping };
  loaded: boolean;
  loading: boolean;
  selectedToppings: number[];
}

export const initialState: ToppingsState = {
  entities: {},
  loaded: false,
  loading: false,
  selectedToppings: []
};

// Could be named ToppinggsReducer
export function toppingsReducer(state: ToppingsState = initialState, action: fromToppings.ToppingsAction): ToppingsState {
  switch (action.type) {
    case fromToppings.LOAD_TOPPINGS: {
      return {
        ...state,
        loading: true
      };
    }

    case fromToppings.LOAD_TOPPINGS_SUCCESS: {
      const toppings = action.payload;
      // This sould be in the utilities folder so that its not copied in all of the reducers (mapToEntity)- returning such data structure
      const entities = toppings.reduce(
        (entities: { [id: number]: Topping }, topping: Topping) => {
          return {
            ...entities,
            [topping.id]: topping
          };
        },
        {
          ...state.entities
        }
      );

      return {
        ...state,
        loaded: true,
        loading: false,
        entities
      };
    }

    case fromToppings.LOAD_TOPPINGS_FAIL: {
      return {
        ...state,
        loaded: false,
        loading: false
      };
    }

    case fromToppings.VISUALISE_TOPPINGS: {
      const selectedToppings = action.payload;
      return {
        ...state,
        selectedToppings
      };
    }
  }

  return state;
}

export const getToppingEntities = (state: ToppingsState) => state.entities;
export const getToppingLoaded = (state: ToppingsState) => state.loaded;
export const getToppingLoading = (state: ToppingsState) => state.loading;
// Once we add new items to our reducer it's a good practice to make them available
export const getSelectedToppings = (state: ToppingsState) => state.selectedToppings;
