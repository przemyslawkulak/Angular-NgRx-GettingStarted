import * as fromRoot from "../../state/app.state";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProductState } from "./product.reducer";

export interface State extends fromRoot.State {
  products: ProductState;
}

const getProductFeatureState = createFeatureSelector<ProductState>("products");

export const getShowProductCode = createSelector(
  getProductFeatureState,
  state => state.showProductCode
);
export const getCurrentProductID = createSelector(
  getProductFeatureState,
  state => state.currentProductId
);
export const getCurrentProduct = createSelector(
  getProductFeatureState,
  getCurrentProductID,
  (state, currentProductId) => {
    if (currentProductId === 0) {
      return {
        id: 0,
        productName: "",
        productCode: "New",
        description: "",
        starRating: 0
      };
    } else {
      return currentProductId
        ? state.products.find(p => p.id === currentProductId)
        : null;
    }
  }
);

export const getProducts = createSelector(
  getProductFeatureState,
  state => state.products
);

export const getError = createSelector(
  getProductFeatureState,
  state => state.error
);
