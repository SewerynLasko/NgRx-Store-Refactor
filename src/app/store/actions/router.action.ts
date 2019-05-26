import { NavigationExtras } from '@angular/router'; // Enables relative navigation from the current ActivatedRoute.
import { Action } from '@ngrx/store';

// This allows us to dispatch events like go to this particular path, here are the query params and here are navigation extras
// With this we will add some Effects for routing and this way we would not have to inject the router to any of our components-
// we will just call apropriet action to change the view

export const GO = '[ROUTER] Go';
export const BACK = '[ROUTER] Back';
export const FORWARD = '[ROUTER] Forward';

export class Go implements Action {
  readonly type = GO;
  constructor(public payload: { path: any[]; query?: object; extras?: NavigationExtras }) {}
}

// Back and forward will not be used in this app but you may have some usecase for that in your app
export class Back implements Action {
  readonly type = BACK;
}

export class Forward implements Action {
  readonly type = FORWARD;
}

export type Actions = Go | Back | Forward;
