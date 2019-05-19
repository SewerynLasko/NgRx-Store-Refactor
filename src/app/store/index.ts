// ngrx/router-store introduce
// This allows us to bind the representation of the routes to ngrx/store- this gices us much more power when composing the selectors
// we will bind http://localhost:4200/products/2 (router state) to app state so we treat it as one single source of truth
// This ngrx/router-store will do the binding automatically for us
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
// Here we will setup how the router state will look like
// We steup this in main module so that router state will be available to the feature modules

// Types in my Store:
export interface State {
  routerReducer: fromRouter.RouterReducerState<RouterStateUrl>;
  // we need to supply this 'routerReducer' name for ngrx/router-store project rquires this.
  // The @ngrx/router-store gives us the state representation
  // routerReducer will take its value from const reducers below and will by of our type RouterStateUrl (we supply only url, queryParams and params)
}

// This reducer will be called to create new state:
export const reducers: ActionReducerMap<State> = {
  routerReducer: fromRouter.routerReducer
};

// This gives us the possibility to bind custom properties/query params to state of ngrx/store
// params = .../1 in the URL ||| url = entire URL (we will bind it to state tree)
export interface RouterStateUrl {
  url: string;
  queryParams: string;
  params: string;
}

// This selector will allow us to add this getRouterState selector to another selector inside our product module and get RouterStateUrl
// This will allow us to select via store the current pizza that we have on the page
export const getRouterState = createFeatureSelector<fromRouter.RouterReducerState<RouterStateUrl>>('routerReducer');
