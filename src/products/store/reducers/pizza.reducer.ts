import * as actionTypes from '../actions/pizzas.action';
import { Pizza } from './../../models/pizza.model';
// this is defining a slice of state that our reducer will manage in entire state tree
// we are controlling the props that we add and making use of static type checking
// data is of array type- in a biger applciation whis will not scale/handle well
// using object may be a better approach- we call them "entity" (like on the backend side) and they will have ID
// then we will be able to look things up by IDs. At this point we can think of ngrx/store as a database for the client
// we can then use selectors to query that database and get data to components
// using object also benefits when we have to remove something from the structure- we dont have to iterate it over like we would do with array
// same with update- we dont need to find the element we want to update- we just look it up by the id key and replace it
export interface PizzaState {
  entities: { [id: number]: Pizza }; // store via ID (of type number), single entity will store Pizza
  loading: boolean;
  loaded: boolean;
}

// start off with our application state
export const initialState: PizzaState = {
  entities: {},
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
      const pizzas = action.payload; // Convert array type data to object type- like such (obj_key will be id)
      // Could be static converter in another file (helper function)
      const entities = pizzas.reduce(
        (entities: { [id: number]: Pizza }, pizza: Pizza) => {
          // new object- merge entities into existing state and then bind each pizza by it key (dynamically)
          return {
            ...entities,
            [pizza.id]: pizza
          };
        },
        {
          // initial value
          ...state.entities
        }
      );

      // This will be also useful when doing routing like product/id- key will be ID (quick)
      // const pizza: any = {
      //   1: {
      //     id: 1,
      //     name: 'Pizza',
      //     toppings: []
      //   }
      // };
      return {
        ...state,
        loading: false,
        loaded: true, // loaded- allows to control things like loading spinners or route guards
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
export const getPizzasEntities = (state: PizzaState) => state.entities;
// Now we can compose things one level up and pass it to whats called: "Create Selector Function"
