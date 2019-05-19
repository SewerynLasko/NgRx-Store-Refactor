import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as toppingsActions from '../actions/toppings.action';
import { ToppingsService } from './../../services/toppings.service';

@Injectable()
export class ToppingsEffects {
  constructor(private action$: Actions, private toppingsService: ToppingsService) {}

  @Effect()
  loadToppings$ = this.action$.ofType(toppingsActions.LOAD_TOPPINGS).pipe(
    switchMap(() => {
      return this.toppingsService.getToppings().pipe(
        map(toppings => {
          return new toppingsActions.LoadToppingsSuccess(toppings);
        }),
        catchError(error => of(new toppingsActions.LoadToppingsFail(error)))
      );
    })
  );
}
