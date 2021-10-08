<template>
  <div class="pd-head-container">
    <section class="pd-head-wrapper">
      <div class="pd-head-content" v-if="product">
        <teleport to=".pd-head-wrapper" :disabled="isLargeDesktopView">
          <p-d-breadcrumbs :breadcrumbs="product.breadcrumbs" />
        </teleport>
        <div class="pd-body-content">
          <template v-if="isTabletView">
            <div class="pd-body-content-info">
              <header class="pd-body-header">
                <h1 class="product-name">{{ product.name }}</h1>
              </header>
              <div class="pd-body-description">
                <p class="product-description">{{ product.description }}</p>
              </div>
            </div>
            <div class="pd-body-content-body">
              <p-d-body-details
                :details="product.detailRows"
                :flyoutPanel="product.flyoutPanel"
              />
              <p-d-body-purchase
                :currentVariant="currentVariant"
                :product="product"
                @updateCurrentVariant="onUpdateCurrentVariant"
              />
              <p-d-body-upsell v-if="product.upsell" :upsell="product.upsell" />
            </div>
          </template>
          <template v-else>
            <header class="pd-body-header">
              <h1 class="product-name">{{ product.name }}</h1>
            </header>
            <div class="pd-body-description">
              <p class="product-description">{{ product.description }}</p>
            </div>
            <p-d-body-details
              :details="product.detailRows"
              :flyoutPanel="product.flyoutPanel"
            />
            <p-d-body-purchase
              :currentVariant="currentVariant"
              :product="product"
              @updateCurrentVariant="onUpdateCurrentVariant"
            />
            <p-d-body-upsell v-if="product.upsell" :upsell="product.upsell" />
          </template>
        </div>
      </div>
      <p-d-head-image v-if="currentVariant" :currentVariant="currentVariant" />
    </section>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, Ref, ref, watch } from "vue";
import { safeInject } from "../compostables/common";
import PDHeadImage from "./PDHeadImage.vue";
import PDBreadcrumbs from "./PDBreadcrumbs.vue";
import PDBodyDetails from "./PDBodyDetails.vue";
import PDBodyPurchase from "./PDBodyPurchase.vue";
import PDBodyUpsell from "./PDBodyUpsell.vue";
import { IS_DESKTOP_VIEW, IS_LDESKTOP_VIEW, PRODUCT } from "../symbols";
import { NSProduct } from "../types/product";

export default defineComponent({
  components: {
    PDHeadImage,
    PDBreadcrumbs,
    PDBodyDetails,
    PDBodyPurchase,
    PDBodyUpsell,
  },
  setup() {
    const isDesktopView = safeInject(IS_DESKTOP_VIEW);
    const isLargeDesktopView = safeInject(IS_LDESKTOP_VIEW);

    const isTabletView = computed(
      () => !isLargeDesktopView.value && isDesktopView.value
    );

    const product = safeInject(PRODUCT);
    const currentVariant: Ref<NSProduct.Variant | undefined> = ref(undefined);

    watch(
      product,
      (nProduct) => {
        if (!nProduct) return;
        currentVariant.value = nProduct?.variants.find((x) => x.sellable);
      },
      { immediate: true }
    );

    const onUpdateCurrentVariant = (payload: { sku: string }) => {
      const newVariant = product.value?.variants.find(
        (x) => x.sku === payload.sku
      );
      currentVariant.value = newVariant;
    };

    return {
      isTabletView,
      isLargeDesktopView,

      product,
      currentVariant,
      onUpdateCurrentVariant,
    };
  },
});
</script>

<style lang="scss" scoped>
.pd-head-container {
  min-height: 85vh;
  padding: 20px;
  overflow: hidden;

  @media (min-width: 640px) {
    padding: 100px 34px 40px;
  }

  @media (min-width: 1025px) {
    padding: 120px 0;
  }
}

.pd-head-wrapper {
  display: flex;
  flex-direction: column-reverse;

  > .pd-breadcrumbs {
    margin-top: 16px;

    @media (min-width: 640px) {
      margin: 20px 0 0;
      transform: translateY(-20px);
    }
  }

  @media (min-width: 1025px) {
    flex-direction: row-reverse;
  }
}

.pd-head-content {
  @media (min-width: 1025px) {
    width: calc(100% / 12 * 5);
    margin-right: calc(100% / 12);
    max-width: 470px;
  }
}

.pd-head-image {
  align-self: center;

  @media (min-width: 1025px) {
    width: calc(100% / 12 * 7);
  }
}

.pd-body-content {
  display: flex;
  flex-direction: column;
  width: 100%;

  @media (min-width: 640px) and (max-width: 1024px) {
    flex-flow: row;
  }
}

h1.product-name {
  font-size: 24px;
  line-height: 1.33;
  padding: 0;
  margin: 0 0 10px;

  @media (min-width: 1025px) {
    font-size: 30px;
    margin: 0 0 30px;
  }
}

.product-description {
  font-size: 16px;
  line-height: 1.7;
  margin: 0 0 10px;

  @media (min-width: 1025px) {
    font-size: 14px;
    line-height: 1.4;
    margin: 0;
  }
}

@media (max-width: 639px) {
  .pd-body-header,
  .pd-body-description {
    margin-bottom: 5px;
  }
}
</style>


<style lang="scss">
@media (max-width: 1024px) {
  .pd-body-purchase {
    order: 3;
  }

  .pd-body-details {
    order: 5;
  }

  .pd-body-upsell {
    order: 6;
    margin-bottom: 24px;
  }
}

@media (min-width: 640px) and (max-width: 1024px) {
  .pd-head-content {
    order: 1;
  }

  .pd-breadcrumbs {
    order: 2;
  }

  .pd-head-image {
    order: 3;
  }

  .pd-body-content-info,
  .pd-body-content-body {
    width: 50%;
    display: flex;
    flex-direction: column;
  }

  .pd-body-content-info {
    padding-right: 20px;
  }
}
</style>