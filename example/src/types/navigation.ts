import type {
  IQuotesRequest,
  IQuotesRequestLineItem,
} from '../../../src/dto/IQuotesRequest';

/**
 * Navigation parameter types for all screens
 */
export type RootStackParamList = {
  Cart: undefined;
  Products: undefined;
  Settlement: undefined;
  Checkout: {
    lineItems: IQuotesRequestLineItem[];
    request: IQuotesRequest;
    domain: 'US' | 'EU' | '';
    defaultOptedIn: boolean;
  };
  Skeleton: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
