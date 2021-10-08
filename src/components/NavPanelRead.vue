<template>
  <div class="panel-content-wrapper">
    <ul class="read-list" v-if="readMenu">
      <template v-for="category in readMenu.categories" :key="category.name">
        <li
          :class="[
            'panel-list-item',
            'read-item',
            mainLayerId === category.name && 'is-selected',
          ]"
        >
          <a
            :href="category.url"
            class="panel-list-link"
            @click.prevent.stop="onClickMainLayerItem(category)"
            @mouseover="onClickMainLayerItem(category)"
          >
            {{ category.name
            }}<external-link
              v-if="category.external"
              class="external-link-icon"
            />
          </a>
        </li>
      </template>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { safeInject } from "../compostables/common";
import ExternalLink from "../svgs/ExternalLink.vue";
import {
  NAV_FN_ON_CLICK_MAIN_LAYER_ID,
  NAV_MAIN_LAYER_ID,
  READ_MENU,
} from "../symbols";
import { NSReadMenu } from "../types/readMenu";

export default defineComponent({
  components: {
    ExternalLink,
  },
  setup() {
    const readMenu = safeInject(READ_MENU);
    const mainLayerId = safeInject(NAV_MAIN_LAYER_ID);

    const onClickMainLayerId = safeInject(NAV_FN_ON_CLICK_MAIN_LAYER_ID);
    const onClickMainLayerItem = (item: NSReadMenu.Category) => {
      const id = item.items && item.items.length ? item.name : undefined;
      onClickMainLayerId(id);
    };

    return {
      readMenu,
      mainLayerId,

      onClickMainLayerItem,
    };
  },
});
</script>

<style lang="scss" scoped>
.read-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
</style>
