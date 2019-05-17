import * as actionTypes from '../actions/pizzas.action';
import { Pizza } from './../../models/pizza.model';
// this is defining a slice of state that our reducer will manage in entire state tree
// we are controlling the props that we add and making use of static type checking
export interface PizzaState {
  data: Pizza[];
  loading: boolean;
  loaded: boolean;
}

// start off with our application state
export const initialState: PizzaState = {
  data: [
    {
      name: "Seaside Surfin'",
      toppings: [
        {
          id: 6,
          name: 'mushroom'
        },
        {
          id: 7,
          name: 'olive'
        },
        {
          id: 2,
          name: 'bacon'
        },
        {
          id: 3,
          name: 'basil'
        },
        {
          id: 1,
          name: 'anchovy'
        },
        {
          id: 8,
          name: 'onion'
        },
        {
          id: 11,
          name: 'sweetcorn'
        },
        {
          id: 9,
          name: 'pepper'
        },
        {
          id: 5,
          name: 'mozzarella'
        }
      ],
      id: 2
    }
  ],
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

// Selector- is an exported function which allows NgRx to access PizzaState properties
// without us needing to repeat ourselfs over and over again
// You use a selector to compose a state and then we can use it alongside store.select() in the component(s)
// Start exporting some levels of the state.
// Small functions that get passes small level of the PizzaState and at that point in time we are down in our data structure
// This is a good practice to put them underneath the reducers
export const getPizzasLoading = (state: PizzaState) => state.loading;
export const getPizzasLoaded = (state: PizzaState) => state.loaded;
export const getPizzas = (state: PizzaState) => state.data;
// Now we can compose things one level up and pass it to whats called: "Create Selector Function"
