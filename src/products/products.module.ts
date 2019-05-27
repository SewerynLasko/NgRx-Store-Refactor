import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
// components
import * as fromComponents from './components';
// containers
import * as fromContainers from './containers';
// services
import * as fromServices from './services';
// guards
import * as fromGuards from './guards';

import { effects, reducers } from './store';

// routes
export const ROUTES: Routes = [
  {
    path: '',
    canActivate: [fromGuards.PizzasGuard],
    component: fromContainers.ProductsComponent
    // This can be done at different routing levels/structure
    // eg. canActivate child when you have a bunch of child routes that you know will be activated after the canActivate guard above has been called
    // canActivate- guard at parent
    // canLoad- handles lazy loading modules
    // canActivate children- guard at children
  },
  {
    path: 'new',
    canActivate: [fromGuards.PizzasGuard, fromGuards.ToppingsGuard],
    component: fromContainers.ProductItemComponent
  },
  {
    // make sure that this will be hit as last
    path: ':pizzaId', // id to pizzaId to avoid collisions
    canActivate: [fromGuards.PizzaExistsGuard, fromGuards.ToppingsGuard],
    component: fromContainers.ProductItemComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(ROUTES),
    StoreModule.forFeature('products', reducers), // feature name, reducers
    // forFeature- allows to lazy load modules which uses store too, and binds this to root store object located in appModule
    // when we load new module (like ProductsModule for instance) forFeature() will attach the Store to ProductsModule
    // we have a storage module, and this particular feature starts with an object property called 'products'
    // anything in this feature module is beneath this property called 'products'
    EffectsModule.forFeature(effects)
  ],
  providers: [...fromServices.services, ...fromGuards.guards],
  declarations: [...fromContainers.containers, ...fromComponents.components],
  exports: [...fromContainers.containers, ...fromComponents.components]
})
export class ProductsModule {}
