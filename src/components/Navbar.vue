<template>
  <nav class="nav">
    <div
      :class="[
        'nav-header',
        isNavOpen && 'nav-panel-open',
        lastScrollPos > 123 && 'is-fixed-visible',
      ]"
    >
      <div :class="['nav-alert', !isAlert && 'is-closed']" role="alert">
        <div class="nav-alert-wrapper">
          <p class="nav-alert-message">{{ alertMessage }}</p>
        </div>
      </div>
      <template
        v-for="nmLayer in isLargeDesktopView ? 3 : 2"
        :key="`nmLayer-${nmLayer}`"
      >
        <navbar-menu :layer="nmLayer" />
      </template>
      <button
        aroa-label="shopping cart"
        class="nav-border-btn"
        @click.prevent.stop="onClickOpenCartBtn"
      ></button>
    </div>
    <div
      :class="['nav-panel-overlay', isClosing && 'is-closing']"
      v-if="isNavOpen"
    ></div>
    <a href="/" class="nav-logo">
      <aesop-logo class="nav-logo-icon" />
    </a>
  </nav>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, onUnmounted, ref } from "vue";
import { safeInject } from "../compostables/common";
import {
  APP_STORE,
  CART_FN_ON_CLICK_CART_BTN,
  IS_LDESKTOP_VIEW,
  NAV_IS_OPEN,
  NAV_NEXT_LAYER,
} from "../symbols";
import NavbarMenu from "./NavbarMenu.vue";
import AesopLogo from "../svgs/AesopLogo.vue";

export default defineComponent({
  components: {
    NavbarMenu,
    AesopLogo,
  },
  setup() {
    const isLargeDesktopView = safeInject(IS_LDESKTOP_VIEW);

    const store = safeInject(APP_STORE);
    const isAlert = computed(() => !!store.state.alertMessage);
    const alertMessage = computed(() => store.state.alertMessage?.message);

    const isNavOpen = safeInject(NAV_IS_OPEN);

    const nextLayer = safeInject(NAV_NEXT_LAYER);
    const isClosing = computed(() => nextLayer.value === 0);

    const navOffsetTop = ref(0);
    const lastScrollPos = ref(0);

    const scrollHandler = () => {
      const navEl: HTMLElement = document.querySelector(".nav-header")!;
      const newScrollPos = window.scrollY;
      if (navEl.classList.contains("is-fixed-visible")) {
        if (newScrollPos < navOffsetTop.value + 3)
          navEl.classList.remove("is-fixed-visible");
        else if (newScrollPos > lastScrollPos.value) {
          navEl.classList.remove("is-fixed-visible");
          navEl.classList.add("is-fixed-hidden");
        }
      } else if (navEl?.classList.contains("is-fixed-hidden")) {
        if (newScrollPos < navOffsetTop.value + 3) {
          navEl.classList.remove("is-fixed-hidden");
        }
        if (!(newScrollPos > lastScrollPos.value)) {
          navEl.classList.remove("is-fixed-hidden");
          navEl.classList.add("is-fixed-visible");
        }
      } else {
        if (navOffsetTop.value === 0) navOffsetTop.value = navEl.offsetTop;
        if (window.scrollY > navEl.offsetTop + navEl.offsetHeight) {
          navEl.classList.add("is-fixed-hidden");
        }
      }
      lastScrollPos.value = newScrollPos;
    };

    onMounted(() => document.addEventListener("scroll", scrollHandler));
    onUnmounted(() => document.removeEventListener("scroll", scrollHandler));

    const onClickCartBtn = safeInject(CART_FN_ON_CLICK_CART_BTN);
    const onClickOpenCartBtn = () => {
      onClickCartBtn(false);
    };

    return {
      isLargeDesktopView,

      isAlert,
      alertMessage,
      lastScrollPos,

      isNavOpen,
      isClosing,

      onClickOpenCartBtn,
    };
  },
});
</script>

<style lang="scss" scoped>
.nav {
  box-shadow: inset 0 5px 0 0 #252525;
  height: 80px;
  position: relative;

  @media (min-width: 1025px) {
    animation: fade-in 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);
  }
}

.nav-header {
  display: flex;
  align-items: center;
  background-color: transparent;
  border-bottom: 1px solid transparent;
  color: #333;
  height: 80px;
  justify-content: space-between;
  overflow: hidden;
  position: relative;
  transition: background-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1),
    border 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
    color 0.1s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;
  z-index: 1100;
  padding-top: 5px;

  @media (min-width: 640px) {
    padding-top: 10px;
  }

  @media (min-width: 1025px) {
    animation: fade-in 0.3s ease forwards;
    opacity: 0;
  }

  &.is-fixed-hidden,
  &.is-fixed-visible {
    background-color: #fffef2;
    left: 0;
    position: fixed;
    transition: top 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  &.is-fixed-visible {
    border-bottom: 1px solid rgba(51, 51, 51, 0.2);
    top: 0;
  }

  &.is-fixed-hidden {
    top: -80px;

    .nav-alert {
      position: fixed;
    }
  }

  &.nav-panel-open {
    position: fixed;
    top: 0;
  }
}

.nav-alert {
  padding: 20px;
  background-color: #252525;
  color: #fffef2;
  cursor: pointer;
  left: 0;
  position: absolute;
  top: 0;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;
  z-index: 500;

  @media (min-width: 640px) {
    padding: 20px 34px;
  }

  @media (min-width: 1025px) {
    padding: 20px 40px;
  }

  &.is-closed {
    opacity: 0;
    transform: translateY(-100%);
  }

  .nav-alert-wrapper {
    display: flex;
    justify-content: flex-end;
  }

  .nav-alert-message {
    font-family: Suisse Medium, sans-serif;
    font-size: 1.4rem;
    line-height: 1.5;
  }
}

.nav-list {
  height: 100%;
  width: 50%;
  display: flex;
  list-style-type: none;
  margin: 0;
  padding-left: 20px;
  padding-right: 20px;

  flex-grow: 1;
  align-items: center;

  @media (min-width: 640px) {
    padding-left: 34px;
    padding-right: 34px;
  }

  @media (min-width: 1025px) {
    width: calc(100% / 3);
    flex-basis: auto;
    padding-left: 40px;
    padding-right: 40px;
  }
}

.nav-border-btn {
  border-top: 6px solid #252525;
  height: 15px;
  left: 0;
  position: absolute;
  top: -1px;
  width: 100%;
}

.nav-panel-overlay {
  animation: fade-in 0.3s ease-out forwards;
  background: rgba(0, 0, 0, 0.5);
  bottom: 0;
  height: 100vh;
  left: 0;
  opacity: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 500;

  &.is-closing {
    animation: fade-out 0.3s ease-in forwards;
  }
}

.nav-logo {
  height: 33px;
  left: 34px;
  top: 170px;
  width: 80px;
  position: absolute;
  padding-top: 5px;
  z-index: 100;

  @media (max-width: 639px) {
    display: none;
  }

  @media (min-width: 1025px) {
    height: 38px;
    left: 40px;
    top: 195px;
    width: 100px;
  }
}
</style>