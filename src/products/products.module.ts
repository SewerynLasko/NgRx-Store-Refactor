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
import { effects, reducers } from './store';

// routes
export const ROUTES: Routes = [
  {
    path: '',
    component: fromContainers.ProductsComponent
  },
  {
    path: ':id',
    component: fromContainers.ProductItemComponent
  },
  {
    path: 'new',
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
  providers: [...fromServices.services],
  declarations: [...fromContainers.containers, ...fromComponents.components],
  exports: [...fromContainers.containers, ...fromComponents.components]
})
export class ProductsModule {}
