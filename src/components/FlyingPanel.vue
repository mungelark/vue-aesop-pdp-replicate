<template>
  <aside
    :class="[
      'flying-panel',
      isShowing && 'is-visible',
      isIngredientsPanel && 'ingredients-panel',
    ]"
    role="dialog"
  >
    <div class="overlay" role="button" @click.self.stop="onClickCloseBtn"></div>
    <div class="flying-panel-wrapper">
      <button class="panel-close-btn" @click.stop.prevent="onClickCloseBtn">
        <close-icon class="panel-close-btn-icon" />
      </button>
      <section class="panel-content">
        <h2 class="panel-title">{{ panelTitle }}</h2>
        <template v-if="shippingRowItems">
          <shipping-row-items :shippingRowItems="shippingRowItems" />
        </template>
        <template v-else-if="isIngredientsPanel">
          <p
            class="ingredients"
            v-if="panelData.copy"
            v-html="parseIngredientsContent(panelData.copy)"
          ></p>
          <p class="ingredients-extra">
            {{
              `This ingredient list is subject to change. Prior to use, please refer to the product label for the most accurate information.`
            }}
          </p>
          <p class="ingredients-extra">
            {{
              `All Aesop products are vegan. We only use ingredients with a proven record of safety, efficacy and sustainability.`
            }}
          </p>
        </template>
      </section>
    </div>
  </aside>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from "vue";
import CloseIcon from "../svgs/CloseIcon.vue";
import ShippingRowItems from "./ShippingRowItems.vue";

import { NSFlyingPanel } from "../types/flyingPanel";
import { NSProduct } from "../types/product";
import { parseContent } from "../compostables/common";

export default defineComponent({
  components: {
    CloseIcon,
    ShippingRowItems,
  },
  props: {
    panelData: {
      type: Object as PropType<NSFlyingPanel.FlyingPanelData>,
      required: true,
    },
  },
  setup(props) {
    const panelData = computed(() => props.panelData);
    const isIngredientsPanel = computed(() => props.panelData.isIngredients);
    const panelTitle = computed(() =>
      isIngredientsPanel.value ? "Ingredients" : props.panelData.heading
    );
    const shippingRowItems = computed(() => props.panelData.shippingLineItem);
    const isShowing = ref(false);

    const onClickCloseBtn = () => {
      document.body.classList.remove("no-scrolling");
      isShowing.value = false;
    };

    const onClickOpenBtn = () => {
      document.body.classList.add("no-scrolling");
      isShowing.value = true;
    };

    const parseIngredientsContent = (copy: NSProduct.Copy2) => {
      return parseContent(copy.parsed);
    };

    return {
      panelData,
      panelTitle,
      shippingRowItems,
      isShowing,
      isIngredientsPanel,

      onClickCloseBtn,
      onClickOpenBtn,
      parseIngredientsContent,
    };
  },
});
</script>

<style lang="scss" scoped>
.flying-panel {
  bottom: 0;
  height: 100%;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  visibility: hidden;
  z-index: 1300;

  &.is-visible {
    visibility: visible;

    .flying-panel-wrapper {
      transform: translateX(0);
      transition: all 0.8s cubic-bezier(0.215, 0.61, 0.355, 1);
    }
  }

  .overlay {
    animation: fade-in 0.3s ease-out forwards;
    background: rgba(0, 0, 0, 0.5);
    bottom: 0;
    height: 100vh;
    left: 0;
    opacity: 0;
    position: fixed;
    right: 0;
    top: 0;
  }

  &.ingredients-panel {
    .flying-panel-wrapper {
      @media (min-width: 640px) {
        padding: 160px 40px 80px;
      }
    }
  }

  .flying-panel-wrapper {
    background-color: #f1f0e8;
    bottom: 0;
    left: 0;
    overflow-y: auto;
    position: fixed;
    top: 0;
    transform: translateX(-100%);
    transition: all 0.8s cubic-bezier(0.215, 0.61, 0.355, 1);
    width: 100%;
    padding: 60px 20px;

    @media (min-width: 640px) {
      display: flex;
      justify-content: flex-end;
      width: 50%;
      padding: 20vh 34px 60px;
    }

    @media (min-width: 1025px) {
      justify-content: center;
      width: 50%;
      padding: 199px 40px 60px;
    }
  }

  .panel-close-btn {
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 15px;
    top: 15px;
    width: 30px;

    .panel-close-btn-icon {
      fill: #333;
      height: 12px;
      width: 12px;
    }
  }

  .panel-content {
    @media (min-width: 1025px) {
      flex-basis: calc(100% / 3 * 2);
    }

    .panel-title {
      line-height: 1.4;
      font-size: 1.4rem;
      color: #333;

      @media (min-width: 640px) {
        line-height: 1.7;
      }
    }
  }

  .ingredients {
    margin-top: 17px;
  }

  .ingredients,
  .ingredients-extra {
    font-size: 1.4rem;
    color: #333;
    margin-bottom: 30px;
    white-space: pre-wrap;
    line-height: 1.4;

    @media (min-width: 640px) {
      line-height: 1.7;
    }
  }
}
</style>