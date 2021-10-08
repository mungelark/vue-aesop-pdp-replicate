<template>
  <div class="shipping-items">
    <div
      class="shipping-item-row"
      v-for="item in shippingRowItems"
      :key="item.id"
    >
      <div class="item-row-heading" :id="item.id">
        <p
          class="title bold"
          v-html="parseShippingRowHeadingTitle(item.heading)"
        ></p>
      </div>
      <div class="item-row-info-wrapper">
        <div
          class="item-row-info-item"
          :id="rowItem.id"
          v-for="rowItem in item.rowItem"
          :key="`${item.id}-${rowItem.id}`"
        >
          <div class="info-item-wrapper">
            <template v-if="parseShippingItemTitle(rowItem)">
              <div class="info-item-title">
                <p class="title" v-html="parseShippingItemTitle(rowItem)"></p>
              </div>
              <div class="info-item-price" v-if="rowItem.price">
                <p class="price">{{ rowItem.price }}</p>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { parseContent } from "../compostables/common";
import { NSShippingBanner } from "../types/shippingBanner";

export default defineComponent({
  props: {
    shippingRowItems: {
      type: Array as PropType<NSShippingBanner.ShippingLineItem[]>,
      required: true,
    },
  },
  setup(props) {
    const shippingRowItems = props.shippingRowItems;

    const parseShippingRowHeadingTitle = (row: NSShippingBanner.Heading) => {
      return parseContent(row.parsed);
    };

    const parseShippingItemTitle = (item: NSShippingBanner.RowItem) => {
      let html = "";
      if (item.content.__typename === "RichTextType") {
        html = parseContent(item.content.parsed);
      }
      return html;
    };

    return {
      shippingRowItems,

      parseShippingRowHeadingTitle,
      parseShippingItemTitle,
    };
  },
});
</script>

<style lang="scss" scoped>
.shipping-item-row {
  &:first-child {
    margin-top: 30px;
  }

  border-top: 1px solid rgba(51, 51, 51, 0.2);
  padding: 30px 0;

  .item-row-heading {
    margin: 0 0 17px;
    line-height: 1.4;
    font-size: 1.4rem;
    color: #333;

    @media (min-width: 640px) {
      line-height: 1.7;
    }
  }

  .item-row-info-item {
    &:not(:last-child) {
      .info-item-wrapper {
        margin-bottom: 20px;
      }
    }

    .info-item-wrapper {
      display: flex;
      justify-content: space-between;
      line-height: 1.4;
      font-size: 1.4rem;
      color: #666;
      flex-grow: 2;

      @media (min-width: 640px) {
        line-height: 1.7;
      }

      .info-item-title {
        margin-right: 40px;
        flex-grow: 2;
      }
    }
  }
}
</style>