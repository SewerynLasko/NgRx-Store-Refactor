import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, filter, switchMap, take, tap } from 'rxjs/operators';
import * as fromStore from '../store';
// Why we using guard instead of resolver?
// We use store- we dont need the resolvers
// Also guard gives us additional benefit of being able to navigate back or to particular view that we are trying to attempt to navigate to

// We want to create a route guards that inject our store and checks if we have loaded pizzas or not

@Injectable()
export class PizzasGuard implements CanActivate {
  constructor(private store: Store<fromStore.ProductState>) {}

  canActivate(): Observable<boolean> {
    return this.checkStore().pipe(
      // we return true if switchMap() executes because we know that this was successful
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  checkStore(): Observable<boolean> {
    return this.store.select(fromStore.getPizzasLoaded).pipe(
      // Because tap is entirely ignored in terms of observable stream it doesnt have any effect on next function(filter)
      // You can think of it as it wasnt there
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new fromStore.LoadPizzas());
        }
      }),
      // in filter we just want to return that loaded property. If loaded is false the stream will not continue- we are technically waiting in here
      // for the loaded property to be 100% available (so when it gets value from tap()) and then we continue the stream
      filter(loaded => loaded),
      // if loaded is true we take(1) operator and we just say that we want to take one value. So take takes loaded property from th filter (true)
      // and ends observable stream (calls observable.complete) and unsubscribes
      take(1)
    );
  }
}
