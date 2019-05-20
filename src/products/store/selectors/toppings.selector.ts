import { createSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';
import * as fromToppings from '../reducers/toppings.reducer';

export const getToppingsState = createSelector(
  fromFeature.getProductState,
  (state: fromFeature.ProductState) => state.toppings
);

export const getToppingEntities = createSelector(
  getToppingsState,
  fromToppings.getToppingEntities
);

export const getAllToppings = createSelector(
  getToppingEntities,
  entities => Object.keys(entities).map(id => entities[parseInt(id, 10)])
);

export const getToppingLoaded = createSelector(
  getToppingsState,
  fromToppings.getToppingLoaded
);

export const getToppingLoading = createSelector(
  getToppingsState,
  fromToppings.getToppingLoading
);
