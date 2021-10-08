<template>
  <div :class="['nav-panel', 'nav-sub-panel', isClosing && 'is-closing']">
    <div class="panel-content">
      <div class="panel-content-container">
        <nav-panel-read-items v-if="isReadLayer" />
        <nav-panel-shop-items v-if="isShopLayer" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { safeInject } from "../compostables/common";
import NavPanelReadItems from "./NavPanelReadItems.vue";
import { NAV_NEXT_LAYER, NAV_MAIN_ITEM_REF } from "../symbols";
import NavPanelShopItems from "./NavPanelShopItems.vue";

export default defineComponent({
  components: {
    NavPanelReadItems,
    NavPanelShopItems,
  },
  setup() {
    const nextLayer = safeInject(NAV_NEXT_LAYER);
    const activeNavItem = safeInject(NAV_MAIN_ITEM_REF);

    const isReadLayer = computed(() => activeNavItem.value === "NAV_READ");
    const isShopLayer = computed(() => activeNavItem.value === "NAV_SHOP");

    const isClosing = computed(() => nextLayer.value < 2);

    return {
      isClosing,
      isReadLayer,
      isShopLayer,
    };
  },
});
</script>
