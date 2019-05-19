import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { Pizza } from '../../models/pizza.model';
import { Topping } from '../../models/topping.model';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';

@Component({
  selector: 'product-item',
  styleUrls: ['product-item.component.scss'],
  template: `
    <div class="product-item">
      <pizza-form
        [pizza]="pizza$ | async"
        [toppings]="toppings"
        (selected)="onSelect($event)"
        (create)="onCreate($event)"
        (update)="onUpdate($event)"
        (remove)="onRemove($event)"
      >
        <pizza-display [pizza]="visualise"> </pizza-display>
      </pizza-form>
    </div>
  `
})
export class ProductItemComponent implements OnInit {
  pizza$: Observable<Pizza>;
  visualise: Pizza;
  toppings: Topping[];

  // Because we use ngrx/router-store we dont need ActivatedRoute && Router && Services here
  constructor(private store: Store<fromStore.ProductState>) {}

  ngOnInit() {
    // URL driven- very quick and neat solution (no requests happening)
    // Nove when Im on products/6 and hit refresh then pizza will not load since we dont have route guards to check if pizza is in the store before loading
    // to be added in the future. Works now since we fetch pizzas to the store when entering first via products and then products/6
    this.store.dispatch(new fromStore.LoadToppings());
    this.pizza$ = this.store.select(fromStore.getSelectedPizza);
  }

  onSelect(event: number[]) {}

  onCreate(event: Pizza) {}

  onUpdate(event: Pizza) {}

  onRemove(event: Pizza) {}
}
