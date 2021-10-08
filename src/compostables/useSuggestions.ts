import { onMounted, provide, Ref, ref } from "vue";
import { SUGGESTIONS } from "../symbols";
import { NSSuggestions } from "../types/suggestions";
import { APIStatus } from "./common";

export default function useSuggestions() {
  async function fetchSuggestions() {
    status.value = APIStatus.RUNNING;
    try {
      const res = await fetch("./data/suggestions.json");
      if (!res.ok) {
        status.value = APIStatus.ERROR;
      }
      const json = await res.json();
      status.value = APIStatus.SUCCESS;
      suggestions.value = json.data.suggestions;
    } catch (err) {
      status.value = APIStatus.ERROR;
      throw new Error(String(err));
    }
  }

  const status = ref(APIStatus.IDLE);
  const suggestions: Ref<NSSuggestions.Suggestions | undefined> =
    ref(undefined);

  onMounted(() => fetchSuggestions());

  provide(SUGGESTIONS, suggestions);

  return {
    status,
    suggestions,
  };
}
