<template>
  <section class="pdp-product-carousel" :id="sectionId">
    <template v-if="!isLargeDesktopView">
      <div class="carousel-introduction">
        <h2 class="carousel-heading">{{ cSection.title }}</h2>
      </div>
    </template>
    <swiper
      :modules="modules"
      :navigation="{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }"
      :slides-per-view="1"
      :breakpoints="{
        640: {
          slidesPerView: 2,
        },
        1025: {
          slidesPerView: 3,
        },
      }"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
    >
      <div class="swiper-button-prev">
        <arrow class="prev-arrow" />
      </div>
      <div class="swiper-button-next">
        <arrow class="next-arrow" />
      </div>
      <swiper-slide v-if="isLargeDesktopView">
        <div class="slide-item-container">
          <div class="carousel-introduction">
            <h2 class="carousel-heading">{{ cSection.title }}</h2>
          </div>
        </div>
      </swiper-slide>
      <template v-for="item in items" :key="`carousel-${item.id}`">
        <swiper-slide>
          <div class="slide-item-container">
            <div class="slide-item-wrapper">
              <a :href="item.product.url" class="slide-item-link">
                <div class="slide-item-info">
                  <h5 class="slide-item-name">{{ item.product.name }}</h5>
                  <p class="slide-item-description">{{ item.byline }}</p>
                </div>
                <div class="slide-item-image">
                  <picture>
                    <source
                      media="(min-width: 1025px)"
                      :srcset="item.product.image.large"
                    />
                    <source
                      media="(min-width: 640px)"
                      :srcset="item.product.image.medium"
                    />
                    <source
                      media="(min-width: 0px)"
                      :srcset="item.product.image.small"
                    />
                    <img loading="lazy" :alt="item.product.image.altText" />
                  </picture>
                </div>
              </a>
            </div>
          </div>
        </swiper-slide>
      </template>
    </swiper>
    <div class="swiper-pagination">
      <div class="swiper-pagination-base">
        <div class="swiper-paigination-bar" :style="paginationStyles"></div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, Ref, ref } from "vue";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import Arrow from "../svgs/Arrow.vue";
import { NSProductDetails } from "../types/productDetails";
import { Swiper as SwiperInstance } from "swiper/types";

import "swiper/css";
import { safeInject } from "../compostables/common";
import { IS_DESKTOP_VIEW, IS_LDESKTOP_VIEW } from "../symbols";

export default defineComponent({
  components: {
    Swiper,
    SwiperSlide,
    Arrow,
  },
  props: {
    cSection: {
      type: Object as PropType<NSProductDetails.ContentSection>,
      required: true,
    },
  },
  setup(props) {
    const isDesktopView = safeInject(IS_DESKTOP_VIEW);
    const isLargeDesktopView = safeInject(IS_LDESKTOP_VIEW);
    const cSection = computed(() => props.cSection);

    const sectionId = computed(() => cSection.value.id);
    const items = computed(() => cSection.value.items);

    const swiperEl: Ref<SwiperInstance | undefined> = ref(undefined);
    const snapSize = ref(0);
    const snapIdx = ref(0);
    const onSwiper = (swiper: SwiperInstance) => {
      swiperEl.value = swiper;
    };

    const onSlideChange = (
      swiper: SwiperInstance & { snapGrid: number[]; snapIndex: number }
    ) => {
      snapSize.value = swiper.snapGrid.length;
      snapIdx.value = swiper.snapIndex;
    };

    const paginationStyles = computed(() => {
      const width =
        100 *
        (1 /
          (isDesktopView.value ? items.value.length + 1 : items.value.length));
      const left = snapIdx.value * width;

      return {
        width: `${width}%`,
        left: `${left}%`,
      };
    });

    return {
      isLargeDesktopView,

      sectionId,
      cSection,
      items,
      paginationStyles,

      onSwiper,
      onSlideChange,
      modules: [Navigation],
    };
  },
});
</script>

<style lang="scss" scoped>
.pdp-product-carousel {
  padding-top: 80px;
  padding-bottom: 80px;

  > .carousel-introduction {
    margin: 0 20px 60px;

    @media (min-width: 640px) {
      margin: 0 40px 100px;
    }
  }

  @media (min-width: 1025px) {
    padding-top: 150px;
    padding-bottom: 150px;
  }
}

.carousel-heading {
  font-size: 25px;
  line-height: 1.33;
  font-family: Zapf Humanist, serif;
  font-weight: 300;

  @media (min-width: 640px) {
    font-size: 30px;
  }
}

.slide-item-link {
  display: flex;
  flex-direction: column-reverse;
  text-align: center;
  transition: background-color 0.7s cubic-bezier(0.215, 0.61, 0.355, 1),
    color 0.7s cubic-bezier(0.215, 0.61, 0.355, 1);
  cursor: pointer;

  &:hover {
    .slide-item-name {
      text-decoration: underline;
    }
  }
}

.slide-item-info {
  padding: 0 20px;

  .slide-item-name {
    margin: 10px 0;
    font-family: Suisse Medium, sans-serif;
    font-size: 14px;
    line-height: 1.7;
  }

  .slide-item-description {
    font-size: 14px;
  }
}

.slide-item-image {
  margin-top: auto;

  picture {
    display: flex;
    height: 400px;
    width: 100%;
  }

  img {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
    margin: auto auto 0;
  }
}

.swiper-slide-next ~ .swiper-slide ~ .swiper-slide {
  opacity: 0;
}

.swiper-pagination-base {
  background-color: rgba(0, 0, 0, 0.2);
  margin: 0 20px 24px;
  display: flex;
  height: 2px;
  position: relative;

  @media (min-width: 640px) {
    margin: 0 40px 24px;
  }

  @media (min-width: 1025px) {
    margin: 0 80px 40px;
  }
}

.swiper-paigination-bar {
  background-color: rgba(0, 0, 0, 0.6);
  position: absolute;
  height: 2px;
  padding: 0;
  margin: 0;
  transition: left 1s cubic-bezier(0.215, 0.61, 0.355, 1);
}
</style>

.<style lang="scss">
.pdp-product-carousel .swiper {
  padding: 0 20px 20px;

  @media (min-width: 640px) {
    padding: 0 34px 20px;
  }

  @media (min-width: 1025px) {
    padding: 0 80px 48px;
  }

  &:hover {
    .swiper-button-prev:not(.swiper-button-disabled) {
      transform: translateZ(0);
    }
    .swiper-button-next:not(.swiper-button-disabled) {
      transform: translateZ(0);
    }
  }
}

.swiper-button-prev,
.swiper-button-next {
  width: 80px;
  height: 80px;
  position: absolute;
  z-index: 60;
  top: calc(50% - 80px);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #333;
  pointer-events: auto;
  transition: all 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);
}

.swiper-button-prev {
  transform: translate3d(-80px, 0, 0);
  left: 0;
}

.swiper-button-next {
  transform: translate3d(80px, 0, 0);
  right: 0;
}

.prev-arrow,
.next-arrow {
  height: 16px;
  width: 16px;
  fill: #fffef2;
}

.prev-arrow {
  transform: rotate(90deg);
}

.next-arrow {
  transform: rotate(-90deg);
}
</style>