import { SeelWidgetSDK } from '../core/SeelWidgetSDK';
import { logger } from '../utils';

export interface RequestHeaders {
  'X-Seel-API-Key': string;
  'X-Seel-API-Version': string;
  [key: string]: string;
}

export interface RequestOptions {
  headers?: RequestHeaders;
  timeout?: number;
}

export interface GetRequestParams {
  [key: string]: any;
}

class Request {
  defaultHeaders(): RequestHeaders {
    return {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-Seel-API-Key': SeelWidgetSDK.shared.apiKey,
      'X-Seel-API-Version': SeelWidgetSDK.shared.apiVersion,
    };
  }

  private defaultTimeout: number = SeelWidgetSDK.shared.requestTimeout;

  /**
   * Set default timeout
   */
  setDefaultTimeout(timeout: number): void {
    this.defaultTimeout = timeout;
  }

  /**
   * Build query string
   */
  private buildQueryString(params: GetRequestParams): string {
    const queryParams = new URLSearchParams();
    Object.keys(params).forEach((key) => {
      const value = params[key];
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, String(value));
      }
    });

    return queryParams.toString();
  }

  /**
   * Handle request timeout
   */
  private createTimeoutPromise(timeout: number): Promise<never> {
    return new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error(`Request timeout after ${timeout}ms`));
      }, timeout);
    });
  }

  /**
   * GET request
   * @param url Request URL
   * @param params Request parameters
   * @param options Request options (headers, timeout, etc.)
   * @returns Promise<any>
   */
  async get<T = any>(
    url: string,
    params?: GetRequestParams,
    options?: RequestOptions
  ): Promise<T> {
    try {
      // Build full URL (including query parameters)
      let fullUrl = url;
      if (params && Object.keys(params).length > 0) {
        const queryString = this.buildQueryString(params);
        fullUrl = `${url}${url.includes('?') ? '&' : '?'}${queryString}`;
      }

      // Merge request headers
      const headers = {
        ...this.defaultHeaders(),
        ...options?.headers,
      };

      // Create request configuration
      const requestOptions: RequestInit = {
        method: 'GET',
        headers,
      };

      // Handle timeout
      const timeout = options?.timeout || this.defaultTimeout;
      const timeoutPromise = this.createTimeoutPromise(timeout);

      // Send request
      const fetchPromise = fetch(fullUrl, requestOptions);

      // Use Promise.race to handle timeout
      const response = await Promise.race([fetchPromise, timeoutPromise]);

      // Check response status
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Parse response data
      const data = await response.json();
      return data as T;
    } catch (error) {
      // Unified error handling
      if (error instanceof Error) {
        throw new Error(`GET request failed: ${error.message}`);
      }
      throw new Error('GET request failed: Unknown error');
    }
  }

  /**
   * POST request
   * @param url Request URL
   * @param data Request body data
   * @param options Request options (headers, timeout, etc.)
   * @returns Promise<any>
   */
  async post<T = any>(
    url: string,
    data?: any,
    options?: RequestOptions
  ): Promise<T> {
    try {
      // Merge request headers
      const headers = {
        ...this.defaultHeaders(),
        ...options?.headers,
      };

      logger.info('headers:', headers);

      // Build request body
      let body: string | undefined;
      if (data !== undefined && data !== null) {
        // If data is already a string, use it directly
        if (typeof data === 'string') {
          body = data;
        } else {
          // Otherwise, serialize to JSON
          body = JSON.stringify(data);
        }
      }

      // Create request configuration
      const requestOptions: RequestInit = {
        method: 'POST',
        headers,
        ...(body && { body }),
      };

      // Handle timeout
      const timeout = options?.timeout || this.defaultTimeout;
      const timeoutPromise = this.createTimeoutPromise(timeout);

      // Send request
      const fetchPromise = fetch(url, requestOptions);

      // Use Promise.race to handle timeout
      const response = await Promise.race([fetchPromise, timeoutPromise]);

      // Check response status
      if (!response.ok) {
        // Try to get error details from response body
        let errorDetails = '';
        try {
          const errorBody = await response.text();
          if (errorBody) {
            errorDetails = ` - ${errorBody}`;
          }
        } catch {
          // Ignore error parsing failure
        }
        throw new Error(
          `HTTP error! status: ${response.status}${errorDetails}`
        );
      }

      // Parse response data
      const responseData = await response.json();
      return responseData as T;
    } catch (error) {
      // Unified error handling
      if (error instanceof Error) {
        logger.error('POST request failed:', error.message);
        throw new Error(`POST request failed: ${error.message}`);
      }
      throw new Error('POST request failed: Unknown error');
    }
  }
}

// Export singleton instance
export const instance = new Request();

// Export convenience methods
export const get = <T = any>(
  url: string,
  params?: GetRequestParams,
  options?: RequestOptions
): Promise<T> => {
  return instance.get<T>(url, params, options);
};

export const post = <T = any>(
  url: string,
  data?: any,
  options?: RequestOptions
): Promise<T> => {
  return instance.post<T>(url, data, options);
};
