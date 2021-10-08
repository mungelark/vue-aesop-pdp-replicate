<template>
  <ul
    :class="['nav-list', isOpen && 'is-opened', isFocus && 'is-focused']"
    role="menubar"
  >
    <template v-if="isMainLayer">
      <template v-if="isDesktopView">
        <li class="nav-list-item">
          <a
            href="/shop/"
            :class="[
              'nav-list-link',
              'bold',
              activeNavItem === 'NAV_SHOP' && 'is-active',
            ]"
            role="menuitem"
            @click.prevent.stop="onClickNavItem('NAV_SHOP')"
            @mouseover="onOverNavItem('NAV_SHOP')"
            >Shop</a
          >
        </li>
        <li class="nav-list-item">
          <a
            href="/read/"
            :class="[
              'nav-list-link',
              'bold',
              activeNavItem === 'NAV_READ' && 'is-active',
            ]"
            role="menuitem"
            @click.prevent.stop="onClickNavItem('NAV_READ')"
            @mouseover="onOverNavItem('NAV_READ')"
            >Read</a
          >
        </li>
        <li class="nav-list-item">
          <a
            href="/visit/"
            :class="[
              'nav-list-link',
              'bold',
              activeNavItem === 'NAV_STORES' && 'is-active',
            ]"
            role="menuitem"
            @click.prevent.stop="onClickNavItem('NAV_STORES')"
            @mouseover="onOverNavItem('NAV_STORES')"
            >Stores</a
          >
        </li>
        <li class="nav-list-item">
          <a
            href="/search/"
            :class="[
              'nav-list-link',
              'bold',
              activeNavItem === 'NAV_SEARCH' && 'is-active',
            ]"
            role="menuitem"
            @click.prevent.stop="onClickNavItem('NAV_SEARCH')"
            @mouseover="onOverNavItem('NAV_SEARCH')"
            >Search</a
          >
        </li>
      </template>
      <template v-else>
        <li class="nav-list-item">
          <a href="/">
            <aesop-logo class="nav-header-logo" />
          </a>
        </li>
      </template>
    </template>
    <li class="nav-list-spacer"></li>
    <template v-if="isCartLayer">
      <li class="nav-list-item" v-if="isDesktopView">
        <a href="#" class="nav-list-link bold" role="menuitem">Login</a>
      </li>
      <li class="nav-list-item">
        <a
          href="#"
          class="nav-list-link bold"
          role="button"
          @click.prevent.stop="onClickCartBtn(true)"
          >Cart<span class="nav-cart-qty" v-if="cartQuantity">{{
            cartQuantity
          }}</span></a
        >
      </li>
    </template>
    <li class="nav-list-item no-border" v-else>
      <button class="panel-close-btn" @click.prevent.stop="onClickCloseBtn">
        <close-icon class="panel-close-btn-icon" />
      </button>
    </li>
  </ul>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { safeInject } from "../compostables/common";
import AesopLogo from "../svgs/AesopLogo.vue";
import CloseIcon from "../svgs/CloseIcon.vue";
import {
  CART_FN_ON_CLICK_CART_BTN,
  CART_ITEM_QUANTITY,
  IS_DESKTOP_VIEW,
  NAV_CURRENT_LAYER,
  NAV_FN_ON_CLICK_CLOSE_BTN,
  NAV_FN_ON_CLICK_NAV_ITEM,
  NAV_IS_OPEN,
  NAV_MAIN_ITEM_REF,
} from "../symbols";

export default defineComponent({
  components: {
    CloseIcon,
    AesopLogo,
  },
  props: {
    layer: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const isDesktopView = safeInject(IS_DESKTOP_VIEW);

    const isMainLayer = computed(() => props.layer === 1);
    const isCartLayer = computed(
      () => props.layer === 3 || (!isDesktopView.value && props.layer === 2)
    );
    const isOpen = safeInject(NAV_IS_OPEN);

    const currentLayer = safeInject(NAV_CURRENT_LAYER);
    const isFocus = computed(
      () =>
        currentLayer.value === props.layer ||
        (currentLayer.value === 3 && props.layer !== 1)
    );

    const activeNavItem = safeInject(NAV_MAIN_ITEM_REF);

    const cartQuantity = safeInject(CART_ITEM_QUANTITY);

    const onClickNavItem = safeInject(NAV_FN_ON_CLICK_NAV_ITEM);
    const onClickCloseBtn = safeInject(NAV_FN_ON_CLICK_CLOSE_BTN);

    const onClickCartBtn = safeInject(CART_FN_ON_CLICK_CART_BTN);

    const onOverNavItem = (itemRef: string) => {
      isOpen.value && onClickNavItem(itemRef);
    };

    return {
      isDesktopView,

      isOpen,
      isFocus,
      activeNavItem,
      cartQuantity,

      isMainLayer,
      isCartLayer,
      onClickNavItem,
      onClickCloseBtn,
      onClickCartBtn,
      onOverNavItem,
    };
  },
});
</script>

<style lang="scss" scoped>
.nav-list-item {
  line-height: 1.7;
  font-size: 1.4rem;
  min-height: 8px;

  &:not(:last-child) {
    margin-right: 25px;
  }

  .nav-list-link {
    &:after {
      border-bottom: 1px solid #333;
      content: "";
      display: block;
      margin-top: -3px;
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
    }

    &:hover:after,
    &.is-active:after {
      transform: scaleX(1);
    }
  }
}

.nav-list-spacer {
  flex-grow: 1;
}

.panel-close-btn {
  background: none;
  border: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 26px;
  opacity: 0;
  padding: 0;
  position: relative;
  text-indent: -99999px;
  width: 26px;

  .panel-close-btn-icon {
    fill: #333;
    height: 12px;
    width: 12px;
  }
}

.nav-list {
  &.is-opened {
    .panel-close-btn {
      transition: opacity 1s cubic-bezier(0.645, 0.045, 0.355, 1) 0.5s;
    }
  }

  &.is-focused {
    .panel-close-btn {
      opacity: 1;
      pointer-events: all;
    }
  }

  &:not(.is-focused) {
    .panel-close-btn {
      opacity: 0;
      pointer-events: none;
      transition-delay: 0s;
      transition-duration: 0s;
    }
  }
}

.nav-cart-qty {
  margin-left: 10px;
}

.nav-header-logo {
  height: 24px;
  margin: 6px 0 0;
  padding: 0;
  text-indent: -99999px;
  width: 73px;
}
</style>