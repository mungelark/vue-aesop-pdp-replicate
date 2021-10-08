<template>
  <section class="pdp-secondary-message" :id="sectionId">
    <div class="message-wrapper">
      <a :href="content.link.url" class="message-link">
        <div class="message-content">
          <h4 class="message-heading">
            <span>{{ content.heading }}</span>
          </h4>
          <p class="message-copy">{{ content.copy }}</p>
        </div>
      </a>
    </div>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { NSProductDetails } from "../types/productDetails";

export default defineComponent({
  props: {
    cSection: {
      type: Object as PropType<NSProductDetails.ContentSection>,
      required: true,
    },
  },
  setup(props) {
    const cSection = computed(() => props.cSection);

    const sectionId = computed(() => cSection.value.id);
    const content = computed(() => cSection.value.items[0]);

    return {
      sectionId,
      content,
    };
  },
});
</script>

<style lang="scss" scoped>
.pdp-secondary-message {
  padding: 24px 20px;

  @media (max-width: 639px) {
    background-color: #f3f1e4;
  }

  @media (min-width: 640px) {
    padding-bottom: 60px;
  }

  @media (min-width: 1025px) {
    padding-bottom: 100px;
  }
}

.message-wrapper {
  display: flex;
  text-align: left;
  font-size: 14px;
  line-height: 1.4;

  @media (min-width: 640px) {
    text-align: center;
    justify-content: center;
  }
}

.message-link {
  &:hover {
    .message-heading span {
      border-bottom-color: #333;
    }
  }
}

.message-content {
  @media (min-width: 640px) {
    max-width: 400px;
    margin: 0 auto;
  }
}

.message-heading {
  color: #333;
  margin-bottom: 4px;
  font-family: Suisse Medium, sans-serif;

  span {
    border-bottom: 1px solid transparent;
    transition: all 0.3s cubic-bezier(0.47, 0, 0.745, 0.715);
  }
}

.message-copy {
  color: #666;
}
</style>