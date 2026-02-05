import { SeelWidgetSDK } from '../core/SeelWidgetSDK';
import type { IEvents } from '../dto/IEvents';
import type { IQuotesRequest } from '../dto/IQuotesRequest';
import type { IQuotesResponse } from '../dto/IQuotesResponse';
import { post } from '../network';
import { logger } from './logger';

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
  // Validate SDK configuration
  if (!SeelWidgetSDK.shared.isConfigured) {
    logger.error(
      'SeelWidgetSDK is not configured. Call SeelWidgetSDK.shared.configure() first.'
    );
    return Promise.reject(new Error('SDK not configured'));
  }

  const url = SeelWidgetSDK.shared.baseURL + '/v1/ecommerce/quotes';

  // Log request for debugging (only in development)
  logger.debug('createQuote request:', {
    url,
    apiKey: SeelWidgetSDK.shared.apiKey
      ? '***' + SeelWidgetSDK.shared.apiKey.slice(-4)
      : 'NOT SET',
    apiVersion: SeelWidgetSDK.shared.apiVersion,
    session_id: body.session_id,
    line_items_count: body.line_items?.length ?? 0,
  });

  return post<IQuotesResponse>(url, body, {});
};

export const createEvent = (body: IEvents) => {
  // Validate SDK configuration
  if (!SeelWidgetSDK.shared.isConfigured) {
    logger.error(
      'SeelWidgetSDK is not configured. Call SeelWidgetSDK.shared.configure() first.'
    );
    return Promise.reject(new Error('SDK not configured'));
  }

  const url = SeelWidgetSDK.shared.baseURL + '/v1/ecommerce/events';
  return post<IQuotesResponse>(url, body, {});
};
