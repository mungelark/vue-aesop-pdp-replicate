<template>
  <ul class="product-list-container">
    <template v-for="product in products" :key="product.code">
      <li class="panel-list-item product-item">
        <a :href="product.url" class="panel-list-link product-row-wrapper">
          <div class="product-row-info">
            <p class="product-row-name">{{ product.name }}</p>
            <p class="product-row-description">
              {{ product.shortDescription }}
            </p>
            <p class="product-row-details">
              {{ `${product.size} / ${product.price}` }}
            </p>
          </div>
          <div class="product-row-thumb">
            <img
              :src="`https://www.aesop.com${product.thumbnail}`"
              :alt="product.name"
            />
          </div>
        </a>
      </li>
    </template>
  </ul>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { NSShopMenu } from "../types/shopMenu";

export default defineComponent({
  props: {
    products: {
      type: Array as PropType<NSShopMenu.Item2[]>,
      required: true,
    },
  },
  setup(props) {
    const products = computed(() => props.products);

    return {
      products,
    };
  },
});
</script>

<style lang="scss" scoped>
.product-list-container {
  list-style-type: none;
  padding: 0;
  font-size: 1.4rem;
  line-height: 2.15;

  .product-item {
    margin-bottom: 25px;
    margin-right: 0;
    margin-top: 25px;

    .product-row-wrapper {
      display: flex;
      align-items: center;
      width: 100%;

      &:hover {
        border-bottom-color: transparent;

        .product-row-name {
          border-bottom-color: currentColor;
        }
      }
    }
  }
}

.product-row-info {
  display: flex;
  flex: 0 0 80%;
  flex-direction: column;
  max-width: 80%;

  .product-row-name {
    color: #333;
    font-family: Suisse Medium, sans-serif;
    line-height: 1.5;
    transition: border 0.5s ease;
    border-bottom: 1px solid transparent;
    width: fit-content;
  }

  .product-row-description {
    line-height: 1.7;
  }

  .product-row-description,
  .product-row-details {
    color: #666;
  }
}

.product-row-thumb {
  display: flex;
  flex: 0 0 20%;
  justify-content: center;
  max-width: 20%;

  img {
    display: block;
    max-height: 50px;
    max-width: 64px;
  }
}
</style>