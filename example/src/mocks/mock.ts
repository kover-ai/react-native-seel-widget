import type { IQuotesRequest } from 'react-native-seel-widget';

/**
 * Mock data for development and testing
 */

/**
 * Mock quote request for EU region
 */
export const mockQuoteEU: IQuotesRequest = {
  session_id: '3b87ea2a6cecdb94bae186263feb9e7f',
  type: 'debenhams-wfp',
  cart_id: '3b87ea2a6cecdb94bae186263feb9e7f',
  device_category: 'mobile',
  device_id: '1737534673',
  device_platform: 'iOS',
  extra_info: {
    shipping_fee: 10,
    total_discounts: 10.0,
    total_sales_tax: 10.0,
  },
  merchant_id: '20251217201204133696',
  is_default_on: true,
  line_items: [
    {
      quantity: 3,
      variant_id: '10013-0000-319802',
      is_final_sale: true,
      product_id: '10013-0000-319802',
      category_2: 'Decor',
      requires_shipping: true,
      product_title:
        'Williams Brand Allegro 2 Model Digital Piano w/ Accessories',
      category_1: 'Household Goods',
      line_item_id: '11111',
      price: 50,
      sales_tax: 0,
      image_urls: [
        'https://example.com/image1.jpg',
        'https://example.com/image2.jpg',
      ],
      currency: 'USD',
      variant_title:
        'Williams Brand Allegro 2 Model Digital Piano w/ Accessories',
      allocated_discounts: 0,
      final_price: 50,
      shipping_origin: {
        country: 'US',
        city: '',
        state: '',
        zipcode: '',
      },
    },
    {
      allocated_discounts: 1,
      category_1: 'Household Goods',
      category_2: 'Decor',
      currency: 'USD',
      final_price: '15.00',
      image_urls: [
        'https://example.com/image1.jpg',
        'https://example.com/image2.jpg',
      ],
      is_final_sale: true,
      line_item_id: '22222',
      price: 10,
      product_id: '10013-0000-319803',
      product_title: 'Williams Brand Allegro 2',
      quantity: 3,
      requires_shipping: true,
      sales_tax: 6,
      shipping_origin: {
        country: 'US',
        city: '',
        state: '',
        zipcode: '',
      },
      variant_id: '10013-0000-319803',
      variant_title: 'Williams Brand Allegro 2',
    },
  ],
  customer: {
    customer_id: '1111',
    email: 'xie@seel.com',
  },
  shipping_address: {
    address_1: '7 Buswell Street',
    city: 'Boston',
    country: 'US',
    state: 'MA',
    zipcode: '02215',
  },
};

/**
 * Mock quote request for US region
 */
export const mockQuoteUS: IQuotesRequest = {
  session_id: '3b87ea2a6cecdb94bae186263feb9e7f',
  type: 'debenhams-wfp',
  cart_id: '3b87ea2a6cecdb94bae186263feb9e7f',
  device_category: 'mobile',
  device_id: '1737534673',
  device_platform: 'iOS',
  extra_info: {
    shipping_fee: 10,
    total_discounts: 10.0,
    total_sales_tax: 10.0,
  },
  merchant_id: '20251211204195299886',
  is_default_on: true,
  line_items: [
    {
      quantity: 3,
      variant_id: '10013-0000-319802',
      is_final_sale: true,
      product_id: '10013-0000-319802',
      category_2: 'Decor',
      requires_shipping: true,
      product_title:
        'Williams Brand Allegro 2 Model Digital Piano w/ Accessories',
      category_1: 'Household Goods',
      line_item_id: '11111',
      price: 50,
      sales_tax: 0,
      image_urls: [
        'https://example.com/image1.jpg',
        'https://example.com/image2.jpg',
      ],
      currency: 'USD',
      variant_title:
        'Williams Brand Allegro 2 Model Digital Piano w/ Accessories',
      allocated_discounts: 0,
      final_price: 50,
      shipping_origin: {
        country: 'US',
        city: '',
        state: '',
        zipcode: '',
      },
    },
    {
      allocated_discounts: 1,
      category_1: 'Household Goods',
      category_2: 'Decor',
      currency: 'USD',
      final_price: '15.00',
      image_urls: [
        'https://example.com/image1.jpg',
        'https://example.com/image2.jpg',
      ],
      is_final_sale: true,
      line_item_id: '22222',
      price: 10,
      product_id: '10013-0000-319803',
      product_title: 'Williams Brand Allegro 2',
      quantity: 3,
      requires_shipping: true,
      sales_tax: 6,
      shipping_origin: {
        country: 'US',
        city: '',
        state: '',
        zipcode: '',
      },
      variant_id: '10013-0000-319803',
      variant_title: 'Williams Brand Allegro 2',
    },
  ],
  customer: {
    customer_id: '1111',
    email: 'xie@seel.com',
  },
  shipping_address: {
    address_1: '7 Buswell Street',
    city: 'Boston',
    country: 'US',
    state: 'MA',
    zipcode: '02215',
  },
};

/**
 * Get mock quote by domain
 * @param domain - 'EU' or 'US'
 * @returns Mock quote request
 */
export const getMockQuote = (domain: 'EU' | 'US'): IQuotesRequest => {
  return domain === 'EU' ? mockQuoteEU : mockQuoteUS;
};

/**
 * Mock API delay for simulating network requests
 * @param ms - Milliseconds to delay
 * @returns Promise that resolves after delay
 */
export const mockDelay = (ms: number = 1000): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Generate random delay between min and max milliseconds
 * @param min - Minimum delay in milliseconds (default: 200)
 * @param max - Maximum delay in milliseconds (default: 500)
 * @returns Random delay value in milliseconds
 */
export const getRandomDelay = (
  min: number = 200,
  max: number = 500
): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Mock API response wrapper with random delay and error simulation
 * @param data - Data to return on success
 * @param minDelay - Minimum delay in milliseconds (default: 200)
 * @param maxDelay - Maximum delay in milliseconds (default: 500)
 * @param errorRate - Error probability (0-1), default: 0.2 (20%)
 * @returns Promise that resolves with data after random delay, or rejects with error
 * @throws Error with 20% probability by default
 */
export const mockApiResponse = async <T>(
  data: T,
  minDelay: number = 200,
  maxDelay: number = 500,
  errorRate: number = 0.2
): Promise<T> => {
  const delay = getRandomDelay(minDelay, maxDelay);
  await mockDelay(delay);

  // Simulate random errors based on error rate
  if (Math.random() < errorRate) {
    const errorMessages = [
      'Network request failed',
      'Server error: 500 Internal Server Error',
      'Request timeout',
      'Connection refused',
      'Failed to fetch data',
    ];
    const randomError =
      errorMessages[Math.floor(Math.random() * errorMessages.length)];
    throw new Error(randomError);
  }

  return data;
};

/**
 * Mock API response wrapper with fixed delay
 * @param data - Data to return
 * @param delayMs - Fixed delay in milliseconds (default: 500)
 * @returns Promise that resolves with data after delay
 */
export const mockApiResponseWithFixedDelay = async <T>(
  data: T,
  delayMs: number = 500
): Promise<T> => {
  await mockDelay(delayMs);
  return data;
};
