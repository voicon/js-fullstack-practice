import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { switchMap } from 'rxjs/operators';

import * as ProductsAction from '../actions';
import { ProductsDataService } from '../services/products-data.service';

const toAction = ProductsAction.toAction();

@Injectable({
  providedIn: 'root'
})
export class ProductsEffects {
  @Effect()
  getProducts$: Observable<Action> = this.actions$
    .pipe(
      ofType(ProductsAction.GET_PRODUCTS_LIST),
      switchMap(() =>
        toAction(
          this.productsDataService.getProducts(),
          ProductsAction.GetProductsSuccess,
          ProductsAction.GetProductsError
        )
      )
    );
  @Effect()
  getActivatedProduct$: Observable<Action> = this.actions$
    .pipe(
      ofType(ProductsAction.GET_ACTIVATED_PRODUCT),
      switchMap((action: ProductsAction.GetActivatedProduct) =>
        toAction(
          this.productsDataService.getProductBySlug(action.payload),
          ProductsAction.GetActivatedProductSuccess,
          ProductsAction.GetActivatedProductError
        )
      )
    );

  constructor(
    private actions$: Actions,
    private productsDataService: ProductsDataService
  ) {}
}
