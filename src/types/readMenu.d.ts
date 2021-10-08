export namespace NSReadMenu {
  export interface Link {
    detailsContent?: any;
    detailsTitle?: any;
    imageUrl?: any;
    imageAlt?: any;
    subtitle?: any;
    title: string;
    type: string;
    url: string;
    __typename: string;
  }

  export interface Item {
    detailsContent: string;
    detailsTitle: string;
    imageUrl: string;
    imageAlt: string;
    subtitle?: any;
    readingTime: string;
    title: string;
    type: string;
    url: string;
    __typename: string;
  }

  export interface Category {
    external: boolean;
    type: string;
    url: string;
    name: string;
    isContentHub: boolean;
    subtitle: string;
    readMoreText: string;
    links: Link[];
    items: Item[];
    __typename: string;
  }

  export interface ReadMenu {
    categories: Category[];
    __typename: string;
  }
}
