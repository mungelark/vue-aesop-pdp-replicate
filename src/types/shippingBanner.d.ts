export namespace NSShippingBanner {
  export interface SectionShippingBanner {
    id: string;
    settings: Settings;
    bannerContent: BannerContent;
    slideoutPanel: SlideoutPanel;
    __typename: string;
  }

  export interface SlideoutPanel {
    id: string;
    heading: string;
    shippingLineItem: ShippingLineItem[];
    __typename: string;
  }

  export interface Settings {
    id: string;
    enabled: boolean;
    bannerClosable: boolean;
    enableSlideoutPanel: boolean;
    __typename: string;
  }

  export interface BannerContent {
    id: string;
    desktopCopy: string;
    mobileCopy: string;
    cta?: any;
    __typename: string;
  }

  export interface Data2 {}

  export interface Data3 {}

  export interface Data4 {
    uri: string;
  }

  export interface Mark {
    type: string;
  }

  export interface Data5 {}

  export interface Mark2 {
    type: string;
  }

  export interface Content3 {
    data: Data5;
    marks: Mark2[];
    value: string;
    nodeType: string;
  }

  export interface Content2 {
    data: Data4;
    marks: Mark[];
    value: string;
    nodeType: string;
    content: Content3[];
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

  export interface Heading {
    parsed: Parsed;
    __typename: string;
  }

  export interface Data6 {}

  export interface Data7 {
    uri: string;
  }

  export interface Data8 {}

  export interface Content7 {
    nodeType: string;
    value: string;
    marks: any[];
    data: Data8;
  }

  export interface Content6 {
    nodeType: string;
    value: string;
    marks: any[];
    data: Data7;
    content: Content7[];
  }

  export interface Data9 {}

  export interface Content5 {
    nodeType: string;
    content: Content6[];
    data: Data9;
  }

  export interface Parsed2 {
    nodeType: string;
    data: Data6;
    content: Content5[];
  }

  export interface Content4 {
    parsed: Parsed2;
    __typename: string;
  }

  export interface RowItem {
    id: string;
    content: Content4;
    price: string;
    __typename: string;
  }

  export interface ShippingLineItem {
    id: string;
    heading: Heading;
    headingPrice?: any;
    rowItem: RowItem[];
    __typename: string;
  }
}
