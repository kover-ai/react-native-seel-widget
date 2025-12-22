import type { IEventInfo, IEvents, EventType } from './IEvents';

/**
 * Events Request/Response class
 * Converts snake_case API format to camelCase for internal use
 *
 * @example
 * ```ts
 * const iRequest: IEvents = {
 *   client_ip: '',
 *   customer_id: '',
 *   session_id: '',
 *   event_source: '',
 *   event_ts: '',
 *   event_type: EventTypeEnum.product_page_exit,
 * };
 *
 * const request: EventsRequest = new EventsRequest(iRequest);
 * ```
 */
export class EventsRequest {
  /**
   * Browser IP address
   */
  clientIP: string;
  /**
   * Customer Id
   */
  customerId: string;
  /**
   * Device Id
   */
  deviceId?: string;
  /**
   * Event Id
   */
  eventId?: string;
  /**
   * Event information object
   * Each event_type has its own unique schema. For specific details, please refer to the custom pixel guide.
   */
  eventInfo?: IEventInfo;
  /**
   * Event source
   */
  eventSource: string;
  /**
   * Event created timestamp in milliseconds
   */
  eventTs: string;
  /**
   * Event type
   */
  eventType: EventType;
  /**
   * Session Id
   */
  sessionId: string;

  constructor(props: IEvents) {
    this.clientIP = props.client_ip;
    this.customerId = props.customer_id;
    this.deviceId = props.device_id;
    this.eventId = props.event_id;
    this.eventInfo = props.event_info;
    this.eventSource = props.event_source || '';
    this.eventTs = props.event_ts;
    this.eventType = props.event_type;
    this.sessionId = props.session_id;
  }
}
