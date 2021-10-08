<template>
  <div class="panel-content-wrapper">
    <ul class="shop-list" v-if="shopMenu">
      <template v-for="category in shopMenu.categories" :key="category.name">
        <li
          :class="[
            'panel-list-item',
            'shop-item',
            mainLayerId === category.name && 'is-selected',
          ]"
        >
          <a
            :href="category.url"
            class="panel-list-link"
            @click.prevent.stop="onClickMainLayerItem(category)"
            @mouseover="isLargeDesktopView && onClickMainLayerItem(category)"
          >
            {{ category.name }}
          </a>
          <sup class="panel-item-num" v-if="isLargeDesktopView">{{
            getCategoryItemsNum(category)
          }}</sup>
        </li>
      </template>
    </ul>
    <ul class="bottom-list">
      <li class="panel-list-item">
        <a href="#" class="panel-list-link">Recent orders</a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { safeInject } from "../compostables/common";
import {
  IS_LDESKTOP_VIEW,
  NAV_FN_ON_CLICK_MAIN_LAYER_ID,
  NAV_MAIN_LAYER_ID,
  SHOP_MENU,
} from "../symbols";
import { NSShopMenu } from "../types/shopMenu";

export default defineComponent({
  setup() {
    const isLargeDesktopView = safeInject(IS_LDESKTOP_VIEW);

    const shopMenu = safeInject(SHOP_MENU);
    const mainLayerId = safeInject(NAV_MAIN_LAYER_ID);

    const onClickMainLayerId = safeInject(NAV_FN_ON_CLICK_MAIN_LAYER_ID);
    const onClickMainLayerItem = (item: NSShopMenu.Category) => {
      const id = item.items && item.items.length ? item.name : undefined;
      if (item.isProductListNext) location.href = item.url;
      else {
        onClickMainLayerId(id);
      }
    };

    const getCategoryItemsNum = (category: NSShopMenu.Category) => {
      return category.items.reduce(
        (sum, current) => sum + current.items.length,
        0
      );
    };

    return {
      isLargeDesktopView,

      shopMenu,
      mainLayerId,

      onClickMainLayerItem,
      getCategoryItemsNum,
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

.bottom-list {
  list-style-type: none;
  color: #575757;
  line-height: 2.15;
  padding: 80px 0 0;
  margin: 0;
  font-size: 1.4rem;
}
</style>
