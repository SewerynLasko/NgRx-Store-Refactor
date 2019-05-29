import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';
import { PizzasService } from '../../services/pizzas.service';
import * as fromActions from '../actions/pizzas.action';
import * as fromEffects from './pizza.effect';
// MARBLE DIAGRAM - CONCEPT OF TESTING OBSERVABLE STREAMS!

// When it comes to testing observables and observable stream there is specific syntax called "marble sytax"
// that can be used to represent things that are happening over time
// https://github.com/ReactiveX/rxjs/blob/master/docs_app/content/guide/testing/marble-testing.md
// Lets use this approach to make sure that we return right thing from the effcet

// We can test our asynchronous RxJS code synchronously and deterministically by virtualizing time using the TestScheduler.
// ASCII marble diagrams provide a visual way for us to represent the behavior of an Observable.
// We can use them to assert that a particular Observable behaves as expected, as well as to create hot and cold Observables we can use as mocks.

// In the context of TestScheduler,
// a marble diagram is a string containing special syntax representing events happening over virtual time. Time progresses by frames.

// '-' frame: 1 "frame" of virtual time passing (see above description of frames).
// [a-z0-9] e.g. 'a' any alphanumeric character: Represents a value being emitted by the producer signaling next()

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

describe('PizzasEffects', () => {
  let actions$: TestActions;
  let service: PizzasService;
  let effects: fromEffects.PizzaEffects;

  const pizzas = [
    {
      id: 1,
      name: 'Pizza #1',
      toppings: [{ id: 1, name: 'onion' }, { id: 2, name: 'mushroom' }, { id: 3, name: 'basil' }]
    },
    {
      id: 2,
      name: 'Pizza #2',
      toppings: [{ id: 1, name: 'onion' }, { id: 2, name: 'mushroom' }, { id: 3, name: 'basil' }]
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PizzasService, fromEffects.PizzaEffects, { provide: Actions, useFactory: getActions }]
    });

    actions$ = TestBed.get(Actions);
    service = TestBed.get(PizzasService);
    effects = TestBed.get(fromEffects.PizzaEffects);

    spyOn(service, 'getPizzas').and.returnValue(of(pizzas));
    spyOn(service, 'createPizza').and.returnValue(of(pizzas[0]));
    spyOn(service, 'updatePizza').and.returnValue(of(pizzas[0]));
    spyOn(service, 'removePizza').and.returnValue(of(pizzas[0]));
  });

  describe('loadPizzas$', () => {
    it('should return a collection from LoadPizzasSuccess', () => {
      const action = new fromActions.LoadPizzas();
      const completion = new fromActions.LoadPizzasSuccess(pizzas);

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.loadPizzas$).toBeObservable(expected);
    });
  });

  describe('createPizza$', () => {
    it('should work', () => {
      const action = new fromActions.CreatePizza(pizzas[0]);
      const completion = new fromActions.CreatePizzaSuccess(pizzas[0]);

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-c', { c: completion });

      expect(effects.createPizza$).toBeObservable(expected);
    });
  });

  describe('updatePizza$', () => {
    it('should work', () => {
      const action = new fromActions.UpdatePizza(pizzas[0]);
      const completion = new fromActions.UpdatePizzaSuccess(pizzas[0]);

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-c', { c: completion });

      expect(effects.updatePizza$).toBeObservable(expected);
    });
  });

  describe('removePizza$', () => {
    it('should work', () => {
      const action = new fromActions.RemovePizza(pizzas[0]);
      const completion = new fromActions.RemovePizzaSuccess(pizzas[0]);

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-c', { c: completion });

      expect(effects.removePizza$).toBeObservable(expected);
    });
  });
});
