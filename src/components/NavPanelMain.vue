<template>
  <div
    :class="['nav-panel', 'nav-main-panel', isClosing && 'is-closing']"
    @mouseover="onMouseOverMainLayer"
  >
    <a href="/" class="nav-logo">
      <aesop-logo class="nav-logo-icon" />
    </a>
    <div class="panel-content">
      <div class="panel-content-container">
        <nav-panel-search v-if="activeNavItem === 'NAV_SEARCH'" />
        <nav-panel-stores v-else-if="activeNavItem === 'NAV_STORES'" />
        <nav-panel-read v-else-if="activeNavItem === 'NAV_READ'" />
        <nav-panel-shop v-else-if="activeNavItem === 'NAV_SHOP'" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { safeInject } from "../compostables/common";
import AesopLogo from "../svgs/AesopLogo.vue";
import NavPanelSearch from "./NavPanelSearch.vue";
import NavPanelStores from "./NavPanelStores.vue";
import NavPanelRead from "./NavPanelRead.vue";
import NavPanelShop from "./NavPanelShop.vue";
import {
  NAV_NEXT_LAYER,
  NAV_MAIN_ITEM_REF,
  NAV_FN_ON_MOUSE_OVER_MAIN_LAYER,
} from "../symbols";

export default defineComponent({
  components: {
    AesopLogo,
    NavPanelSearch,
    NavPanelStores,
    NavPanelRead,
    NavPanelShop,
  },
  setup() {
    const nextLayer = safeInject(NAV_NEXT_LAYER);
    const activeNavItem = safeInject(NAV_MAIN_ITEM_REF);
    const onMouseOverMainLayer = safeInject(NAV_FN_ON_MOUSE_OVER_MAIN_LAYER);

    const isClosing = computed(() => nextLayer.value === 0);

    return {
      isClosing,
      activeNavItem,

      onMouseOverMainLayer,
    };
  },
});
</script>

<style lang="scss" scoped>
.nav-logo {
  height: 38px;
  left: 40px;
  position: absolute;
  top: 195px;
  width: 100px;
  padding-top: 5px;
  z-index: 100;
}
</style>