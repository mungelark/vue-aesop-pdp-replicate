<template>
  <div class="pd-head-image">
    <figure>
      <picture
        :class="['pd-image', isChanging && 'is-changing']"
        v-if="currentVariant"
        ><source
          media="(min-width: 1025px)"
          :srcset="currentVariant.image.large"
        />
        <source
          media="(min-width: 640px)"
          :srcset="currentVariant.image.media"
        />
        <source media="(min-width: 0px)" :srcset="currentVariant.image.small" />
        <img loading="lazy" :alt="currentVariant.image.altText" />
      </picture>
    </figure>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref, watch } from "vue";
import { NSProduct } from "../types/product";

export default defineComponent({
  props: {
    currentVariant: {
      type: Object as PropType<NSProduct.Variant>,
      required: true,
    },
  },
  setup(props) {
    const currentVariant = computed(() => props.currentVariant);
    const isChanging = ref(false);

    watch(currentVariant, () => {
      isChanging.value = true;
      setTimeout(() => (isChanging.value = false), 500);
    });

    return {
      currentVariant,
      isChanging,
    };
  },
});
</script>


<style lang="scss" scoped>
figure {
  width: 100%;
  height: 100%;
  margin: 0;
}

picture {
  width: 100%;
  height: auto;
  display: block;
  margin-right: auto;
  margin-left: auto;
  transition: opacity 0.2s linear;
  margin-bottom: 30px;

  @media (min-width: 640px) {
    margin-bottom: 50px;
  }

  @media (min-width: 1025px) {
    margin-bottom: unset;
    max-width: 440px;
  }

  &.is-changing {
    opacity: 0;
  }

  img {
    width: auto;
    max-width: 100%;
    max-height: 200px;

    @media (min-width: 640px) {
      max-height: 300px;
    }

    @media (min-width: 1025px) {
      max-height: 600px;
    }
  }
}
</style>