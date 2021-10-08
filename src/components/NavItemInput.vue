<template>
  <div class="panel-item-input">
    <span class="input-wrapper">
      <label>
        <input type="text" class="text-input with-icon" />
        <span class="input-label">{{ inputLabel }}</span>
      </label>
      <button class="input-submit-btn">
        <submit-btn class="input-submit-btn-icon" />
      </button>
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SubmitBtn from "../svgs/SubmitBtn.vue";

export default defineComponent({
  components: {
    SubmitBtn,
  },
  props: {
    label: {
      type: String,
    },
  },
  setup(props) {
    const inputLabel = props.label || "";

    return {
      inputLabel,
    };
  },
});
</script>


<style lang="scss" scoped>
.panel-item-input {
  padding-bottom: 30px;

  .input-wrapper {
    animation: fade-in 1s ease forwards;
    display: block;
    opacity: 0;
    position: relative;
    width: 100%;

    label {
      display: flex;
      position: relative;
      width: 100%;

      input {
        appearance: none;
        background-color: transparent;
        border-radius: 0;
        margin: 0;
        border: solid rgba(51, 51, 51, 0.2);
        border-width: 0 0 1px;
        color: #333;
        height: 40px;
        text-overflow: ellipsis;
        transition: all 0.2s cubic-bezier(0.215, 0.61, 0.355, 1);
        width: 100%;

        &:focus {
          transition: border 0.5s ease;
          border-color: #333;
          outline: none;

          + .input-label {
            font-size: 1.4rem;
            transform: translateY(-40px);
          }
        }
      }

      .text-input {
        font-size: 2.4rem;
        line-height: 1;
        padding: 8px 0;

        &.with-icon {
          padding-right: 30px;
        }
      }

      .input-label {
        font-size: 2.4rem;
        bottom: 0;
        color: #666;
        left: 0;
        line-height: 1.75;
        pointer-events: none;
        position: absolute;
        transition: all 0.2s cubic-bezier(0.215, 0.61, 0.355, 1);
      }
    }

    .input-submit-btn {
      display: block;
      fill: #333;
      height: 30px;
      margin-top: -15px;
      padding: 8px;
      position: absolute;
      right: -8px;
      top: 50%;
      width: 30px;

      .input-submit-btn-icon {
        display: block;
        height: 14px;
        width: 14px;
      }
    }
  }
}
</style>