<template>
  <nav class="pd-breadcrumbs">
    <ul class="breadcrumb-list">
      <template v-for="item in breadcrumbs" :key="item.label">
        <li class="breadcrumb-item">
          <a :href="item.url" class="breadcrumb-link">{{ item.label }}</a>
        </li>
      </template>
    </ul>
  </nav>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { NSProduct } from "../types/product";

export default defineComponent({
  props: {
    breadcrumbs: {
      type: Array as PropType<NSProduct.Breadcrumb[]>,
      required: true,
    },
  },
  setup(props) {
    const breadcrumbs = computed(() => props.breadcrumbs);

    return {
      breadcrumbs,
    };
  },
});
</script>

<style lang="scss" scoped>
.pd-breadcrumbs {
  margin-bottom: 25px;

  .breadcrumb-list {
    padding: 0;
    margin: 0;
    list-style-type: disc;
  }

  .breadcrumb-item {
    display: inline-block;
    padding: 0;

    &:not(:first-child) {
      &:before {
        display: inline-block;
        padding: 0 10px;
        content: "\2022";
        font-size: 14px;
        line-height: 1;
      }
    }
  }

  .breadcrumb-link {
    font-size: 14px;
    display: inline-block;
    position: relative;

    &:hover:after {
      transform: scaleX(1);
    }

    &:after {
      display: block;
      border-bottom: 1px solid #333;
      margin-bottom: -10px;
      content: "";
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.25s cubic-bezier(0.215, 0.61, 0.355, 1);
    }
  }
}
</style>
