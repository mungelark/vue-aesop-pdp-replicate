<template>
  <div class="panel-content-wrapper">
    <ul :class="['shop-list', 'product-list']" v-if="category">
      <li class="panel-list-item shop-item headline-item" :key="category.name">
        <a :href="category.url" class="panel-list-link">{{
          `See all ${category.name}`
        }}</a>
      </li>
      <nav-panel-product-list
        :products="category.items"
        :key="`pl-${category.name}`"
      />
    </ul>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { safeInject } from "../compostables/common";
import NavPanelProductList from "./NavPanelProductList.vue";
import { NAV_MAIN_LAYER_ID, NAV_SUB_LAYER_ID, SHOP_MENU } from "../symbols";

export default defineComponent({
  components: {
    NavPanelProductList,
  },
  setup() {
    const shopMenu = safeInject(SHOP_MENU);
    const mainLayerId = safeInject(NAV_MAIN_LAYER_ID);
    const subLayerId = safeInject(NAV_SUB_LAYER_ID);

    const category = computed(() =>
      shopMenu.value?.categories
        .find((x) => x.name === mainLayerId.value)
        ?.items.find((x) => x.name === subLayerId.value)
    );

    return {
      category,
    };
  },
});
</script>

<style lang="scss" scoped>
.shop-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.headline-item {
  margin-bottom: 1.5rem;
}
</style>