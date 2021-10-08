import { onMounted, provide, Ref, ref } from "vue";
import { PRODUCT, PRODUCT_DETAILS } from "../symbols";
import { NSProduct } from "../types/product";
import { NSProductDetails } from "../types/productDetails";
import { APIStatus } from "./common";

export default function useProduct(defaultSKU: string) {
  async function fetchProduct() {
    pStatus.value = APIStatus.RUNNING;
    try {
      const res = await fetch(`./data/product/${currentSKU.value}.json`);
      if (!res.ok) {
        pStatus.value = APIStatus.ERROR;
      }
      const json = await res.json();
      pStatus.value = APIStatus.SUCCESS;
      product.value = json.data.product;
    } catch (err) {
      pStatus.value = APIStatus.ERROR;
      throw new Error(String(err));
    }
  }

  async function fetchProductDetails() {
    pdStatus.value = APIStatus.RUNNING;
    try {
      const res = await fetch(
        `./data/product-details/${currentSKU.value}.json`
      );
      if (!res.ok) {
        pdStatus.value = APIStatus.ERROR;
      }
      const json = await res.json();
      pdStatus.value = APIStatus.SUCCESS;
      productDetails.value = json.data.product;
    } catch (err) {
      pdStatus.value = APIStatus.ERROR;
      throw new Error(String(err));
    }
  }

  const currentSKU = ref(defaultSKU);

  const pStatus = ref(APIStatus.IDLE);
  const product: Ref<NSProduct.Product | undefined> = ref(undefined);

  const pdStatus = ref(APIStatus.IDLE);
  const productDetails: Ref<NSProductDetails.Product | undefined> =
    ref(undefined);

  onMounted(() => {
    fetchProduct();
    fetchProductDetails();
  });

  provide(PRODUCT, product);
  provide(PRODUCT_DETAILS, productDetails);

  return {
    pStatus,
    product,

    pdStatus,
    productDetails,
  };
}
