import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { map, tap } from 'rxjs/operators';
import * as RouterActions from '../actions/router.action';

@Injectable()
export class RouterEffects {
  constructor(private actions$: Actions, private router: Router, private location: Location) {}

  // Difference with this effect and the previous ones is that we dont want the Effects to dispatch actions in this case
  // They should just handle side effect of navigation and thats it
  @Effect({ dispatch: false })
  navigate$ = this.actions$.ofType(RouterActions.GO).pipe(
    map((action: RouterActions.Go) => action.payload),
    // tap operator- step out of observable and handle the side effect
    tap(({ path, query: queryParams, extras }) => {
      // destructure some things coming from payload. : <- rename (query: queryParams)
      this.router.navigate(path, { queryParams, ...extras });
      // Setup action going to a different routes. Instead of injecting router in different components, services or
      // just as a callback in diffrent parts of application- we will just dispatch such navigate$ action (everything is handled in single place)
      // easy to test!
    })
  );

  @Effect({ dispatch: false })
  navigateBack$ = this.actions$.ofType(RouterActions.BACK).pipe(tap(() => this.location.back()));

  @Effect({ dispatch: false })
  navigateForward$ = this.actions$.ofType(RouterActions.FORWARD).pipe(tap(() => this.location.forward()));

  // Router params and state bound to application state! This allows us to dispatch actions and
  // see them with payload in Redux devtools in real time
}
