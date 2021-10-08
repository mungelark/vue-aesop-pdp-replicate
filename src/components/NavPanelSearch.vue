<template>
  <div class="panel-content-wrapper">
    <form class="search-form">
      <nav-item-input />
      <ul class="suggestion-list" v-if="suggestions">
        <li class="panel-list-item suggestion-item">
          <h5 class="suggestion-item-headline">{{ suggestionItemHeadline }}</h5>
        </li>
        <template
          v-for="suggestion in suggestions.suggestions"
          :key="suggestion.query"
        >
          <li class="panel-list-item suggestion-item">
            <a href="#" class="panel-list-link">{{ suggestion.query }}</a>
          </li>
        </template>
      </ul>
    </form>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { safeInject } from "../compostables/common";
import NavItemInput from "./NavItemInput.vue";
import { SUGGESTIONS } from "../symbols";

export default defineComponent({
  components: {
    NavItemInput,
  },
  setup() {
    const suggestions = safeInject(SUGGESTIONS);
    const isDefaultSuggestion = computed(() => suggestions.value?.query === "");

    const suggestionItemHeadline = computed(() =>
      isDefaultSuggestion.value ? "Suggested" : "Did you mean:"
    );

    return {
      suggestions,
      suggestionItemHeadline,
    };
  },
});
</script>

<style lang="scss" scoped>
.search-form {
  padding-bottom: 30px;
}

.suggestion-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
  font-size: 2.4rem;

  .suggestion-item-headline {
    line-height: 1.7;
    font-size: 1.4rem;
    color: #666;
    padding-bottom: 5px;
  }

  .panel-list-item {
    line-height: 1.2;
    padding-bottom: 10px;
  }

  .panel-list-link {
    color: #666;

    &:hover {
      color: #252525;
    }
  }
}
</style>