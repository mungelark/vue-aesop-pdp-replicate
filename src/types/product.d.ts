export namespace NSProduct {
  export interface Settings {
    klarnaWidgetDataClientId: string;
    __typename: string;
  }

  export interface Tracking {
    name: string;
    type: string;
    __typename: string;
  }

  export interface Breadcrumb {
    url: string;
    label: string;
    tracking: Tracking;
    __typename: string;
  }

  export interface Data2 {}

  export interface Data3 {}

  export interface Data4 {}

  export interface Content2 {
    data: Data4;
    marks: any[];
    value: string;
    nodeType: string;
  }

  export interface Content {
    data: Data3;
    content: Content2[];
    nodeType: string;
  }

  export interface Parsed {
    data: Data2;
    content: Content[];
    nodeType: string;
  }

  export interface Copy {
    parsed: Parsed;
    __typename: string;
  }

  export interface DetailRow {
    title: string;
    copy: Copy;
    __typename: string;
  }

  export interface Data5 {}

  export interface Data6 {}

  export interface Data7 {}

  export interface Content4 {
    data: Data7;
    marks: any[];
    value: string;
    nodeType: string;
  }

  export interface Content3 {
    data: Data6;
    content: Content4[];
    nodeType: string;
  }

  export interface Parsed2 {
    data: Data5;
    content: Content3[];
    nodeType: string;
  }

  export interface Copy2 {
    parsed: Parsed2;
    __typename: string;
  }

  export interface FlyoutPanel {
    id: string;
    useFlyout: boolean;
    isIngredients: boolean;
    copy: Copy2;
    expanderRow: string;
    __typename: string;
  }

  export interface Sizes {
    xSmall?: any;
    small: string;
    medium: string;
    large: string;
    xLarge?: any;
    __typename: string;
  }

  export interface Image {
    small: string;
    medium: string;
    large: string;
    altText: string;
    sizes: Sizes;
    __typename: string;
  }

  export interface Tracking2 {
    name: string;
    id: string;
    price: string;
    brand: string;
    category: string;
    variant?: any;
    dimension3: string;
    dimension4: string;
    dimension5: string;
    __typename: string;
  }

  export interface Product2 {
    url: string;
    name: string;
    sku: string;
    image: Image;
    tracking: Tracking2;
    __typename: string;
  }

  export interface Upsell {
    title: string;
    product: Product2;
    __typename: string;
  }

  export interface Tracking3 {
    name: string;
    id: string;
    price: string;
    brand: string;
    category: string;
    variant: string;
    dimension3: string;
    dimension4: string;
    dimension5: string;
    __typename: string;
  }

  export interface Sizes2 {
    xSmall?: any;
    small: string;
    medium: string;
    large: string;
    xLarge?: any;
    __typename: string;
  }

  export interface Image2 {
    small: string;
    medium: string;
    large: string;
    altText: string;
    sizes: Sizes2;
    __typename: string;
  }

  export interface Tracking4 {
    name: string;
    id: string;
    price: string;
    brand: string;
    category: string;
    variant: string;
    dimension3: string;
    dimension4: string;
    dimension5: string;
    __typename: string;
  }

  export interface Variant {
    price: string;
    size: string;
    sellable: boolean;
    copy?: any;
    inStock: boolean;
    sku: string;
    image: Image2;
    tracking: Tracking4;
    __typename: string;
  }

  export interface Product {
    breadcrumbs: Breadcrumb[];
    customAddToCart?: any;
    customAddToCartCta?: any;
    description: string;
    detailRows: DetailRow[];
    flyoutPanel: FlyoutPanel;
    imageSize: string;
    name: string;
    sku: string;
    upsell: Upsell;
    tracking: Tracking3;
    variants: Variant[];
    isKlarnaWidgetEnabled: boolean;
    __typename: string;
  }
}
