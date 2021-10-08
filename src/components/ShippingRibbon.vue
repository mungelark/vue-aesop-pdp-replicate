<template>
  <section class="shipping-ribbon">
    <div :class="['shipping-banner', ...shippingBannerClasses]" role="banner">
      <template v-if="isEnabled">
        <div class="banner-content">
          <button
            v-if="isEnableSlideoutPanel"
            class="banner-content-cta"
            @click="onClickCTABtn"
          >
            <p class="banner-copy">{{ bannerCopy }}</p>
            <open-icon class="banner-content-cta-icon" />
          </button>
          <p v-else class="banner-copy">{{ bannerCopy }}</p>
        </div>
      </template>
    </div>
    <flying-panel ref="shippingModal" :panelData="slideoutPanelData" />
  </section>
</template>

<script lang="ts">
import { computed, defineComponent, inject, PropType, Ref, ref } from "vue";
import { CART_IS_OPEN, IS_DESKTOP_VIEW } from "../symbols";
import { NSShippingBanner } from "../types/shippingBanner";

import OpenIcon from "../svgs/OpenIcon.vue";
import FlyingPanel from "./FlyingPanel.vue";
import { NSFlyingPanel } from "../types/flyingPanel";
import { safeInject } from "../compostables/common";

export default defineComponent({
  components: {
    OpenIcon,
    FlyingPanel,
  },
  props: {
    shippingRibbon: {
      type: Object as PropType<NSShippingBanner.SectionShippingBanner>,
      required: true,
    },
  },
  setup(props) {
    const bannerId = computed(() => props.shippingRibbon.settings.id);
    const isEnabled = computed(() => props.shippingRibbon.settings.enabled);
    const isEnableSlideoutPanel = computed(
      () => props.shippingRibbon.settings.enableSlideoutPanel
    );
    const slideoutPanelData = computed(
      () => isEnableSlideoutPanel.value && props.shippingRibbon.slideoutPanel
    );

    const shippingModal: Ref<NSFlyingPanel.FlyingPanelInterface | undefined> =
      ref(undefined);

    const isCartOpen = safeInject(CART_IS_OPEN);

    const shippingBannerClasses = computed(() => {
      const classes = ["is-animated"];
      isCartOpen.value && classes.push("is-hidden");
      !isCartOpen.value && isEnabled.value && classes.push("is-showing");
      return classes;
    });

    const isDesktopView = inject(IS_DESKTOP_VIEW);
    if (!isDesktopView) {
      throw new Error(`Could not solve ${IS_DESKTOP_VIEW.description}`);
    }

    const bannerCopy = computed(() =>
      isDesktopView.value
        ? props.shippingRibbon.bannerContent.desktopCopy
        : props.shippingRibbon.bannerContent.mobileCopy
    );

    const onClickCTABtn = () => {
      isEnableSlideoutPanel.value &&
        shippingModal.value &&
        shippingModal.value.onClickOpenBtn();
    };

    return {
      bannerId,
      isEnabled,
      isEnableSlideoutPanel,
      shippingModal,

      bannerCopy,
      slideoutPanelData,

      shippingBannerClasses,
      onClickCTABtn,
    };
  },
});
</script>

<style lang="scss" scoped>
.shipping-ribbon {
  position: relative;
}

.shipping-banner {
  background-color: #252525;
  clear: both;
  color: #fffef2;
  top: 0;
  width: 100%;
  z-index: 500;
  padding: 0 20px;

  @media (min-width: 640px) {
    padding: 0 34px;
  }

  &.is-animated {
    transition: all 0.6s cubic-bezier(0.645, 0.045, 0.355, 1);
  }

  &.is-showing {
    height: auto;
    overflow: visible;
    padding-bottom: 8px;
    padding-top: 12px;
  }

  &.is-hidden {
    height: 0;
  }
}

.banner-content {
  display: flex;

  @media (min-width: 640px) {
    justify-content: center;
  }
}

.banner-content-cta {
  background: transparent;
  border: 0;
  border-radius: 0;
  margin: 0;
  padding: 0;
  color: inherit;
  display: flex;
  align-items: center;
  border-bottom: 1px solid transparent;
  cursor: pointer;
  justify-content: space-between;
  transition: border 0.5s ease;
  text-align: left;
  width: 100%;

  @media (min-width: 640px) {
    text-align: unset;
  }

  @media (min-width: 1025px) {
    width: auto;
  }

  &:hover {
    border-bottom: 1px solid #fff;
  }

  .banner-content-cta-icon {
    fill: #fffef2;
    height: 22px;
    margin-left: 20px;
    stroke: #fffef2;
    stroke-width: 1px;
    width: 22px;
  }
}

.banner-copy {
  font-size: 1.4rem;
  line-height: 1.5;
  font-family: Suisse Regular, sans-serif;
}
</style>
