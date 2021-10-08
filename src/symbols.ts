import { InjectionKey, Ref } from "vue";
import { NSApp } from "./types/appStore";
import { NSCart } from "./types/cart";
import { NSProduct } from "./types/product";
import { NSProductDetails } from "./types/productDetails";
import { NSReadMenu } from "./types/readMenu";
import { NSShopMenu } from "./types/shopMenu";
import { NSSuggestions } from "./types/suggestions";

export const APP_STORE: InjectionKey<NSApp.Store> = Symbol("APP_STORE");

export const IS_DESKTOP_VIEW: InjectionKey<Ref<boolean>> =
  Symbol("IS_DESKTOP_VIEW");
export const IS_LDESKTOP_VIEW: InjectionKey<Ref<boolean>> =
  Symbol("IS_LDESKTOP_VIEW");

export const NAV_IS_OPEN: InjectionKey<Ref<boolean>> = Symbol("NAV_IS_OPEN");
export const NAV_NEXT_LAYER: InjectionKey<Ref<number>> =
  Symbol("NAV_NEXT_LAYER");
export const NAV_CURRENT_LAYER: InjectionKey<Ref<number>> =
  Symbol("NAV_CURRENT_LAYER");
export const NAV_MAIN_ITEM_REF: InjectionKey<Ref<string | undefined>> =
  Symbol("NAV_MAIN_ITEM_REF");
export const NAV_MAIN_LAYER_ID: InjectionKey<Ref<string | undefined>> =
  Symbol("NAV_MAIN_LAYER_ID");
export const NAV_SUB_LAYER_ID: InjectionKey<Ref<string | undefined>> =
  Symbol("NAV_SUB_LAYER_ID");
export const NAV_FN_ON_CLICK_NAV_ITEM: InjectionKey<(ref: string) => void> =
  Symbol("NAV_FN_ON_CLICK_NAV_ITEM");
export const NAV_FN_ON_CLICK_CLOSE_BTN: InjectionKey<() => void> = Symbol(
  "NAV_FN_ON_CLICK_CLOSE_BTN"
);
export const NAV_FN_ON_MOUSE_OVER_MAIN_LAYER: InjectionKey<() => void> = Symbol(
  "NAV_FN_ON_MOUSE_OVER_MAIN_LAYER"
);
export const NAV_FN_ON_CLICK_MAIN_LAYER_ID: InjectionKey<
  (id: string | undefined) => void
> = Symbol("NAV_FN_ON_CLICK_MAIN_LAYER_ID");
export const NAV_FN_ON_CLICK_SUB_LAYER_ID: InjectionKey<
  (id: string | undefined) => void
> = Symbol("NAV_FN_ON_CLICK_SUB_LAYER_ID");

export const SUGGESTIONS: InjectionKey<
  Ref<NSSuggestions.Suggestions | undefined>
> = Symbol("SUGGESTIONS");

export const READ_MENU: InjectionKey<Ref<NSReadMenu.ReadMenu | undefined>> =
  Symbol("READ_MENU");

export const SHOP_MENU: InjectionKey<Ref<NSShopMenu.ShopMenu | undefined>> =
  Symbol("SHOP_MENU");

export const PRODUCT: InjectionKey<Ref<NSProduct.Product | undefined>> =
  Symbol("PRODUCT");
export const PRODUCT_DETAILS: InjectionKey<
  Ref<NSProductDetails.Product | undefined>
> = Symbol("PRODUCT_DETAILS");

export const CART_IS_OPEN: InjectionKey<Ref<boolean>> = Symbol("CART_IS_OPEN");
export const CART_FN_ON_CLICK_CART_BTN: InjectionKey<
  (showMessage: boolean) => void
> = Symbol("CART_FN_ON_CLICK_CART_BTN");
export const CART_FN_ON_CLICK_CLOSE_CART_BTN: InjectionKey<() => void> = Symbol(
  "CART_FN_ON_CLICK_CLOSE_CART_BTN"
);
export const CART_DATA: InjectionKey<Ref<NSCart.CartData | undefined>> =
  Symbol("CART_DATA");
export const CART_ITEMS: InjectionKey<Ref<NSCart.Entry[]>> =
  Symbol("CART_ITEMS");
export const CART_ITEM_QUANTITY: InjectionKey<Ref<number>> =
  Symbol("CART_ITEM_QUANTITY");
export const CART_FN_UPDATE_QUANTITY: InjectionKey<
  (sku: string, newQuantity: number) => void
> = Symbol("CART_FN_UPDATE_QUANTITY");
export const CART_FN_ADD_ITEM_TO_CART: InjectionKey<
  (product: NSProduct.Product, sku: string) => boolean
> = Symbol("CART_FN_ADD_ITEM_TO_CART");
