import { TrackingEventDto } from './dto';

/* DB mock */
export const DB: {
  trackingEvents: Record<string, Record<string, TrackingEventDb[]>>;
} = {
  trackingEvents: {},
};

export interface TrackingEventDb {
  createdAt: string;
  event: string;
  description?: string;
}

export const DbTracking = {
  async getEntities(id: string, type: string): Promise<TrackingEventDto[]> {
    const entities = DB.trackingEvents[type]?.[id] || [];
    return entities.map((e) => toDbTrackingEventDto(id, type, e));
  },

  async putEntity(event: TrackingEventDto): Promise<void> {
    if (!DB.trackingEvents[event.objectType]) {
      DB.trackingEvents[event.objectType] = {};
    }
    if (!DB.trackingEvents[event.objectType][event.id]) {
      DB.trackingEvents[event.objectType][event.id] = [];
    }

    DB.trackingEvents[event.objectType][event.id].push(toTrackingEventDb(event));
  },

  async resetDb() {
    DB.trackingEvents = {};
  },
};

function toDbTrackingEventDto(id: string, type: string, entity: TrackingEventDb): TrackingEventDto {
  return {
    id,
    objectType: type,
    createdAt: entity.createdAt,
    eventName: entity.event,
    description: entity.description,
  };
}

function toTrackingEventDb(dto: TrackingEventDto): TrackingEventDb {
  return {
    createdAt: dto.createdAt,
    event: dto.eventName,
    description: dto.description,
  };
}
