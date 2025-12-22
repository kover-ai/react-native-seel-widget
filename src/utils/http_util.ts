import { SeelWidgetSDK } from '../core/SeelWidgetSDK';
import type { IEvents } from '../dto/IEvents';
import type { IQuotesRequest } from '../dto/IQuotesRequest';
import type { IQuotesResponse } from '../dto/IQuotesResponse';
import { post } from '../network/request';

export enum NetworkErrorEnum {
  InvalidURL,
  NoData,
  DecodingError,
  NetworkError,
  ServerError,
  /**
   * Configuration error
   */
  ConfigError,
  Unknown,
}

export const createQuote = (body: IQuotesRequest) => {
  const url = SeelWidgetSDK.shared.baseURL + '/v1/ecommerce/quotes';
  return post<IQuotesResponse>(url, JSON.stringify(body), {});
};

export const createEvent = (body: IEvents) => {
  const url = SeelWidgetSDK.shared.baseURL + '/v1/ecommerce/events';
  return post<IQuotesResponse>(url, JSON.stringify(body), {});
};
