import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators/tap';
import { Pizza } from '../../models/pizza.model';
import { Topping } from '../../models/topping.model';
import * as fromStore from '../../store';

@Component({
  selector: 'product-item',
  styleUrls: ['product-item.component.scss'],
  template: `
    <div class="product-item">
      <pizza-form
        [pizza]="pizza$ | async"
        [toppings]="toppings$ | async"
        (selected)="onSelect($event)"
        (create)="onCreate($event)"
        (update)="onUpdate($event)"
        (remove)="onRemove($event)"
      >
        <pizza-display [pizza]="visualise$ | async"> </pizza-display>
      </pizza-form>
    </div>
  `
})
export class ProductItemComponent implements OnInit {
  pizza$: Observable<Pizza>;
  visualise$: Observable<Pizza>;
  toppings$: Observable<Topping[]>;

  // Because we use ngrx/router-store we dont need ActivatedRoute && Router && Services here
  constructor(private store: Store<fromStore.ProductState>) {}

  ngOnInit() {
    // URL driven- very quick and neat solution (no requests happening)
    // Nove when Im on products/6 and hit refresh then pizza will not load since we dont have route guards to check if pizza is in the store before loading
    // to be added in the future. Works now since we fetch pizzas to the store when entering first via products and then products/6
    this.pizza$ = this.store.select(fromStore.getSelectedPizza).pipe(
      // After the pizza observable will get value I need to push toppings to visualise them
      // this.store.dispatch(new fromStore.VisualiseToppings(event)); got to be triggered but I need this event argument (toppings array)
      // Now the topings will get refreshed onlu after triggering onSelect method (not on init)
      // code below fix that by loading toppings on init

      tap((pizza: Pizza = null) => {
        // default value null- since this component will both serve for cases where product/new or product/1 (getSelectedPizza uses router)
        const pizzaExist = !!(pizza && pizza.toppings); // !!- cast to boolean
        const toppings = pizzaExist ? pizza.toppings.map(topping => topping.id) : []; // if new pizza- push to state empty selectedToppings array (state clean up)
        this.store.dispatch(new fromStore.VisualiseToppings(toppings));
      })
      // this operator allows us to step out of the observable stream and anything we do here does not get return to the stream
      // so does not mutate it but we can do something with the data anyways
    );
    this.toppings$ = this.store.select(fromStore.getAllToppings);
    this.visualise$ = this.store.select(fromStore.getPizzaVisualized);
  }

  onSelect(event: number[]) {
    this.store.dispatch(new fromStore.VisualiseToppings(event));
  }

  onCreate(event: Pizza) {
    this.store.dispatch(new fromStore.CreatePizza(event));
  }

  onUpdate(event: Pizza) {
    this.store.dispatch(new fromStore.UpdatePizza(event));
  }

  onRemove(event: Pizza) {
    const remove = window.confirm('Are you sure?');
    if (remove) {
      this.store.dispatch(new fromStore.RemovePizza(event));
    }
  }
  // How to think about this:
  // @Inputs to the dummy child components are passed from smart component which takes them via STORE SELECTORS as Observables
  // @Outputs from the dummy child components are passed to smart component which passes them further as STORE DISPATCHES
}
