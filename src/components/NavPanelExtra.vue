<template>
  <div :class="['nav-panel', 'nav-extra-panel', isClosing && 'is-closing']">
    <div class="panel-content">
      <div
        :class="['panel-content-container', item && 'full-height-container']"
      >
        <nav-panel-read-extra v-if="item" :item="item" />
        <nav-panel-shop-extra v-else-if="isShopLayer" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { safeInject } from "../compostables/common";
import NavPanelReadExtra from "./NavPanelReadExtra.vue";
import NavPanelShopExtra from "./NavPanelShopExtra.vue";
import {
  NAV_NEXT_LAYER,
  NAV_MAIN_ITEM_REF,
  READ_MENU,
  NAV_MAIN_LAYER_ID,
  NAV_SUB_LAYER_ID,
  SHOP_MENU,
} from "../symbols";

export default defineComponent({
  components: {
    NavPanelReadExtra,
    NavPanelShopExtra,
  },
  setup() {
    const nextLayer = safeInject(NAV_NEXT_LAYER);
    const activeNavItem = safeInject(NAV_MAIN_ITEM_REF);

    const mainLayerId = safeInject(NAV_MAIN_LAYER_ID);
    const subLayerId = safeInject(NAV_SUB_LAYER_ID);

    const isReadLayer = computed(() => activeNavItem.value === "NAV_READ");
    const readMenu = safeInject(READ_MENU);

    const isShopLayer = computed(() => activeNavItem.value === "NAV_SHOP");
    const shopMenu = safeInject(SHOP_MENU);

    const item = computed(() => {
      if (!subLayerId.value) return;
      if (isReadLayer.value)
        return readMenu.value?.categories
          .find((x) => x.name === mainLayerId.value)
          ?.items.find((x) => x.title === subLayerId.value);

      if (isShopLayer.value && subLayerId.value === "filters.0")
        return shopMenu.value?.categories.find(
          (x) => x.name === mainLayerId.value
        )?.filters[0];
    });

    const isClosing = computed(() => nextLayer.value < 3);

    return {
      isClosing,
      isReadLayer,
      isShopLayer,

      item,
    };
  },
});
</script>
