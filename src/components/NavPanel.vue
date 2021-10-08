<template>
  <section class="nav-panel-container" @click.self.stop="onClickCloseBtn">
    <nav-panel-main />
    <nav-panel-sub v-if="currentLayer > 1" />
    <nav-panel-extra v-if="currentLayer === 3 && isLargeDesktopView" />
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { safeInject } from "../compostables/common";
import NavPanelMain from "./NavPanelMain.vue";
import NavPanelSub from "./NavPanelSub.vue";
import NavPanelExtra from "./NavPanelExtra.vue";
import {
  IS_LDESKTOP_VIEW,
  NAV_CURRENT_LAYER,
  NAV_FN_ON_CLICK_CLOSE_BTN,
} from "../symbols";

export default defineComponent({
  components: {
    NavPanelMain,
    NavPanelSub,
    NavPanelExtra,
  },
  setup() {
    const currentLayer = safeInject(NAV_CURRENT_LAYER);
    const isLargeDesktopView = safeInject(IS_LDESKTOP_VIEW);

    const onClickCloseBtn = safeInject(NAV_FN_ON_CLICK_CLOSE_BTN);

    return {
      currentLayer,
      isLargeDesktopView,

      onClickCloseBtn,
    };
  },
});
</script>

<style lang="scss" scoped>
.nav-panel-container {
  display: flex;
  height: 100%;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 500;
}
</style>

<style lang="scss">
.nav-panel {
  background-color: #fffef2;
  height: 100%;
  position: relative;
  z-index: 800;
  flex-basis: auto;
  width: 50%;

  animation: slide-right-100 1s cubic-bezier(0.32, 0.24, 0.15, 1) 1ms forwards;
  transform: translate(-100%);

  @media (min-width: 1024px) {
    width: calc(100% / 3);
  }

  &.nav-sub-panel {
    z-index: 700;
  }

  &.nav-extra-panel {
    z-index: 600;
  }

  &.is-closing {
    animation: fade-out 0.15s ease forwards, slide-left-100 0.3s ease forwards;
  }

  &:not(:last-child) {
    border-right: 1px solid #dfdfd4;
  }
}

.nav-main-panel .panel-content {
  margin-top: 250px;
  padding-bottom: 250px;
}

.nav-sub-panel {
  &:after {
    background: linear-gradient(180deg, hsla(0, 0%, 100%, 0) 50%, #fffef2);
    bottom: 0;
    content: "";
    display: block;
    height: 20%;
    left: 0;
    pointer-events: none;
    position: absolute;
    width: 100%;
  }
}

.nav-sub-panel,
.nav-extra-panel {
  .panel-content-container:not(.full-height-container) {
    padding-top: 250px;
  }
}

.nav-panel-container .panel-content {
  height: 100%;
  overflow: hidden;

  .panel-content-container {
    height: 100%;
    overflow-y: scroll;
    padding-right: 25px;
    width: calc(100% + 25px);
  }
}

.panel-full-height-content {
  display: flex;
  flex-direction: column;
  height: 100%;

  .panel-content-image {
    height: 100%;
    width: 100%;
    overflow: hidden;

    .content-image {
      display: block;
      height: 100%;
      width: 100%;
      text-align: center;

      img {
        height: 100%;
        object-fit: cover;
        object-position: 50% 100%;
        width: 100%;
        animation: fade-in 0.4s ease forwards;
        opacity: 0;
      }
    }
  }
}

.panel-content-wrapper {
  list-style-type: none;
  margin: 0;
  opacity: 1;
  transition: opacity 1s ease;
  font-size: 2.6rem;
  line-height: 1.54;
  padding: 20px 40px 40px;

  .product-list {
    &:before,
    &:after {
      content: "";
      display: block;
      left: 0;
      position: absolute;
      width: 100%;
    }

    &:before {
      background-color: #fffef2;
      height: 70px;
      top: 0;
      z-index: 1;
    }

    &:after {
      background: linear-gradient(180deg, #fffef2 0, hsla(0, 0%, 100%, 0) 50%);
      height: 20%;
      pointer-events: none;
      top: 70px;
    }
  }
}

.panel-list-item {
  &:not(:last-child) {
    margin-right: 40px;
  }
  animation: fade-in 1s ease forwards, slide-in-right 1s ease forwards;
  opacity: 0;

  &.is-selected,
  &:hover {
    .panel-list-link {
      border-color: #333;
    }
  }

  &.is-selected {
    .panel-item-num {
      opacity: 1;
    }
  }
}

@for $i from 1 through 20 {
  .panel-list-item:nth-child(#{$i}) {
    animation-delay: #{($i - 1) * 0.07 + 0.05}s;
  }
}

.panel-list-link {
  font-family: Suisse Regular, sans-serif;
  transition: border 0.5s ease;
  border-bottom: 1px solid transparent;

  .link-subtitle {
    font-size: 1.2rem;
    line-height: 1.5;
    margin-bottom: 44px;
  }

  .external-link-icon {
    display: inline-block;
    fill: #333;
    height: 12px;
    margin-bottom: 8px;
    margin-left: 8px;
    width: 12px;
  }
}

.panel-btn {
  font-size: 1.4rem;
  line-height: 1.7;
  transition: all 0.5s ease;
  background-color: #333;
  border: 0;
  color: #fffef2;
  height: 60px;
  min-height: 60px;
  padding: 0 23px;
  text-align: center;
  width: 100%;
  z-index: 900;

  &:hover {
    background-color: #000;
  }
}

.panel-item-num {
  font-size: 1.2rem;
  margin-left: 4px;
  position: relative;
  top: -3px;
  opacity: 0;
  transition: opacity 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}
</style>