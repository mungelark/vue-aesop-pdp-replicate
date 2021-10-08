export namespace NSCart {
  export interface DeliveryCost {
    currencyIso: string;
    value: number;
    priceType: string;
    formattedValue: string;
    minQuantity?: any;
    maxQuantity?: any;
    taxRate?: any;
    taxValue?: any;
    taxDetails?: any;
  }

  export interface AvailableDeliveryMode {
    code: string;
    name: string;
    description: string;
    deliveryCost: DeliveryCost;
    isDefault: boolean;
    estimatedArrival: string;
    transportMode: string;
    deliveryId?: any;
    country?: any;
    state?: any;
    city?: any;
    zipFrom?: any;
    zipTo?: any;
    dangerous?: any;
    dea?: any;
    weightFrom?: any;
    weightTo?: any;
    defaultDeliveryMethod?: any;
    minPrice?: any;
    maxPrice?: any;
    customerGroup?: any;
    deliveryMethod: string;
    active?: any;
    minArrivalDays?: any;
    maxArrivalDays?: any;
    carrierConfig?: any;
    shippoServiceLevelTokens?: any;
    countryIso?: any;
    deliveryModeValue?: any;
    currencyIso?: any;
    nameFrench?: any;
    descriptionFrench?: any;
    warehouseCode?: any;
    expectedDeliveryLeadTime?: any;
    isThirdPartyDelivery?: any;
    carrierService?: any;
  }

  export interface BasePrice {
    currencyIso: string;
    value: number;
    priceType: string;
    formattedValue: string;
    minQuantity?: any;
    maxQuantity?: any;
    taxRate?: any;
    taxValue?: any;
    taxDetails?: any;
  }

  export interface TotalPrice {
    currencyIso: string;
    value: number;
    priceType: string;
    formattedValue: string;
    minQuantity?: any;
    maxQuantity?: any;
    taxRate?: any;
    taxValue?: any;
    taxDetails?: any;
  }

  export interface Size {
    viewport: string;
    src: string;
  }

  export interface Image {
    altText: string;
    sizes: Size[];
  }

  export interface Tracking {
    name: string;
    id: string;
    price: string;
    brand: string;
    category: string;
    variant: string;
    dimension3: string;
    dimension4: string;
    dimension5: string;
  }

  export interface Product {
    name: string;
    url: string;
    image: Image;
    type?: any;
    giftCardValue?: any;
    giftCardMessage?: any;
    recipient?: any;
    recipientEmail?: any;
    code: string;
    size: string;
    tracking: Tracking;
    isAvaliableForCNC: boolean;
  }

  export interface Entry {
    entryNumber: number;
    quantity: number;
    basePrice: BasePrice;
    totalPrice: TotalPrice;
    product: Product;
    maxQuantity: number;
  }

  export interface OrderDiscounts {
    currencyIso: string;
    value: number;
    priceType: string;
    formattedValue: string;
    minQuantity?: any;
    maxQuantity?: any;
    taxRate?: any;
    taxValue?: any;
    taxDetails?: any;
  }

  export interface ProductDiscounts {
    currencyIso: string;
    value: number;
    priceType: string;
    formattedValue: string;
    minQuantity?: any;
    maxQuantity?: any;
    taxRate?: any;
    taxValue?: any;
    taxDetails?: any;
  }

  export interface SubTotal {
    currencyIso: string;
    value: number;
    priceType: string;
    formattedValue: string;
    minQuantity?: any;
    maxQuantity?: any;
    taxRate?: any;
    taxValue?: any;
    taxDetails?: any;
  }

  export interface TotalDiscounts {
    currencyIso: string;
    value: number;
    priceType: string;
    formattedValue: string;
    minQuantity?: any;
    maxQuantity?: any;
    taxRate?: any;
    taxValue?: any;
    taxDetails?: any;
  }

  export interface TotalPrice2 {
    currencyIso: string;
    value: number;
    priceType: string;
    formattedValue: string;
    minQuantity?: any;
    maxQuantity?: any;
    taxRate?: any;
    taxValue?: any;
    taxDetails?: any;
  }

  export interface TotalPriceWithTax {
    currencyIso: string;
    value: number;
    priceType: string;
    formattedValue: string;
    minQuantity?: any;
    maxQuantity?: any;
    taxRate?: any;
    taxValue?: any;
    taxDetails?: any;
  }

  export interface TotalTax {
    currencyIso: string;
    value: number;
    priceType: string;
    formattedValue: string;
    minQuantity?: any;
    maxQuantity?: any;
    taxRate?: any;
    taxValue?: any;
    taxDetails?: any;
  }

  export interface DueTotal {
    currencyIso: string;
    value: number;
    priceType: string;
    formattedValue: string;
    minQuantity?: any;
    maxQuantity?: any;
    taxRate?: any;
    taxValue?: any;
    taxDetails?: any;
  }

  export interface Sample {
    isSelected: boolean;
    label?: any;
    description?: any;
    image?: any;
    price?: any;
    code?: any;
  }

  export interface CartData {
    appliedProductPromotions: any[];
    code: string;
    deliveryItemsQuantity: number;
    deliveryModeCode: string;
    availableDeliveryModes: AvailableDeliveryMode[];
    entries: Entry[];
    availableSampleOptions?: any;
    orderDiscounts: OrderDiscounts;
    productDiscounts: ProductDiscounts;
    subTotal: SubTotal;
    totalDiscounts: TotalDiscounts;
    totalEntries: number;
    totalItems: number;
    totalPrice: TotalPrice2;
    totalPriceWithTax: TotalPriceWithTax;
    taxes: any[];
    totalTax: TotalTax;
    totalUnitCount: number;
    isGiftOrder: boolean;
    deliveryAddress?: any;
    giftMessage: string;
    specialInstructions: string;
    addonInstructions: string;
    cncFeatureEnable: boolean;
    isCustomerLoggedIn?: any;
    isGuestCheckout?: any;
    hasAccountWithEmail?: any;
    shippingAreaMessage: string;
    shippingPromoMessage: string;
    isBillingSameAsShipping: boolean;
    dueTotal: DueTotal;
    billingAddress?: any;
    customerDetails?: any;
    payments: any[];
    sample: Sample;
    isSubscribedToNewsletter: boolean;
    message?: any;
    entriesAddedToCart?: any;
    availablePaymentMethods?: any;
    adyenMethodsResponse?: any;
    skipShippingStep: boolean;
    skipDeliveryStep: boolean;
    isClickAndCollect: boolean;
    storeDetails?: any;
    hasTaxesInCheckoutCart: boolean;
    skipShippingGiftOrderOption: boolean;
    skipShippingSpecialInstructionsOption: boolean;
    generationTime?: any;
    adyenOtherPaymentMethods?: any;
  }
}
