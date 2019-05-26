import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';
import { MetaReducer, StoreModule } from '@ngrx/store';
// not used in production
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { storeFreeze } from 'ngrx-store-freeze';
// bootstrap
import { AppComponent } from './containers/app/app.component';
import { reducers, effects, CustomSerializer } from './store';

// this would be done dynamically with webpack for builds
const environment = {
  development: true,
  production: false
};

export const metaReducers: MetaReducer<any>[] = !environment.production ? [storeFreeze] : [];

// routes
export const ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'products' },
  {
    path: 'products',
    loadChildren: '../products/products.module#ProductsModule'
  }
];

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(ROUTES),
    StoreModule.forRoot(reducers, { metaReducers }), // reducers, config
    // instatiate Store
    EffectsModule.forRoot(effects),
    // forRoot method on the EffectsModule will instantiate our own effects and make them available at any point in time
    // Also this means that we can import them in our FeatureModule and use them there
    StoreRouterConnectingModule, // This will register ngrx/router which will update our store with routes
    environment.development ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [{ provide: RouterStateSerializer, useClass: CustomSerializer }],
  // Provide (register) RouterStoreSerlializer and use our custom class Serializer
  // When StoreRouterConnectingModule will internally use RouterStateSerializer token we replace it with our own
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
