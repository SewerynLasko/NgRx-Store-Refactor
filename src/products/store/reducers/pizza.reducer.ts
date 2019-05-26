import * as actionTypes from '../actions/pizzas.action';
import { Pizza } from './../../models/pizza.model'; // <- Object destructuring example
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
export function pizzaReducer(state = initialState, action: actionTypes.PizzasAction): PizzaState {
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

    case actionTypes.UPDATE_PIZZA_SUCCESS:
    case actionTypes.CREATE_PIZZA_SUCCESS: {
      const pizza = action.payload;
      const entities = {
        ...state.entities, // Merge all old entities and and brand new one- based on the dynamic state from the server
        [pizza.id]: pizza // Object key- pizza.id, Object value- pizza // This will overwrite existing entity in case of update
      };

      return {
        ...state,
        ...entities
      };
    }

    case actionTypes.REMOVE_PIZZA_SUCCESS: {
      const pizza = action.payload;
      // Object destructuring- destructure the item that we dont want
      // Give me the item that we want to delete from entities- then we will bind the result of that to our state tree
      // We remove one item by destructuring it and then keep the rest in a variable and then bind that variable
      // [pizza.id]: removed- This allows us to give it a name (so console.log(removed) will work) and say that this is going to be a destructured value
      // we dont care about this name, we just want the stuff that is left- the ...entities (name is also created by me- could be ...result)
      const { [pizza.id]: removed, ...entities } = state.entities;
      return {
        ...state,
        ...entities
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
