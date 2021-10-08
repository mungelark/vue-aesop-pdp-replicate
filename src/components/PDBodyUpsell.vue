<template>
  <div class="pd-body-upsell">
    <a :href="upsell.product.url" class="pd-upsell-link">
      <div class="pd-upsell-wrapper">
        <div class="upsell-info">
          <h4 class="upsell-title">{{ upsell.title }}</h4>
          <span class="upsell-product-name">{{ upsell.product.name }}</span>
        </div>
        <div class="upsell-image">
          <picture>
            <source
              media="(min-width: 1025px)"
              :srcset="upsell.product.image.large"
            />
            <source
              media="(min-width: 640px)"
              :srcset="upsell.product.image.medium"
            />
            <source
              media="(min-width: 0px)"
              :srcset="upsell.product.image.small"
            />
            <img loading="lazy" :alt="upsell.product.image.altText" />
          </picture>
        </div>
      </div>
    </a>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { NSProduct } from "../types/product";

export default defineComponent({
  props: {
    upsell: { type: Object as PropType<NSProduct.Upsell>, required: true },
  },
  setup(props) {
    const upsell = computed(() => props.upsell);

    return {
      upsell,
    };
  },
});
</script>

<style lang="scss" scoped>
.pd-body-upsell {
  margin-bottom: 24px;
}

.pd-upsell-link {
  display: block;
  width: 100%;
  outline: none;

  &:hover {
    .upsell-product-name {
      border-bottom: 1px solid #666;
    }
  }
}

.pd-upsell-wrapper {
  display: flex;
  justify-content: space-between;
  font-size: 14px;

  .upsell-info {
    margin-right: 20px;
  }

  .upsell-image {
    width: 130px;

    picture {
      width: 100%;
      height: auto;
      padding: 0;
      margin: 0;
      text-align: center;

      img {
        max-width: 130px;
        max-height: 90px;
        width: auto;
        height: auto;
      }
    }
  }
}

.upsell-title {
  margin-bottom: 2px;
  line-height: 1.6;
  font-family: Suisse Medium, sans-serif;
}

.upsell-product-name {
  border-bottom: 1px solid transparent;
  transition: border-bottom 0.3s cubic-bezier(0.47, 0, 0.745, 0.715);
  color: #666;
  line-height: 1.6;
}
</style>