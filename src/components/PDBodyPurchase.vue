<template>
  <div class="pd-body-purchase">
    <template v-if="variants.length > 1">
      <h4 class="purchase-heading">Sizes</h4>
      <ul class="radio-group-wrapper pd-body-variants">
        <template v-for="variant in variants" :key="variant.sku">
          <li class="radio-group-item product-variant">
            <label :for="`pd-option-${variant.sku}`">
              <input
                type="radio"
                name="pd-variant"
                :id="`pd-option-${variant.sku}`"
                :value="variant.sku"
                v-model="currentSKU"
              />
              <span class="radio-pot"></span>
              <span class="radio-label-text">{{ variant.size }}</span>
            </label>
          </li>
        </template>
      </ul>
      <button
        class="add-to-cart-btn"
        @click.prevent.stop="onClickAddItemToCartBtn"
        :disabled="isDisabled"
      >
        <span class="add-to-cart-loading" v-show="isProcessing">
          <span class="loading-dot"></span>
          <span class="loading-dot"></span>
          <span class="loading-dot"></span>
        </span>
        <span
          :class="['add-to-cart-label', itemAddedToCart && 'is-success']"
          v-show="!isProcessing"
        >
          <span>Added to cart</span>
          <span>{{ `Add to your cart - ${currentVariant.price}` }}</span>
        </span>
      </button>
    </template>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from "vue";
import { safeInject } from "../compostables/common";
import { CART_FN_ADD_ITEM_TO_CART } from "../symbols";
import { NSProduct } from "../types/product";

export default defineComponent({
  props: {
    product: {
      type: Object as PropType<NSProduct.Product>,
      required: true,
    },
    currentVariant: {
      type: Object as PropType<NSProduct.Variant>,
      required: true,
    },
  },
  emits: {
    updateCurrentVariant: (_payload: { sku: string }) => {
      return true;
    },
  },
  setup(props, { emit }) {
    const product = computed(() => props.product);
    const variants = computed(() => product.value.variants);
    const currentVariant = computed(() => props.currentVariant);

    const itemAddedToCart = ref(false);
    const isProcessing = ref(false);
    const isDisabled = ref(false);

    const currentSKU = computed({
      get: () => currentVariant.value.sku,
      set: (newSKU) => {
        if (variants.value.find((x) => x.sku === newSKU))
          emit("updateCurrentVariant", { sku: newSKU });
      },
    });

    const onClickAddItemToCart = safeInject(CART_FN_ADD_ITEM_TO_CART);
    const onClickAddItemToCartBtn = () => {
      isProcessing.value = true;
      isDisabled.value = true;
      itemAddedToCart.value = false;
      setTimeout(() => {
        onClickAddItemToCart(product.value, currentSKU.value);
        itemAddedToCart.value = true;
        isProcessing.value = false;
        setTimeout(() => (isDisabled.value = false), 3000);
      }, 1500);
    };

    return {
      variants,
      currentVariant,
      currentSKU,
      itemAddedToCart,
      isProcessing,
      isDisabled,

      onClickAddItemToCartBtn,
    };
  },
});
</script>

<style lang="scss" scoped>
@keyframes add-to-cart-btn-slide-up {
  0% {
    transform: translateY(0);
  }

  80% {
    transform: translateY(0);
  }

  to {
    transform: translateY(-18px);
  }
}

@keyframes loading-dot-fade-in-out {
  0% {
    opacity: 0;
  }

  60% {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}

.pd-body-purchase {
  margin-bottom: 14px;
}

.purchase-heading {
  margin-bottom: 5px;
  font-size: 14px;
  line-height: 1.7;
  font-family: Suisse Medium, sans-serif;
}

.radio-group-wrapper {
  margin: 0 0 14px;
  display: flex;
  flex-wrap: wrap;
  font-size: 14px;
  line-height: 1.4;
  list-style: none;
  padding: 0;

  .radio-group-item {
    padding: 0;
    margin: 4px 25px 4px 0;

    label {
      cursor: pointer;
    }

    input {
      position: fixed;
      width: 0;
      opacity: 0;

      &:checked ~ .radio-pot:after {
        background-color: #666;
      }

      &:checked ~ .radio-label-text {
        color: #252525;
      }

      &:hover ~ .radio-pot:after {
        background-color: #8a939d;
      }
    }

    .radio-pot {
      position: relative;
      z-index: 1;
      width: 13px;
      height: 13px;
      border-width: 1px;
      border-style: solid;
      background-color: transparent;
      border-radius: 100%;
      border-color: #666;
      float: left;
      transform: translateY(3px);
      transition: border-color 0.2s cubic-bezier(0.215, 0.61, 0.355, 1);

      &:after {
        position: absolute;
        top: 3px;
        right: 3px;
        bottom: 3px;
        left: 3px;
        display: block;
        background-color: transparent;
        border-radius: 100%;
        content: "";
        transition: background-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
      }
    }

    .radio-label-text {
      padding-left: 10px;
      color: #666;
    }
  }
}

.add-to-cart-btn {
  background-color: #333;
  color: #f6f5e8;
  width: 100%;
  height: 60px;
  padding: 20px 15px;
  font-size: 14px;
  text-align: center;
  border: 0;
  transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  appearance: none;
  cursor: pointer;
  font-family: Suisse Medium, sans-serif;
  line-height: 1.4;
  outline: none;
  text-decoration: none;
  position: relative;

  &:disabled {
    background-color: #999;
    color: #fffef2;
  }

  .add-to-cart-loading {
    height: 7px;
    position: absolute;
    top: calc(50% - 3.5px);
    left: 0;
    justify-content: center;
    display: flex;
    width: 100%;
    align-items: center;
    pointer-events: none;

    .loading-dot {
      background: #fffef2;
      width: 7px;
      height: 7px;
      display: block;
      margin: 0 3px;
      border-radius: 100%;
      animation: loading-dot-fade-in-out 1s cubic-bezier(0.645, 0.045, 0.355, 1)
        infinite;

      &:first-of-type {
        animation-delay: -50ms;
      }

      &:nth-of-type(2) {
        animation-delay: 50ms;
      }

      &:nth-of-type(3) {
        animation-delay: 150ms;
      }
    }
  }

  .add-to-cart-label {
    display: block;
    overflow: hidden;
    height: 16px;
    line-height: 1;
    opacity: 1;
    transition: opacity 0.4s cubic-bezier(0.645, 0.045, 0.355, 1);

    &.is-success {
      span {
        animation: add-to-cart-btn-slide-up 2s
          cubic-bezier(0.645, 0.045, 0.355, 1) forwards;
      }
    }

    span {
      display: block;
      overflow: hidden;
      height: 18px;
      margin-right: auto;
      margin-left: auto;
      line-height: 1;
      text-overflow: ellipsis;
      transform: translateY(-18px);
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      white-space: nowrap;
    }
  }

  &:hover {
    background-color: #000;
  }
}
</style>