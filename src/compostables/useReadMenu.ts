import { onMounted, provide, Ref, ref } from "vue";
import { READ_MENU } from "../symbols";
import { NSReadMenu } from "../types/readMenu";
import { APIStatus } from "./common";

export default function useReadMenu() {
  async function fetchReadMenu() {
    status.value = APIStatus.RUNNING;
    try {
      const res = await fetch("./data/readMenu.json");
      if (!res.ok) {
        status.value = APIStatus.ERROR;
      }
      const json = await res.json();
      status.value = APIStatus.SUCCESS;
      readMenu.value = json.data.readMenu;
    } catch (err) {
      status.value = APIStatus.ERROR;
      throw new Error(String(err));
    }
  }

  const status = ref(APIStatus.IDLE);
  const readMenu: Ref<NSReadMenu.ReadMenu | undefined> = ref(undefined);

  onMounted(() => fetchReadMenu());

  provide(READ_MENU, readMenu);

  return {
    status,
    readMenu,
  };
}
