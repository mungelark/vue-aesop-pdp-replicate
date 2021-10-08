<template>
  <div class="panel-content-wrapper">
    <ul :class="['shop-list', isProductList && 'product-list']">
      <li
        :class="[
          'panel-list-item',
          'shop-item',
          'headline-item',
          subLayerId === 'filters.0' && 'is-selected',
        ]"
        v-if="headlineItem && category"
        :key="category.name"
      >
        <a
          :href="headlineItem.url"
          class="panel-list-link"
          @click.stop="onClickSubLayerItem(category, true)"
          @mouseover="isLargeDesktopView && onClickSubLayerItem(category, true)"
          >{{
            isProductList
              ? `${headlineItem.name} ${category.name}`
              : headlineItem.name
          }}</a
        >
      </li>
      <template v-if="!isProductList && category && category.items">
        <template v-for="item in category.items" :key="item.code">
          <li
            :class="[
              'panel-list-item',
              'shop-item',
              subLayerId === item.name && 'is-selected',
            ]"
          >
            <a
              :href="item.url"
              class="panel-list-link"
              @click.stop="onClickSubLayerItem(item)"
              @mouseover="onClickSubLayerItem(item)"
              >{{ item.name }}</a
            >
            <sup class="panel-item-num" v-if="isLargeDesktopView">{{
              item.items.length
            }}</sup>
          </li>
        </template>
      </template>
      <template v-else>
        <nav-panel-product-list
          v-if="category && category.items"
          :products="category.items.map((x) => x.items).flat()"
        />
      </template>
    </ul>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { safeInject } from "../compostables/common";
import NavPanelProductList from "./NavPanelProductList.vue";
import {
  IS_LDESKTOP_VIEW,
  NAV_FN_ON_CLICK_SUB_LAYER_ID,
  NAV_MAIN_LAYER_ID,
  NAV_SUB_LAYER_ID,
  SHOP_MENU,
} from "../symbols";
import { NSShopMenu } from "../types/shopMenu";

export default defineComponent({
  components: {
    NavPanelProductList,
  },
  setup() {
    const isLargeDesktopView = safeInject(IS_LDESKTOP_VIEW);

    const shopMenu = safeInject(SHOP_MENU);
    const mainLayerId = safeInject(NAV_MAIN_LAYER_ID);
    const subLayerId = safeInject(NAV_SUB_LAYER_ID);

    const category = computed(() =>
      shopMenu.value?.categories.find((x) => x.name === mainLayerId.value)
    );

    const headlineItem = computed(() => category.value?.filters[0]);

    const isProductList = computed(
      () => category.value?.isProductListNext === true || false
    );

    const onClickSubLayerId = safeInject(NAV_FN_ON_CLICK_SUB_LAYER_ID);
    const onClickSubLayerItem = (
      item: NSShopMenu.Item | NSShopMenu.Category | undefined,
      isCategory = false
    ) => {
      if (item === undefined) return;
      let id = undefined;
      if (isCategory) {
        id = !isProductList.value ? "filters.0" : undefined;
      } else {
        id =
          !isProductList.value && item.type === "navItemGroup"
            ? item.name
            : undefined;
      }
      onClickSubLayerId(id);
    };

    return {
      isLargeDesktopView,

      category,
      subLayerId,
      isProductList,
      headlineItem,

      onClickSubLayerItem,
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
