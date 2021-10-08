<template>
  <div class="panel-content-wrapper">
    <ul class="read-list">
      <li
        class="panel-list-item read-item content-hub-link"
        v-if="category.readMoreText"
      >
        <a :href="category.url" class="panel-list-link">{{
          category.readMoreText
        }}</a>
      </li>
      <li
        class="panel-list-item read-item content-hub-subtitle"
        v-if="category.subtitle"
      >
        {{ category.subtitle }}
      </li>
      <template v-for="item in category.items" :key="item.title">
        <li
          :class="[
            'panel-list-item',
            'read-item',
            subLayerId === item.title && 'is-selected',
          ]"
        >
          <a
            :href="item.url"
            class="panel-list-link"
            @click.prevent.stop="onClickSubLayerItem(item)"
            @mouseover="onClickSubLayerItem(item)"
            >{{ item.title }}
            <p class="link-subtitle" v-if="item.readingTime">
              {{ item.readingTime }}
            </p></a
          >
        </li>
      </template>
    </ul>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { safeInject } from "../compostables/common";
import {
  NAV_FN_ON_CLICK_SUB_LAYER_ID,
  NAV_MAIN_LAYER_ID,
  NAV_SUB_LAYER_ID,
  READ_MENU,
} from "../symbols";
import { NSReadMenu } from "../types/readMenu";

export default defineComponent({
  setup() {
    const readMenu = safeInject(READ_MENU);
    const mainLayerId = safeInject(NAV_MAIN_LAYER_ID);
    const subLayerId = safeInject(NAV_SUB_LAYER_ID);

    const category = computed(() =>
      readMenu.value?.categories.find((x) => x.name === mainLayerId.value)
    );

    const onClickSubLayerId = safeInject(NAV_FN_ON_CLICK_SUB_LAYER_ID);
    const onClickSubLayerItem = (item: NSReadMenu.Item) => {
      const id = item.detailsContent === null ? undefined : item.title;
      onClickSubLayerId(id);
    };

    return {
      category,
      subLayerId,

      onClickSubLayerItem,
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

.content-hub-link {
  font-size: 2.4rem;
  line-height: 1.56;
  margin-bottom: 70px;
}

.content-hub-subtitle {
  line-height: 2.2;
  margin-bottom: 20px;
  color: #666;
  font-size: 1.6rem;
}
</style>
