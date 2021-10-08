export namespace NSProductDetails {
  export interface Link {
    title: string;
    url: string;
    openInNewWindow?: any;
    relativeOrAbsolute: string;
    __typename: string;
  }

  export interface Tracking {
    category: string;
    dimension3: string;
    dimension4: string;
    dimension5: string;
    id: string;
    name: string;
    price: string;
    variant: string;
    __typename: string;
  }

  export interface Tracking2 {
    category: string;
    dimension3: string;
    dimension4: string;
    dimension5: string;
    id: string;
    name: string;
    price: string;
    variant: string;
    __typename: string;
  }

  export interface Variant {
    tracking: Tracking2;
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
    id: string;
    altText: string;
    caption?: any;
    creative: string;
    large: string;
    medium: string;
    small: string;
    sizes: Sizes;
    __typename: string;
  }

  export interface Product2 {
    name: string;
    url: string;
    tracking: Tracking;
    variants: Variant[];
    image: Image;
    __typename: string;
  }

  export interface Item {
    id: string;
    copy: string;
    heading: string;
    link: Link;
    __typename: string;
    byline: string;
    product: Product2;
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
    id: string;
    altText?: any;
    caption?: any;
    creative?: any;
    large: string;
    medium: string;
    small: string;
    sizes: Sizes2;
    __typename: string;
  }

  export interface DefinitionList {
    __typename: string;
    id: string;
    title: string;
    copy: string;
  }

  export interface Sys {
    id: string;
    __typename: string;
  }

  export interface ContentSection {
    __typename: string;
    id: string;
    items: Item[];
    imageOrVideo: string;
    contentSide: string;
    containImage?: any;
    backgroundColour?: any;
    theme: string;
    image: Image2;
    video?: any;
    isVideoFullScreen?: any;
    eyebrow: string;
    title: string;
    content?: any;
    definitionList: DefinitionList[];
    sys: Sys;
    paddingTop: string;
    paddingBottom: string;
    productRecommendation?: any;
    productRecommendationRules?: any;
    cta?: any;
  }

  export interface OpenGraphImage {
    url: string;
  }

  export interface Metadata {
    title: string;
    description?: any;
    openGraphImage: OpenGraphImage;
    notCrawlable: boolean;
    __typename: string;
  }

  export interface Product3 {
    sku: string;
    __typename: string;
  }

  export interface Upsell {
    title: string;
    product: Product3;
    __typename: string;
  }

  export interface Product {
    sku: string;
    name: string;
    url: string;
    contentSection: ContentSection[];
    metadata: Metadata;
    upsell: Upsell;
    __typename: string;
  }
}
