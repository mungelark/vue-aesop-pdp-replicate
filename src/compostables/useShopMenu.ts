import { onMounted, provide, Ref, ref } from "vue";
import { SHOP_MENU } from "../symbols";
import { NSShopMenu } from "../types/shopMenu";
import { APIStatus } from "./common";

export default function useshopMenu() {
  async function fetchshopMenu() {
    status.value = APIStatus.RUNNING;
    try {
      const res = await fetch("./data/shopMenu.json");
      if (!res.ok) {
        status.value = APIStatus.ERROR;
      }
      const json = await res.json();
      status.value = APIStatus.SUCCESS;
      shopMenu.value = json.data.shopMenu;
    } catch (err) {
      status.value = APIStatus.ERROR;
      throw new Error(String(err));
    }
  }

  const status = ref(APIStatus.IDLE);
  const shopMenu: Ref<NSShopMenu.ShopMenu | undefined> = ref(undefined);

  onMounted(() => fetchshopMenu());

  provide(SHOP_MENU, shopMenu);

  return {
    status,
    shopMenu,
  };
}
