/**
 * Environment Enum
 */
export enum SeelEnvironment {
  Development = 'development',
  Production = 'production',
}

const defaultApiVersion: string = '2.6.0';
const defaultSeelEnvironment: SeelEnvironment = SeelEnvironment.Production;
const defaultRequestTimeout: number = 5000;
const defaultOptOutExpiredTime: number = 31536000000; // 31536000000 = 365 * 24 * 60 * 60 * 1000;

interface SeelWidgetSDKProps {
  apiKey: string;
  apiVersion?: string;
  environment?: SeelEnvironment;
  requestTimeout?: number;
  optOutExpiredTime?: number;
}

/**
 * SeelWidgetSDK
 * Main SDK class for Seel Widget functionality
 */
export class SeelWidgetSDK {
  // MARK: - Singleton Instance
  private static _shared: SeelWidgetSDK | null = null;

  public static get shared(): SeelWidgetSDK {
    if (!SeelWidgetSDK._shared) {
      SeelWidgetSDK._shared = new SeelWidgetSDK();
    }
    return SeelWidgetSDK._shared;
  }

  // MARK: - Properties
  private _apiKey: string = '';
  private _apiVersion: string = defaultApiVersion;
  private _environment: SeelEnvironment = defaultSeelEnvironment;
  private _requestTimeout: number = defaultRequestTimeout;
  private _optOutExpiredTime: number = defaultOptOutExpiredTime;

  // MARK: - Private Constructor
  private constructor() {
    // Private constructor for singleton pattern
  }

  // MARK: - Public Methods

  /**
   * Configure SeelWidgetSDK
   * @param apiKey API key
   * @param environment Environment (optional, defaults to production)
   */
  public configure(props: SeelWidgetSDKProps): void {
    this._apiKey = props.apiKey;
    this._apiVersion = props.apiVersion ?? defaultApiVersion;
    this._environment = props.environment ?? defaultSeelEnvironment;
    this._requestTimeout = props.requestTimeout ?? defaultRequestTimeout;
    this._optOutExpiredTime =
      props.optOutExpiredTime ?? defaultOptOutExpiredTime;
  }

  /**
   * Get current API Key
   */
  public get apiKey(): string {
    return this._apiKey;
  }

  /**
   * Get current API Version
   */
  public get apiVersion(): string {
    return this._apiVersion;
  }

  /**
   * Get current environment
   */
  public get environment(): SeelEnvironment {
    return this._environment;
  }

  /**
   * Get current Request Timeout
   */
  public get requestTimeout(): number {
    return this._requestTimeout;
  }

  /**
   * Get current Opt-Out Expired Time
   */
  public get optOutExpiredTime(): number {
    return this._optOutExpiredTime;
  }

  /**
   * Set current Opt-Out Expired Time
   */
  public set optOutExpiredTime(value: number) {
    this._optOutExpiredTime = value;
  }

  /**
   * Get current BaseURL
   */
  public get baseURL(): string {
    return this._environment === SeelEnvironment.Production
      ? 'https://api.seel.com'
      : 'https://api-test.seel.com';
  }

  /**
   * Check if configured
   */
  public get isConfigured(): boolean {
    return this._apiKey !== '';
  }
}
