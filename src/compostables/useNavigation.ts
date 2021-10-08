import { provide, Ref, ref, watch } from "vue";
import {
  NAV_CURRENT_LAYER,
  NAV_FN_ON_CLICK_CLOSE_BTN,
  NAV_FN_ON_CLICK_MAIN_LAYER_ID,
  NAV_FN_ON_CLICK_NAV_ITEM,
  NAV_FN_ON_CLICK_SUB_LAYER_ID,
  NAV_FN_ON_MOUSE_OVER_MAIN_LAYER,
  NAV_IS_OPEN,
  NAV_MAIN_ITEM_REF,
  NAV_MAIN_LAYER_ID,
  NAV_NEXT_LAYER,
  NAV_SUB_LAYER_ID,
} from "../symbols";

export default function useNavigation() {
  const isNavOpen = ref(false);
  const nextLayer = ref(0);
  const currentLayer = ref(0);
  const mainItemRef: Ref<string | undefined> = ref(undefined);
  const mainLayerId: Ref<string | undefined> = ref(undefined);
  const subLayerId: Ref<string | undefined> = ref(undefined);

  const onClickNavItem = (navItemRef: string) => {
    isNavOpen.value = true;
    nextLayer.value = 1;
    currentLayer.value = 1;
    mainItemRef.value = navItemRef;
  };

  const onClickCloseBtn = () => {
    nextLayer.value = 0;
    setTimeout(() => {
      isNavOpen.value = false;
      currentLayer.value = 0;
      mainItemRef.value = undefined;
      mainLayerId.value = undefined;
      subLayerId.value = undefined;
    }, 200);
  };

  const onMouseOverMainLayer = () => {
    subLayerId.value = undefined;
    if (currentLayer.value === 3) {
      nextLayer.value = 2;
    }
  };

  const onClickMainLayerId = (id: string | undefined) => {
    mainLayerId.value = id;
    nextLayer.value = id ? 2 : 1;
  };

  const onClickSubLayerId = (id: string | undefined) => {
    subLayerId.value = id;
    nextLayer.value = id ? 3 : 2;
  };

  watch(mainItemRef, () => {
    mainLayerId.value = undefined;
  });

  watch(mainLayerId, () => {
    subLayerId.value = undefined;
  });

  watch(nextLayer, (val) => {
    setTimeout(() => {
      currentLayer.value = val;
    }, 500);
  });

  provide(NAV_IS_OPEN, isNavOpen);
  provide(NAV_NEXT_LAYER, nextLayer);
  provide(NAV_CURRENT_LAYER, currentLayer);
  provide(NAV_MAIN_ITEM_REF, mainItemRef);
  provide(NAV_MAIN_LAYER_ID, mainLayerId);
  provide(NAV_SUB_LAYER_ID, subLayerId);

  provide(NAV_FN_ON_CLICK_NAV_ITEM, onClickNavItem);
  provide(NAV_FN_ON_CLICK_CLOSE_BTN, onClickCloseBtn);
  provide(NAV_FN_ON_CLICK_MAIN_LAYER_ID, onClickMainLayerId);
  provide(NAV_FN_ON_CLICK_SUB_LAYER_ID, onClickSubLayerId);
  provide(NAV_FN_ON_MOUSE_OVER_MAIN_LAYER, onMouseOverMainLayer);

  return {
    isNavOpen,
    nextLayer,
    currentLayer,
    mainItemRef,
    mainLayerId,
    subLayerId,
  };
}
