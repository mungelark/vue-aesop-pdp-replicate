import { NSShippingBanner } from "./shippingBanner";

export namespace NSFlyingPanel {
  export interface FlyingPanelInterface {
    isShowing: boolean;
    onClickCloseBtn(): void;
    onClickOpenBtn(): void;
  }

  export interface FlyingPanelData {
    id: string;
    __typename: string;
    heading?: string;
    shippingLineItem?: NSShippingBanner.ShippingLineItem[];
    isIngredients?: boolean;
    copy?: object;
  }
}
