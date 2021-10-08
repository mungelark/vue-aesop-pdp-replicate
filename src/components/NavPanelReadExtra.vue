<template>
  <div class="panel-full-height-content" v-if="item">
    <div class="panel-content-image">
      <picture class="content-image">
        <img
          :src="`https://www.aesop.com${item.imageUrl}`"
          :alt="item.imageAlt"
        />
      </picture>
    </div>
    <button class="panel-btn btn-filled-black">Read more</button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { NSReadMenu } from "../types/readMenu";
import { NSShopMenu } from "../types/shopMenu";

export default defineComponent({
  props: {
    item: {
      type: Object as PropType<NSReadMenu.Item | NSShopMenu.Filter>,
      required: true,
    },
  },
  setup(props) {
    const item = computed(() => props.item);

    return {
      item,
    };
  },
});
</script>
