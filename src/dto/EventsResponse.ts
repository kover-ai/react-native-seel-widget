import type { IEvents } from './IEvents';
import { EventsRequest } from './EventsRequest';

/**
 * Events Response class
 * Reuses EventsRequest since they have the same structure
 * This avoids code duplication while maintaining semantic clarity
 */
export class EventsResponse extends EventsRequest {
  constructor(props: IEvents) {
    super(props);
  }
}
