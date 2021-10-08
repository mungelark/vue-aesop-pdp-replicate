export namespace NSShopMenu {
  export interface Filter {
    type: string;
    url: string;
    name: string;
    title?: any;
    imageUrl: string;
    imageAlt: string;
    count?: any;
    __typename: string;
  }

  export interface Variant {
    isBundle: boolean;
    isDefault: boolean;
    type: string;
    url: string;
    sku: string;
    name: string;
    imageUrl: string;
    thumbnail: string;
    imageAlt: string;
    price: string;
    inStock: boolean;
    oneClickAddToCartEnabled: boolean;
    inStoreOnly: boolean;
    __typename: string;
  }

  export interface Item2 {
    __typename: string;
    type: string;
    url: string;
    name: string;
    trackingName: string;
    shortDescription: string;
    thumbnail: string;
    code: string;
    detailsLayout: string;
    price: string;
    size: string;
    imageUrl?: any;
    imageAlt?: any;
    variants: Variant[];
  }

  export interface Item {
    type: string;
    url: string;
    name: string;
    trackingName: string;
    code: string;
    imageUrl: string;
    imageAlt: string;
    items: Item2[];
    __typename: string;
  }

  export interface Category {
    type: string;
    url: string;
    name: string;
    trackingName: string;
    isGifting: boolean;
    isProductListNext: boolean;
    filters: Filter[];
    items: Item[];
    __typename: string;
  }

  export interface ShopMenu {
    additionalNavOptions: any[];
    categories: Category[];
    __typename: string;
  }
}
