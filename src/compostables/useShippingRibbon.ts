import { onMounted, Ref, ref } from "vue";
import { NSShippingBanner } from "../types/shippingBanner";
import { APIStatus } from "./common";

export default function useShippingRibbon() {
  async function fetchShippingRibbon() {
    status.value = APIStatus.RUNNING;
    try {
      const res = await fetch("./data/shippingRibbon.json");
      if (!res.ok) {
        status.value = APIStatus.ERROR;
      }
      const json = await res.json();
      status.value = APIStatus.SUCCESS;
      shippingRibbon.value = json.data.sectionShippingBanner;
    } catch (err) {
      status.value = APIStatus.ERROR;
      throw new Error(String(err));
    }
  }

  const status = ref(APIStatus.IDLE);
  const shippingRibbon: Ref<
    NSShippingBanner.SectionShippingBanner | undefined
  > = ref(undefined);

  onMounted(() => fetchShippingRibbon());

  return {
    status,
    shippingRibbon,
  };
}
