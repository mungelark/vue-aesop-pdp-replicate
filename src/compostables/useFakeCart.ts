import { computed, onMounted, provide, Ref, ref, watch } from "vue";
import {
  APP_STORE,
  CART_DATA,
  CART_FN_ADD_ITEM_TO_CART,
  CART_FN_ON_CLICK_CART_BTN,
  CART_FN_ON_CLICK_CLOSE_CART_BTN,
  CART_FN_UPDATE_QUANTITY,
  CART_IS_OPEN,
  CART_ITEMS,
  CART_ITEM_QUANTITY,
} from "../symbols";
import { NSCart } from "../types/cart";
import { NSProduct } from "../types/product";
import { APIStatus, safeInject } from "./common";

const rawNewItem = {
  entryNumber: 0,
  quantity: 1,
  basePrice: {
    currencyIso: "GBP",
    value: 0.0,
    priceType: "BUY",
    formattedValue: "£0.00",
    minQuantity: null,
    maxQuantity: null,
    taxRate: null,
    taxValue: null,
    taxDetails: null,
  },
  totalPrice: {
    currencyIso: "GBP",
    value: 0.0,
    priceType: "BUY",
    formattedValue: "£0.00",
    minQuantity: null,
    maxQuantity: null,
    taxRate: null,
    taxValue: null,
    taxDetails: null,
  },
  product: {
    name: "",
    url: "",
    image: {
      altText: "",
      sizes: [
        { viewport: "LARGE", src: "" },
        { viewport: "MEDIUM", src: "" },
        { viewport: "SMALL", src: "" },
      ],
    },
    type: null,
    giftCardValue: null,
    giftCardMessage: null,
    recipient: null,
    recipientEmail: null,
    code: "",
    size: "",
    tracking: {
      name: "",
      id: "",
      price: "",
      brand: "",
      category: "",
      variant: "",
      dimension3: "",
      dimension4: "",
      dimension5: "",
    },
    isAvaliableForCNC: true,
  },
  maxQuantity: 5,
};

export default function useFakeCart() {
  async function fetchInitCart() {
    status.value = APIStatus.RUNNING;
    try {
      const res = await fetch("./data/cartData.json");
      if (!res.ok) {
        status.value = APIStatus.ERROR;
      }
      const json = await res.json();
      status.value = APIStatus.SUCCESS;
      cartData.value = json;
      cartItems.value = json.entries;
    } catch (err) {
      status.value = APIStatus.ERROR;
      throw new Error(String(err));
    }
  }

  const status = ref(APIStatus.IDLE);
  const cartData: Ref<NSCart.CartData | undefined> = ref(undefined);

  const store = safeInject(APP_STORE);

  const isCartOpen = ref(false);
  const onClickCartBtn = (showMessage = false) => {
    if (deliveryItemQuantity.value === 0) {
      showMessage &&
        store.setAlertMessage({ message: "You have no items in your cart" });
      return;
    }
    document.body.classList.add("no-scrolling");
    isCartOpen.value = true;
  };
  const onClickCloseCartBtn = () => {
    isCartOpen.value = false;
    document.body.classList.remove("no-scrolling");
  };

  const cartItems: Ref<NSCart.Entry[]> = ref([]);
  const deliveryItemQuantity = computed(() => {
    return cartItems.value.reduce((acc, x) => acc + x.quantity, 0);
  });

  watch(deliveryItemQuantity, (newQuantity) => {
    if (newQuantity === 0) onClickCloseCartBtn();
  });

  const updateItemQuantity = (sku: string, newQuantity: number) => {
    const itemIdx = cartItems.value.findIndex((x) => x.product.code === sku);
    if (itemIdx === -1) {
      return;
    }
    if (newQuantity === 0) {
      cartItems.value.splice(itemIdx, 1);
    } else {
      cartItems.value[itemIdx] = Object.assign({}, cartItems.value[itemIdx], {
        quantity: newQuantity,
      });
    }
  };

  const addItemToCart = (product: NSProduct.Product, sku: string) => {
    const itemIdx = cartItems.value.findIndex((x) => x.product.code === sku);
    if (itemIdx === -1) {
      const nextEntryNumber =
        cartItems.value.reduce((x, y) => Math.max(x, y.entryNumber), 0) + 1;
      const variant = product.variants.find((x) => x.sku === sku)!;
      cartItems.value.push(
        Object.assign({}, rawNewItem, {
          entryNumber: nextEntryNumber,
          basePrice: {
            ...rawNewItem.basePrice,
            value: Number(variant.price.match(/(\d+|\.)+/g)?.join()),
            formattedValue: variant.price,
          },
          product: {
            ...rawNewItem.product,
            name: product.name,
            url: "#",
            size: variant.size,
            code: sku,
            tracking: variant.tracking,
          },
        })
      );
      store.setAlertMessage({ message: `${product.name} added to cart` });
      return true;
    } else {
      const targetItem = cartItems.value[itemIdx];
      if (targetItem.quantity < targetItem.maxQuantity) {
        targetItem.quantity += 1;
        store.setAlertMessage({ message: `${product.name} added to cart` });
        return true;
      }
    }
    return false;
  };

  onMounted(() => fetchInitCart());

  provide(CART_IS_OPEN, isCartOpen);
  provide(CART_FN_ON_CLICK_CART_BTN, onClickCartBtn);
  provide(CART_FN_ON_CLICK_CLOSE_CART_BTN, onClickCloseCartBtn);

  provide(CART_DATA, cartData);
  provide(CART_ITEMS, cartItems);
  provide(CART_ITEM_QUANTITY, deliveryItemQuantity);
  provide(CART_FN_UPDATE_QUANTITY, updateItemQuantity);
  provide(CART_FN_ADD_ITEM_TO_CART, addItemToCart);

  return {
    isCartOpen,
    cartItems,
    deliveryItemQuantity,

    updateItemQuantity,
    addItemToCart,
    onClickCartBtn,
  };
}
