import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Pizza } from '../../models/pizza.model';
import * as fromStore from '../../store';

@Component({
  selector: 'products',
  styleUrls: ['products.component.scss'],
  template: `
    <div class="products">
      <div class="products__new">
        <a class="btn btn__ok" routerLink="./new">
          New Pizza
        </a>
      </div>
      <div class="products__list">
        <div *ngIf="!(pizzas$ | async)?.length">
          No pizzas, add one to get started.
        </div>
        <pizza-item *ngFor="let pizza of pizzas$ | async" [pizza]="pizza"> </pizza-item>
      </div>
    </div>
  `
})
export class ProductsComponent implements OnInit {
  pizzas$: Observable<Pizza[]>;

  // we can only select things from the store that coresponds to ProductState interface (meaning that just exists in ProducState)
  constructor(private store: Store<fromStore.ProductState>) {}

  ngOnInit() {
    this.pizzas$ = this.store.select(fromStore.getAllPizzas);
    this.store.dispatch(new fromStore.LoadToppings());
    // We will setup guards to guard product/id when data is not loaded yet

    // // select me the products. We can do that since we have slices of state
    // // create a selector with a top level property 'products' so that we could jump a level down data structure to access some props
    // // give me the state for this particular module

    // // LEFT FROM LEARNING PURPOSES V2
    // // long approach- not the best, store returns observable that can be just passed to the template with async pipe
    // this.store.select<any>(fromStore.getAllPizzas).subscribe(state => {
    //   this.pizzas = state;
    // })

    // // LEFT FROM LEARNING PURPOSES V1
    // // normally we would have to manually go from products -> pizzas -> data every single time in each places we need this
    // // that's where the selectors shine- single function to traverse a state tree
    // this.store.select<any>('products').subscribe(state => {
    //   console.log(state);
    // })
  }
}
