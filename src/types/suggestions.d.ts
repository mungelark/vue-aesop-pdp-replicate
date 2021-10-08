export namespace NSSuggestions {
  export interface Suggestion {
    query: string;
    linkUrl?: any;
    __typename: string;
  }

  export interface Suggestions {
    query: string;
    suggestions: Suggestion[];
    __typename: string;
  }
}
