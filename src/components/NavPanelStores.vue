<template>
  <div class="panel-content-wrapper">
    <div class="cnc-title">
      <p>
        <span class="cnc-title-pre">Click and Collect </span>
        <span class="cnc-title-post">available at select stores</span>
      </p>
    </div>
    <form>
      <normal-button :label="'See nearby stores'" />
      <p class="visit-alter">Or search by</p>
      <nav-item-input :label="'City, State or Postcode'" />
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NormalButton from "./NormalButton.vue";
import NavItemInput from "./NavItemInput.vue";

export default defineComponent({
  components: {
    NormalButton,
    NavItemInput,
  },
  setup() {},
});
</script>


<style lang="scss" scoped>
.cnc-title {
  color: #333;
  font-size: 1.6rem;
  line-height: 1.4;
  margin: 10px 0 30px;
}

.cnc-title-post {
  font-family: Zapf Humanist, serif;
  font-size: 1.8rem;
}

.visit-alter {
  font-size: 1.3rem;
  font-weight: 700;
  margin: 30px 0 45px;
}
</style>