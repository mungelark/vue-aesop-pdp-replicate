<template>
  <div class="pd-body-details">
    <dl class="definition-list">
      <template v-for="row in details" :key="row.title">
        <dt class="definition-term">
          {{ row.title
          }}<button
            v-if="row.title === 'Key ingredients'"
            @click.prevent.stop="onOpenFlyingPanel"
          >
            <plus-with-circle
              :class="['flying-panel-trigger', isPanelOpen && 'is-opened']"
            />
          </button>
        </dt>
        <dd
          class="definition-content"
          v-html="parseDetailRowContent(row.copy)"
        ></dd>
      </template>
    </dl>
  </div>
  <flying-panel
    ref="ingredientModal"
    :panelData="flyoutPanel"
    v-if="hasFlyingPanel"
  />
</template>

<script lang="ts">
import { computed, defineComponent, PropType, Ref, ref } from "vue";
import { parseContent } from "../compostables/common";
import FlyingPanel from "./FlyingPanel.vue";
import PlusWithCircle from "../svgs/PlusWithCircle.vue";
import { NSProduct } from "../types/product";
import { NSFlyingPanel } from "../types/flyingPanel";

export default defineComponent({
  components: {
    PlusWithCircle,
    FlyingPanel,
  },
  props: {
    details: {
      type: Array as PropType<NSProduct.DetailRow[]>,
      required: true,
    },
    flyoutPanel: {
      type: Object as PropType<NSProduct.FlyoutPanel>,
    },
  },
  setup(props) {
    const details = computed(() => props.details);

    const parseDetailRowContent = (copy: NSProduct.Copy) => {
      return parseContent(copy.parsed);
    };

    const flyoutPanel = computed(() => props.flyoutPanel);
    const hasFlyingPanel = computed(() => !!flyoutPanel.value);
    const ingredientModal: Ref<NSFlyingPanel.FlyingPanelInterface | undefined> =
      ref(undefined);
    const isPanelOpen = computed(
      () => ingredientModal.value?.isShowing || false
    );
    const onOpenFlyingPanel = () => {
      ingredientModal.value && ingredientModal.value.onClickOpenBtn();
    };

    return {
      hasFlyingPanel,
      ingredientModal,
      isPanelOpen,
      flyoutPanel,

      details,
      parseDetailRowContent,
      onOpenFlyingPanel,
    };
  },
});
</script>

<style lang="scss" scoped>
.flying-panel-trigger {
  height: 22px;
  width: 22px;
  transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.definition-list {
  margin-top: 24px;
}
</style>

<style lang="scss">
.product-detail-term button:hover {
  .flying-panel-trigger {
    circle {
      fill: #333;
    }

    .icon-plus,
    .icon-close {
      fill: #fffef2;
      stroke: #fffef2;
    }
  }
}

.flying-panel-trigger.is-opened {
  circle {
    fill: #333;
  }

  .icon-plus,
  .icon-close {
    fill: #fffef2;
    stroke: #fffef2;
  }

  .icon-plus {
    opacity: 0;
  }

  .icon-close {
    opacity: 1;
  }
}
</style>
