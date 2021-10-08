<template>
  <li class="cart-item">
    <div class="cart-item-wrapper">
      <template v-if="isDesktopView">
        <a :href="item.product.url" class="cart-item-name">{{
          item.product.name
        }}</a>
        <span class="cart-item-size">{{ item.product.size }}</span>
        <template v-if="isQtyClose">
          <button
            class="cart-item-quantity is-close"
            @click.prevent.stop="onClickQuantityBtn"
          >
            <span>{{ item.quantity }}</span>
            <arrow class="cart-quantity-icon" />
          </button>
        </template>
        <template v-else>
          <div class="cart-item-quantity is-open">
            <div class="quantity-list-wrapper">
              <ul class="quantity-list">
                <template
                  v-for="qty in item.maxQuantity"
                  :key="`${item.product.code}-q${qty}`"
                >
                  <li class="quantity-item">
                    <button
                      class="quantity-btn"
                      @click.prevent.stop="onClickUpdateQuantity(qty)"
                    >
                      {{ qty }}
                    </button>
                  </li>
                </template>
              </ul>
            </div>
          </div>
        </template>
        <div class="cart-item-remove">
          <button
            class="item-remove-btn"
            @click.prevent.stop="onClickRemoveItem"
          >
            Remove
          </button>
        </div>
        <span class="cart-item-total">{{ itemTotalPrice }}</span>
      </template>
      <template v-else>
        <div class="cart-item-content-wrapper">
          <a :href="item.product.url" class="cart-item-name">{{
            item.product.name
          }}</a>
          <template v-if="isQtyClose">
            <button
              class="cart-item-quantity is-close"
              @click.prevent.stop="onClickQuantityBtn"
            >
              <span>{{ item.quantity }}</span>
              <arrow class="cart-quantity-icon" />
            </button>
          </template>
          <template v-else>
            <div class="cart-item-quantity is-open">
              <div class="quantity-list-wrapper">
                <ul class="quantity-list">
                  <template
                    v-for="qty in item.maxQuantity"
                    :key="`${item.product.code}-q${qty}`"
                  >
                    <li class="quantity-item">
                      <button
                        class="quantity-btn"
                        @click.prevent.stop="onClickUpdateQuantity(qty)"
                      >
                        {{ qty }}
                      </button>
                    </li>
                  </template>
                </ul>
              </div>
            </div>
          </template>
        </div>
        <div class="cart-item-content-wrapper">
          <span class="cart-item-size">{{ item.product.size }}</span>
          <div class="cart-item-remove">
            <button
              class="item-remove-btn"
              @click.prevent.stop="onClickRemoveItem"
            >
              Remove
            </button>
          </div>
          <span class="cart-item-total">{{ itemTotalPrice }}</span>
        </div>
      </template>
    </div>
  </li>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from "vue";
import { safeInject } from "../compostables/common";
import Arrow from "../svgs/Arrow.vue";
import { CART_FN_UPDATE_QUANTITY, IS_DESKTOP_VIEW } from "../symbols";
import { NSCart } from "../types/cart";

export default defineComponent({
  components: { Arrow },
  props: {
    item: {
      type: Object as PropType<NSCart.Entry>,
      required: true,
    },
  },
  setup(props) {
    const isDesktopView = safeInject(IS_DESKTOP_VIEW);

    const item = computed(() => props.item);
    const isQtyClose = ref(true);

    const itemTotalPrice = computed(() => {
      return `£${(item.value.quantity * item.value.basePrice.value).toFixed(
        2
      )}`;
    });

    const onClickQuantityBtn = () => {
      isQtyClose.value = false;
    };

    const updateItemQuantity = safeInject(CART_FN_UPDATE_QUANTITY);
    const onClickUpdateQuantity = (qty: number) => {
      updateItemQuantity(item.value.product.code, qty);
      isQtyClose.value = true;
    };

    const onClickRemoveItem = () => {
      updateItemQuantity(item.value.product.code, 0);
    };

    return {
      isDesktopView,
      item,
      isQtyClose,
      itemTotalPrice,

      onClickQuantityBtn,
      onClickUpdateQuantity,
      onClickRemoveItem,
    };
  },
});
</script>

<style lang="scss" scoped>
.cart-item {
  align-items: center;
  display: flex;
  padding: 15px 0;
  border-bottom: 1px solid rgba(255, 254, 242, 0.1);

  @media (max-width: 639px) {
    padding: 30px 0;
  }

  &:hover {
    .cart-item-remove .item-remove-btn {
      opacity: 1;
    }
  }
}

.cart-item-wrapper {
  transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
  width: 100%;
  display: flex;
  align-items: center;

  @media (max-width: 639px) {
    flex-direction: column;
  }
}

.cart-item-name {
  display: flex;
  flex-basis: auto;
  width: calc(100% * 5 / 12);
  flex-shrink: 0;
  flex-wrap: wrap;
  font-size: 1.6rem;
  padding-right: 20px;
}

.cart-item-name,
.cart-item-remove .item-remove-btn {
  font-family: Suisse Medium, sans-serif;
}

.cart-item-size,
.cart-item-quantity,
.cart-item-remove,
.cart-item-total {
  font-family: Suisse Regular, sans-serif;
}

.cart-item-size,
.cart-item-remove .item-remove-btn {
  color: #bcbbb4;
}

@media (min-width: 640px) {
  .cart-item-size {
    font-size: 1.6rem;
    width: 25%;
  }

  .cart-item-remove {
    flex-grow: 1;
    font-size: 1.2rem;

    .item-remove-btn {
      font-size: 1.4rem;
      margin: 10px 0;
      opacity: 0;
      transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);

      &:hover {
        color: #fffef2;
      }
    }
  }
}

.cart-item-quantity {
  margin-right: 30px;
  color: #fff;
  font-size: 1.4rem;
  height: 40px;
  position: relative;
  width: 70px;

  &.is-close {
    border: 1px solid rgba(255, 254, 242, 0.1);
    padding: 10px 36px 10px 19px;

    .cart-quantity-icon {
      fill: #fff;
      height: 10px;
      position: absolute;
      right: 15px;
      top: 15px;
      width: 10px;
    }
  }

  .quantity-list-wrapper {
    height: 190px;
    overflow: hidden;
    position: relative;
    width: 70px;

    .quantity-list {
      list-style: none;
      margin: 0;
      padding: 0;
      background: #fff;
      height: 190px;
      left: 0;
      overflow-y: scroll;
      position: absolute;
      top: 0;
      width: 86px;
      z-index: 1000;
    }

    .quantity-item {
      &:hover,
      &.is-active {
        background-color: #f6f5e8;
      }

      .quantity-btn {
        color: #333;
        font-size: 1.4rem;
        padding: 10px 36px 10px 19px;
        width: 70px;
        font-family: Suisse Regular, sans-serif;
      }
    }
  }
}

.cart-item-content-wrapper {
  display: flex;
  justify-content: space-between;
  width: 100%;

  &:first-child {
    margin-bottom: 15px;
  }

  &:last-child {
    align-items: center;
  }

  .cart-item-name,
  .cart-item-remove {
    flex-grow: 1;
  }

  .cart-item-quantity {
    margin-right: unset;
  }

  .cart-item-size {
    font-size: 1.2rem;
    margin-right: 20px;
  }

  .cart-item-total {
    font-size: 1.2rem;
    color: #bcbbb4;
  }
}
</style>