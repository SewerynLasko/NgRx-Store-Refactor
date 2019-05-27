import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Pizza } from '../../models/pizza.model';
import * as fromStore from '../../store';

@Component({
  selector: 'products',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // now we are adding that to Container Components now
  // Previously when having a service and binding something that was not an observable if you enable this you would not have
  // any change detection. While our application does not have @Input we still are getting our data input purely via Observable-
  // and thats what we care about at this particular component


  // In entire app we have right now change detection disabled- it makes app much faster since we rely only on store and object references checks
  // to actually change and in the container component we are getting everithing via dispatch or select- no other local component state that
  // needs to be detected that there is a change because we are using things like our reducers to actually instruct those changes and then we just
  // pull those values from the store
  // OBSERVABLE DRIVEN- CHANGE DETECTION NOT NEEDED!
  // EASIER TO DEBUG- WE DONT RELY ON LOCAL COMPONENT STATE THAT WE ARE BINDING DOWN FROM A SERVICE
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
