<template>
  <div class="pdp-content-container">
    <template v-for="cSection in contentSections" :key="cSection.id">
      <p-d-p-secondary-message-item
        v-if="isSecondaryMessageItem(cSection)"
        :cSection="cSection"
      />
      <p-d-p-product-fifty-fifty
        v-if="isProductFiftyFifty(cSection)"
        :cSection="cSection"
      />
      <p-d-p-product-carousel
        v-if="isProductCarousel(cSection)"
        :cSection="cSection"
      />
    </template>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { safeInject } from "../compostables/common";
import PDPSecondaryMessageItem from "./PDPSecondaryMessageItem.vue";
import PDPProductFiftyFifty from "./PDPProductFiftyFifty.vue";
import PDPProductCarousel from "./PDPProductCarousel.vue";
import { PRODUCT_DETAILS } from "../symbols";
import { NSProductDetails } from "../types/productDetails";

export default defineComponent({
  components: {
    PDPSecondaryMessageItem,
    PDPProductFiftyFifty,
    PDPProductCarousel,
  },
  setup() {
    const productDetails = safeInject(PRODUCT_DETAILS);
    const contentSections = computed(
      () => productDetails.value?.contentSection
    );

    const isSecondaryMessageItem = (
      cSection: NSProductDetails.ContentSection
    ) => cSection.__typename === "SliceSecondaryMessageType";

    const isProductFiftyFifty = (cSection: NSProductDetails.ContentSection) =>
      cSection.__typename === "SliceProductFiftyFiftyType";

    const isProductCarousel = (cSection: NSProductDetails.ContentSection) =>
      cSection.__typename === "SliceProductCarouselType";

    return {
      contentSections,

      isSecondaryMessageItem,
      isProductFiftyFifty,
      isProductCarousel,
    };
  },
});
</script>
