import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects'; // Action is observable. We can listen to types of actions being dispatched and respond
import { of } from 'rxjs/observable/of';
import { catchError, map, switchMap } from 'rxjs/operators';
import { PizzasService } from './../../services/pizzas.service';
import * as pizzaActions from './../actions/pizzas.action';

// Listem for action and produce side effects
// Side effect ex.: communicate via HTTP to localserver and bring data back
// Then dispatch action that load is successful

// Effect is just a class with a few properties (Observables)
// Observables are called by NgRx/effects and work kind of a way like a reducers- allows us to respond to different events and do things
// Reducer deals only with pure JS state and immutable object
// Effects deals with observable streams

@Injectable()
export class PizzaEffects {
  constructor(private actions$: Actions, private pizzasService: PizzasService) {}

  // Here we will perform side actions
  // This is observable stream and we can add observables to it, return observables
  // This MUST RETURN ACTION- thats the key, thats what effect does- returns action back

  // switchMap() we get a function and we need to return something from that function
  // switchMap allows us to return brand new observable which we can then do things like map over and then dispatch action
  // catchError()- error passed is the error from the server. We put that to of() because we need to make an Observable from it
  @Effect()
  loadPizzas$ = this.actions$.ofType(pizzaActions.LOAD_PIZZAS).pipe(
    switchMap(() => {
      // we add a map inside, because when map() is called we know that the call was successful
      return this.pizzasService.getPizzas().pipe(
        map(pizzas => {
          return new pizzaActions.LoadPizzasSuccess(pizzas);
        }),
        catchError(error => of(new pizzaActions.LoadPizzasFail(error)))
      );
    })
  );

  @Effect()
  createPizza$ = this.actions$.ofType(pizzaActions.CREATE_PIZZA).pipe(
    map((action: pizzaActions.CreatePizza) => action.payload),
    switchMap(pizza => {
      return this.pizzasService.createPizza(pizza).pipe(
        map(pizza => new pizzaActions.CreatePizzaSuccess(pizza)), // we return the actions so that the @Effect() could dispatch them, when dispatch then handled in the reducer
        catchError(error => of(new pizzaActions.CreatePizzaFail(error)))
      );
    })
  );

  @Effect()
  // updatePizza$ will either get value UpdatePizzaSuccess or UpdatePizzaFail and will pass it to the reducer
  updatePizza$ = this.actions$.ofType(pizzaActions.UPDATE_PIZZA).pipe(
    map((action: pizzaActions.UpdatePizza) => action.payload),
    switchMap(pizza => {
      return this.pizzasService.updatePizza(pizza).pipe(
        map(pizza => new pizzaActions.UpdatePizzaSuccess(pizza)),
        catchError(error => of(new pizzaActions.UpdatePizzaFail(error)))
      );
    })
  );

  @Effect()
  removePizza$ = this.actions$.ofType(pizzaActions.REMOVE_PIZZA).pipe(
    map((action: pizzaActions.RemovePizza) => action.payload),
    switchMap(pizza => {
      // pizza we want to remove, will have an ID
      return this.pizzasService.removePizza(pizza).pipe(
        map(() => new pizzaActions.RemovePizzaSuccess(pizza)),
        // Many APIS will not return an item on delete- thats why in here we just pass a pizza from the switchMap. Map does not have an argument
        catchError(error => of(new pizzaActions.RemovePizzaFail(error)))
      );
    })
  );
}
