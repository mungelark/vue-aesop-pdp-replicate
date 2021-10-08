<template>
  <section :class="['cart', !isCartOpen && 'is-hidden']">
    <div class="cart-wrapper">
      <div class="cart-items">
        <div class="cart-items-header">
          <div class="cart-header-label name-label">Cart</div>
          <div class="cart-header-label size-label" v-if="isDesktopView">
            Size
          </div>
          <div class="cart-header-label quantity-label" v-if="isDesktopView">
            Quantity
          </div>
          <button
            class="cart-header-close-btn"
            @click.prevent.stop="onClickCloseCartBtn"
          >
            <close-icon />
          </button>
        </div>
        <ul class="cart-item-list">
          <template v-for="item in cartItems" :key="item.product.code">
            <cart-item :item="item" />
          </template>
        </ul>
      </div>
      <div class="cart-summary">
        <div class="cart-summary-wrapper">
          <div class="cart-promo">
            <button class="cart-promo-btn">
              <div class="cart-promo-btn-wrapper">
                <h5 class="cart-promo-label">Apply a promotional code</h5>
                <div class="cart-promo-icon-wrapper">
                  <plus-with-circle class="cart-promo-icon" />
                </div>
              </div>
            </button>
          </div>
          <div class="cart-notice" v-if="!isDesktopView">
            <template
              v-for="(notice, idx) in cartNotices"
              :key="`cNotice-${idx}`"
            >
              <div class="cart-notice-item">{{ notice }}</div>
            </template>
          </div>
          <div class="cart-notice-item cart-summary-item cart-offer-message">
            <span>Enjoy complimentary shipping on all orders.</span>
          </div>
          <div class="cart-subtotal cart-summary-item">
            <h5 class="cart-summary-item-label">Subtotal (Tax Incl.)</h5>
            <div class="cart-summary-subtotal-amount">
              <span>{{ subTotalAmount }}</span>
            </div>
          </div>
          <div class="cart-summary-row">
            <div class="cart-notice" v-if="isDesktopView">
              <template
                v-for="(notice, idx) in cartNotices"
                :key="`cNotice-${idx}`"
              >
                <div class="cart-notice-item">{{ notice }}</div>
              </template>
            </div>
            <div class="cart-checkout-wrapper">
              <button class="btn checkout-btn"><span>Checkout</span></button>
              <div class="provider-disclaimer-wrapper">
                <ul class="company-logo-list">
                  <li class="company-logo-item"><visa /></li>
                  <li class="company-logo-item"><master-card /></li>
                  <li class="company-logo-item"><apple-pay /></li>
                  <li class="company-logo-item"><paypal /></li>
                  <li class="company-logo-item"><klarna /></li>
                  <li class="company-logo-item"><alipay /></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent, watch } from "vue";
import { safeInject } from "../compostables/common";
import CartItem from "./CartItem.vue";
import CloseIcon from "../svgs/CloseIcon.vue";
import Visa from "../svgs/Visa.vue";
import MasterCard from "../svgs/MasterCard.vue";
import ApplePay from "../svgs/ApplePay.vue";
import Paypal from "../svgs/Paypal.vue";
import Klarna from "../svgs/Klarna.vue";
import Alipay from "../svgs/Alipay.vue";
import {
  CART_DATA,
  CART_FN_ON_CLICK_CLOSE_CART_BTN,
  CART_IS_OPEN,
  CART_ITEMS,
  IS_DESKTOP_VIEW,
} from "../symbols";
import PlusWithCircle from "../svgs/PlusWithCircle.vue";

export default defineComponent({
  components: {
    CloseIcon,
    CartItem,
    PlusWithCircle,
    Visa,
    MasterCard,
    ApplePay,
    Paypal,
    Klarna,
    Alipay,
  },
  setup() {
    const isDesktopView = safeInject(IS_DESKTOP_VIEW);

    const isCartOpen = safeInject(CART_IS_OPEN);
    const cartItems = safeInject(CART_ITEMS);
    const cartData = safeInject(CART_DATA);
    const onClickCloseCartBtn = safeInject(CART_FN_ON_CLICK_CLOSE_CART_BTN);

    const cartBoundaryHandler = (e: Event) => {
      const cartSection = document.querySelector("section.cart")!;
      const inCart = e.composedPath().includes(cartSection);
      if (inCart) return;
      else onClickCloseCartBtn();
    };

    watch(isCartOpen, (isCartOpen) => {
      if (isCartOpen) {
        const cartEl: HTMLElement = document.querySelector(".cart-wrapper")!;
        document.body.style.marginTop = `${cartEl.offsetHeight}px`;
        document.addEventListener("click", cartBoundaryHandler);
      } else {
        document.body.style.removeProperty("margin-top");
        document.removeEventListener("click", cartBoundaryHandler);
      }
    });

    const subTotalAmount = computed(() => {
      const totalAmount = cartItems.value.reduce(
        (acc, x) => acc + x.quantity * x.basePrice.value,
        0
      );
      return `£${totalAmount.toFixed(2)}`;
    });

    const cartNotices = computed(() => {
      const notices = [];
      cartData.value?.shippingPromoMessage &&
        notices.push(cartData.value.shippingPromoMessage);
      cartData.value?.shippingAreaMessage &&
        notices.push(cartData.value.shippingAreaMessage);
      return notices;
    });

    return {
      isDesktopView,
      isCartOpen,
      cartItems,
      cartNotices,
      subTotalAmount,

      onClickCloseCartBtn,
    };
  },
});
</script>

<style lang="scss" scoped>
.cart {
  &.is-hidden {
    .cart-wrapper {
      transform: translateY(-100%);
      visibility: hidden;
    }
  }
}

