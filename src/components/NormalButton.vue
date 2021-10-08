<template>
  <button class="btn normal-btn">
    <span class="btn-label">{{ btnLabel }}</span>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    label: String,
  },
  setup(props) {
    const btnLabel = props.label || "";

    return {
      btnLabel,
    };
  },
});
</script>

<style lang="scss" scoped>
.normal-btn {
  .btn-label {
    font-family: Suisse Medium, sans-serif;
    font-size: 1.4rem;
    line-height: 1.1;
    color: #333;
    flex-shrink: 0;
    transition: color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1),
      opacity 0.7s cubic-bezier(0.645, 0.045, 0.355, 1),
      transform 0.7s cubic-bezier(0.645, 0.045, 0.355, 1);
  }

  &:hover {
    background-color: #333;

    .btn-label {
      color: #fffef2;
    }
  }
}
</style>