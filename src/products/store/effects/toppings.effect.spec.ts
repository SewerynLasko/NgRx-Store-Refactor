import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';
import { ToppingsService } from '../../services/toppings.service';
import * as fromActions from '../actions/toppings.action';
import * as fromEffects from './toppings.effect';

// Test actions implementin Actions interface
export class TestActions extends Actions {
  constructor() {
    super(empty());
  }

  set stream(source: Observable<any>) {
    this.source = source;
  }
}

export function getActions() {
  return new TestActions();
}

describe('ToppingsEffects', () => {
  let actions$: TestActions;
  let service: ToppingsService;
  let effects: fromEffects.ToppingsEffects;

  const toppings = [{ id: 1, name: 'onion' }, { id: 2, name: 'mushroom' }, { id: 3, name: 'basil' }];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ToppingsService, fromEffects.ToppingsEffects, { provide: Actions, useFactory: getActions }]
      // Here we provide fake actions (factory return new instance of this actions)
    });

    actions$ = TestBed.get(Actions);
    service = TestBed.get(ToppingsService);
    effects = TestBed.get(fromEffects.ToppingsEffects);

    spyOn(service, 'getToppings').and.returnValue(of(toppings)); // service returns sucessfuly values
  });

  // Test observables in our stream
  // Normal flow is like this: we listen to LOAD TOPPINGS Action and then we return toppingService -> getToppings method
  // Then we map() over it and then return new action (load succed or failed) to be dispatched by effect as an observable

  describe('loadToppings$', () => {
    it('should return a collection from LoadToppingsSuccess', () => {
      const action = new fromActions.LoadToppings();
      const completion = new fromActions.LoadToppingsSuccess(toppings);

      // 1.) Here we are creating a new action and assigning hot observable. After 10 frames we supply hot observable
      // We are emitting observable containing LoadToppings() action to which our effect is listening to. ('-a'- after 10 frames emit a)
      actions$.stream = hot('-a', { a: action });
      // 3.) Cold observable- its up to effect package to invoke this observable and do something with it.
      // After 10 frames this will be emitted and our effect can pick up on this <- we say we want to finish loadToppings$ effect with a success
      const expected = cold('-b', { b: completion });

      // 2.) here we are expecting the effect loadToppings$ property to be an observable containing expected output
      expect(effects.loadToppings$).toBeObservable(expected);
    });
  });
});
