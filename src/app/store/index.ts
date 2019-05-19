// ngrx/router-store introduce
// This allows us to bind the representation of the routes to ngrx/store- this gices us much more power when composing the selectors
// we will bind http://localhost:4200/products/2 (router state) to app state so we treat it as one single source of truth
// This ngrx/router-store will do the binding automatically for us
import { ActivatedRouteSnapshot, Params, RouterStateSnapshot } from '@angular/router';
import * as ngRxRouter from '@ngrx/router-store';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
// Here we will setup how the router state will look like
// We steup this in main module so that router state will be available to the feature modules

// Types in my Store:
export interface State {
  routerReducer: ngRxRouter.RouterReducerState<RouterStateUrl>;
  // we need to supply this 'routerReducer' name for ngrx/router-store project rquires this.
  // The @ngrx/router-store gives us the state representation
  // routerReducer will take its value from const reducers below and will by of our type RouterStateUrl (we supply only url, queryParams and params)
}

// This reducer will be called to create new state:
export const reducers: ActionReducerMap<State> = {
  routerReducer: ngRxRouter.routerReducer
};

// This gives us the possibility to bind custom properties/query params to state of ngrx/store
// params = .../1 in the URL ||| url = entire URL (we will bind it to state tree)
export interface RouterStateUrl {
  url: string;
  queryParams: Params;
  params: Params;
}

// This selector will allow us to add this getRouterState selector to another selector inside our product module and get RouterStateUrl
// This will allow us to select via store the current pizza that we have on the page
export const getRouterState = createFeatureSelector<ngRxRouter.RouterReducerState<RouterStateUrl>>('routerReducer');

// This CustomSerializer get the router state (RouterStateSnapshot) and takes some of it's properties and binds them to the store
// RouterStateSnapshot is how the router looks like at a given point of time
// CustomSerializer is just a class with serialize method which is our own implementation
export class CustomSerializer implements ngRxRouter.RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    const { url } = routerState; // Object destructure (same as in imports). Same as: const url = routerStare.url;
    const { queryParams } = routerState.root;

    // Router is a state tree of itself- which means that we need to traverse the state tree
    // We iterate the state tree below (NOT the ngrx state- just the angular router state)
    // While we have first child it means that we have child roots (products/2). We need to iterate to get that root param
    let state: ActivatedRouteSnapshot = routerState.root;
    while (state.firstChild) {
      state = state.firstChild;
    }
    const { params } = state;
    return { url, queryParams, params }; // new object based on the properties of the router- will be bond to the ngrx/state
  }
}
// Anytime router path changes this CustomSerializer is going to be called by ngrx/router-store- and state will be updated
// instead of doing this.route.params.subscribe in the component we will just use selectors and compose the state
// and grab params.is and pass it to the entities (all pizza objects) to match up which pizza we are viewing
