import { createSelector } from '@ngrx/store';
import * as fromRoot from '../../../app/store';
import * as fromFeature from '../reducers';
import * as fromPizzas from '../reducers/pizza.reducer';
import * as fromToppings from '../reducers/toppings.reducer';
import { Pizza } from 'src/products/models/pizza.model';

export const getPizzaState = createSelector(
  fromFeature.getProductState,
  (state: fromFeature.ProductState) => state.pizzas
);

export const getPizzasEntities = createSelector(
  getPizzaState,
  fromPizzas.getPizzasEntities
);

// When we navigate to product/2 we know that we want to get pizza 2 from entities so we need selector to get it
export const getSelectedPizza = createSelector(
  getPizzasEntities,
  fromRoot.getRouterState, // reference to router reducer (to access the state object on the router existing in the ngrx/router-store
  (entities, router): Pizza => {
    // use router state to get pizza- super fast since we have entities, not arrays
    return router.state && entities[router.state.params.pizzaId]; // we know that this is the correct pizza since router is bounded to store and tells us that
  }
);

// Compose multiple selectors
// First- think if you could reuse existing selector to get what you want
export const getPizzaVisualized = createSelector(
  getSelectedPizza, // pizza we are on
  fromToppings.getToppingEntities,
  fromToppings.getSelectedToppings, // comes from selected pizza
  (selectedPizza, toppingEntities, selectedToppings) => {
    // SelectedToppings is array of ids- we need to find the object behind the ids
    const toppings = selectedToppings.map(id => toppingEntities[id]);
    // we return updated representation of what the pizza look like, but we dont want to save the pizza until the user commits the change
    return {
      ...selectedPizza, // will have some toppings inside already
      toppings // but we overwritte them with ours
    };
  }
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

// Here we want to take a data from router-store and then compose it to go and select individual entity based on the route param
// When the param = 2 we go and look in the entities for that object
