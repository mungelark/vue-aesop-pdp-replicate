<template>
  <shipping-ribbon
    v-if="srStatus === APIStatus.SUCCESS && shippingRibbon"
    :shippingRibbon="shippingRibbon"
  />
  <cart />
  <nav-bar />
  <nav-panel v-if="isNavOpen" />
  <p-d-head />
  <p-d-p />
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, provide, ref } from "vue";
import { APIStatus } from "./compostables/common";
import ShippingRibbon from "./components/ShippingRibbon.vue";
import NavBar from "./components/Navbar.vue";
import NavPanel from "./components/NavPanel.vue";
import PDHead from "./components/PDHead.vue";
import PDP from "./components/PDP.vue";
import Cart from "./components/Cart.vue";
import useShippingRibbon from "./compostables/useShippingRibbon";
import useNavigation from "./compostables/useNavigation";
import useSuggestions from "./compostables/useSuggestions";
import useReadMenu from "./compostables/useReadMenu";
import useShopMenu from "./compostables/useShopMenu";
import useProduct from "./compostables/useProduct";
import useFakeCart from "./compostables/useFakeCart";
import { IS_DESKTOP_VIEW, IS_LDESKTOP_VIEW } from "./symbols";

export default defineComponent({
  components: {
    ShippingRibbon,
    NavBar,
    NavPanel,
    PDHead,
    PDP,
    Cart,
  },
  setup() {
    // Env config
    const isDesktopView = ref(false);
    const isLargeDesktopView = ref(false);
    const onResize = () => {
      isDesktopView.value = window.innerWidth >= 640;
      isLargeDesktopView.value = window.innerWidth >= 1025;
    };
    onMounted(() => {
      onResize();
      window.addEventListener("resize", onResize);
    });
    onUnmounted(() => {
      window.removeEventListener("resize", onResize);
    });
    provide(IS_DESKTOP_VIEW, isDesktopView);
    provide(IS_LDESKTOP_VIEW, isLargeDesktopView);

    // Shipping Ribbon
    const { status: srStatus, shippingRibbon } = useShippingRibbon();

    // Navbar
    const { isNavOpen } = useNavigation();

    // NavPanel
    useSuggestions();
    useReadMenu();
    useShopMenu();
    useFakeCart();

    // PDP Head
    // PDP Content
    useProduct("SK61");

    return {
      isNavOpen,

      APIStatus,
      srStatus,
      shippingRibbon,
    };
  },
});
</script>


<style lang="scss">
@font-face {
  font-display: swap;
  font-family: Suisse Regular;
  src: url(../fonts/Suisse/SuisseIntl-Regular-WebS.woff2) format("woff2");
}

@font-face {
  font-display: swap;
  font-family: Suisse Medium;
  src: url(../fonts/Suisse/SuisseIntl-Medium-WebS.woff2) format("woff2");
}

@font-face {
  font-display: swap;
  font-family: Zapf Humanist;
  src: url(../fonts/Zapf/ZapfHumanist.woff2) format("woff2");
}

html {
  font-size: 0.625em;
  box-sizing: border-box;
  color: #333;
}

* {
  box-sizing: inherit;
}

body {
  font-size: 1.6rem;
  -webkit-font-smoothing: antialiased;
  font-family: Suisse Regular, sans-serif;
}

h1,
h2,
h3,
h4,
h5,
h6,
p {
  font-size: inherit;
  font-weight: 400;
  line-height: inherit;
  margin: 0;
  padding: 0;
}

h2,
b,
strong,
.bold {
  font-family: Suisse Medium, sans-serif;
  font-weight: 400;
}

a {
  color: inherit;
  text-decoration: none;
}

button {
  background: transparent;
  border: 0;
  border-radius: 0;
  margin: 0;
  padding: 0;
  cursor: pointer;
}

body {
  background-color: #252525;
  margin: 0;
  overflow-x: hidden;
  position: relative;
  transition: margin-top 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);

  &.no-scrolling {
    overflow: hidden;
  }
}

#app {
  background-color: #fffef2;
}

.definition-list {
  border-top: 2px solid #4a4a4a;
  margin-bottom: 14px;
  list-style: none;

  .definition-term {
    padding-top: 14px;
    line-height: 1.6;
    margin-bottom: 2px;
    font-family: Suisse Medium, sans-serif;
    font-size: 14px;
    transition-duration: 1s;
    transition-property: all;
    transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    position: relative;

    button {
      position: absolute;
      top: 14px;
      right: 0;
      outline: none;
      appearance: none;
    }
  }

  .definition-content {
    border-bottom: 1px solid #d5d4c9;
    color: #666;
    font-size: 14px;
    padding-bottom: 14px;
    line-height: 1.6;
    margin-left: 0;
  }
}

.btn {
  border: 1px solid rgba(51, 51, 51, 0.2);
  height: 60px;
  min-width: 210px;
  padding: 21px 23px;
  position: relative;
  transition: all 0.5s ease;
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes fade-out {
  0% {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}

@keyframes slide-in-right {
  0% {
    transform: translate(-15px);
  }

  to {
    backface-visibility: hidden;
    transform: translate(0);
  }
}

@keyframes slide-right-100 {
  0% {
    transform: translate(-100%);
  }

  to {
    transform: translate(0);
  }
}

@keyframes slide-left-100 {
  0% {
    transform: translate(0);
  }

  to {
    transform: translate(-100%);
  }
}
</style>