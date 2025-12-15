import { SeelWidgetSDK } from '../core/SeelWidgetSDK';
import type { IEvents } from '../dto/IEvents';
import type { IQuotesRequest } from '../dto/IQuotesRequest';
import type IQuotesResponse from '../dto/IQuotesResponse';
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

const defaultBaseURL: string = SeelWidgetSDK.shared.baseURL;

export const createQuote = (body: IQuotesRequest) => {
  const url = defaultBaseURL + '/v1/ecommerce/quotes';
  return post<IQuotesResponse>(url, JSON.stringify(body), {});
};

export const createEvent = (body: IEvents) => {
  const url = defaultBaseURL + '/v1/ecommerce/events';
  return post<IQuotesResponse>(url, JSON.stringify(body), {});
};
