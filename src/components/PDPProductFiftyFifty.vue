<template>
  <section class="pdp-product-fifty-fifty" :id="sectionId">
    <div class="media-fifty-fifty-wrapper">
      <div class="media-container">
        <figure>
          <picture>
            <source
              media="(min-width: 1025px)"
              :srcset="cSection.image.large"
            />
            <source
              media="(min-width: 640px)"
              :srcset="cSection.image.medium"
            />
            <source media="(min-width: 0px)" :srcset="cSection.image.small" />
            <img loading="lazy" :alt="cSection.image.altText" />
          </picture>
        </figure>
      </div>
      <div class="content-container">
        <div class="content-wrapper">
          <header class="content-header">
            <h2 class="content-title">{{ cSection.title }}</h2>
            <h3 class="content-eyebrow">{{ cSection.eyebrow }}</h3>
          </header>
          <div class="content-body">
            <template v-if="cSection.definitionList">
              <dl class="definition-list">
                <template v-for="row in cSection.definitionList" :key="row.id">
                  <dt class="definition-term">{{ row.title }}</dt>
                  <dd class="definition-content">{{ row.copy }}</dd>
                </template>
              </dl>
            </template>
          </div>
        </div>
      </div>
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

    return {
      sectionId,
      cSection,
    };
  },
});
</script>

<style lang="scss" scoped>
.pdp-product-fifty-fifty {
  background-color: rgb(246, 245, 232);
}

.media-fifty-fifty-wrapper {
  @media (min-width: 1025px) {
    display: flex;
    min-height: 100vh;
    flex-direction: row;

    .media-container,
    .content-container {
      width: 50%;
      flex-basis: auto;
    }
  }

  .media-container,
  .content-container {
    display: flex;
  }
}

.media-container {
  figure {
    width: 100%;
    height: 100%;
    margin: 0;
  }

  picture {
    position: static;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    line-height: 0;
    display: inline-block;

    img {
      object-fit: cover;
      object-position: center;
      width: 100%;
      height: 100%;
    }
  }
}

.content-container {
  .content-wrapper {
    justify-content: space-between;
    padding: 40px 20px;

    @media (min-width: 640px) and (max-width: 1024px) {
      display: flex;
      flex-basis: auto;
      padding: 90px 34px;

      .content-header,
      .content-body {
        width: 48%;
        flex-basis: auto;
      }

      .content-body {
        margin-left: 34px;
      }
    }

    @media (min-width: 1025px) {
      width: 66.66667%;
      max-width: 780px;
      display: flex;
      flex-direction: column;
      padding: 115px 0;
      margin: auto;
    }
  }
}

.content-header {
  display: flex;
  flex-direction: column;

  .content-title {
    font-size: 25px;
    order: 2;
    line-height: 1.33;
    margin-bottom: 10px;
    font-family: Zapf Humanist, serif;
    font-weight: 300;

    @media (min-width: 640px) {
      font-size: 30px;
    }
  }

  .content-eyebrow {
    font-family: Suisse Medium, sans-serif;
    margin-bottom: 5px;
    order: 1;
    font-size: 14px;
    line-height: 1.7;
  }
}

.definition-list {
  margin-top: 10px;

  .definition-content:last-child {
    border-bottom-color: transparent;
  }
}
</style>