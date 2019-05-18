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
}