.cart-wrapper {
  background-color: #252525;
  border-bottom: 1px solid #252525;
  color: #fffef2;
  left: 0;
  max-height: 100vh;
  overflow-y: scroll;
  padding-right: 40px;
  position: fixed;
  top: 0;
  transition: transform 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);
  width: 100vw;
  z-index: 1300;
  padding: 40px;

  @media (max-width: 639px) {
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
    padding: 20px;
  }
}

.cart-items-header {
  display: flex;
  justify-content: space-between;
  padding-bottom: 15px;
  border-bottom: 2px solid rgba(255, 254, 242, 0.1);

  @media (max-width: 639px) {
    padding: 10px 20px 15px 0;
    margin-right: -20px;
  }
}

.cart-header-label {
  font-family: Suisse Medium, sans-serif;
  color: #bcbbb4;
  flex-basis: auto;

  &.name-label {
    width: calc(100% * 5 / 12);
    flex-shrink: 0;
    font-size: 1.5rem;
    line-height: 1.2;
  }

  &.size-label,
  &.quantity-label {
    font-size: 1.4rem;
    line-height: 1.7;
  }

  &.size-label {
    width: 25%;
  }

  &.quantity-label {
    flex-grow: 1;
  }
}

.cart-header-close-btn {
  position: relative;
  top: 5px;
  fill: #999;
  height: 18px;
  padding: 0 2px;
  width: 18px;

  @media (max-width: 639px) {
    top: unset;
  }
}

.cart-item-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.cart-summary-wrapper {
  padding-top: 30px;
}

.cart-promo {
  display: flex;
  justify-content: space-between;
  padding: 0 0 25px;
  border-bottom: 1px solid rgba(255, 254, 242, 0.1);

  @media (min-width: 640px) {
    margin-left: 50%;
  }

  @media (min-width: 1025px) {
    margin-left: 66.66667%;
  }
}

.cart-promo-btn {
  width: 100%;

  &:hover {
    .cart-promo-btn-wrapper .cart-promo-label {
      color: #fffef2;
    }
  }

  .cart-promo-btn-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .cart-promo-label {
      font-size: 1.5rem;
      line-height: 1.2;
      font-family: Suisse Medium, sans-serif;
      color: #bcbbb4;
      transition: color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    }

    .cart-promo-icon {
      display: block;
      height: 22px;
      width: 22px;
    }
  }
}

.cart-summary-item {
  display: flex;
  flex-basis: auto;
  justify-content: space-between;
  font-size: 1.2rem;
  color: #bcbbb4;
  padding: 25px 0;

  @media (min-width: 640px) {
    width: 50%;
    margin-left: 50%;
    font-size: 1.4rem;

    &.cart-offer-message {
      padding: 26px 0 0;
    }
  }

  @media (min-width: 1025px) {
    width: calc(100% / 3);
    margin-left: calc(100% / 3 * 2);
    font-size: 1.5rem;
  }

  &-label {
    font-size: 1.5rem;
    line-height: 1.2;
    font-family: Suisse Medium, sans-serif;
    color: #bcbbb4;
  }
}

.cart-summary-subtotal-amount {
  color: #fffef2;
  font-size: 2.5rem;
  line-height: 1;
}

.cart-summary-row {
  display: flex;
  justify-content: space-between;
}

.cart-notice {
  padding-right: 3em;

  .cart-notice-item {
    color: #bcbbb4;

    @media (min-width: 640px) {
      font-size: 1.4rem;
    }

    @media (min-width: 1025px) {
      font-size: 1.5rem;
    }

    &:not(:last-child) {
      margin-bottom: 15px;
    }
  }
}

.checkout-btn {
  background-color: #eaeadf;
  margin-bottom: 20px;
  width: 100%;

  &:hover {
    background-color: #fffef2;
  }

  span {
    color: #212121;
    font-family: Suisse Medium, sans-serif;
    font-size: 1.4rem;
    line-height: 1.1;
    flex-shrink: 0;
    transition: color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1),
      opacity 0.7s cubic-bezier(0.645, 0.045, 0.355, 1),
      transform 0.7s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
}

@media (min-width: 640px) {
  .cart-promo,
  .cart-notice,
  .cart-checkout-wrapper {
    flex-basis: auto;
    width: 50%;
  }
}

@media (min-width: 1025px) {
  .cart-promo,
  .cart-notice,
  .cart-checkout-wrapper {
    flex-basis: auto;
    width: 33.33333%;
  }
}

@media (max-width: 639px) {
  .cart-summary {
    display: flex;
    flex: 1 0 auto;
  }

  .cart-summary-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .cart-notice {
    margin-top: auto;
    padding: 25px 0;
  }

  .cart-notice-item {
    font-size: 1.2rem;
  }

  .cart-offer-message {
    border-top: 1px solid rgba(255, 254, 242, 0.1);
    margin: 0 -20px;
    padding: 26px 20px 0;
  }

  .cart-checkout-wrapper {
    width: 100%;
  }
}
</style>

<style lang="scss">
.cart-promo-icon {
  circle {
    fill: transparent;
    stroke: #bcbbb4;
  }

  .icon-plus {
    fill: #999;
    stroke: #999;
  }
}

.cart-promo-btn:hover {
  .cart-promo-icon {
    circle {
      fill: #fffef2;
      stroke: #fffef2;
    }

    .icon-plus {
      fill: #333;
      stroke: #333;
    }
  }
}

.provider-disclaimer-wrapper {
  max-width: 100%;

  .company-logo-list {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    list-style: none;
    margin: 0 0 5px;
    color: #bcbbb4;
    padding: 0;
  }

  .company-logo-item {
    flex: 0;
    padding-right: 18px;

    svg {
      height: 10px;
      width: auto;

      path {
        fill: #bcbbb4;
      }
    }
  }
}
</style>