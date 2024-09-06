/* eslint-disable @typescript-eslint/no-explicit-any */
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
  objectChanges?: any;
  relatedObjects?: {
    id: string;
    objectType: string;
  }[];
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
    objectChanges: entity.objectChanges,
    relatedObjects: entity.relatedObjects || [],
  };
}

function toTrackingEventDb(dto: TrackingEventDto): TrackingEventDb {
  return {
    createdAt: dto.createdAt,
    event: dto.eventName,
    description: dto.description,
    objectChanges: dto.objectChanges,
    relatedObjects: dto.relatedObjects,
  };
}

async function seedTestData() {
  const events: TrackingEventDto[] = [
    {
      id: '1001',
      objectType: 'transaction',
      eventName: 'create',
      description: 'Create transaction',
      createdAt: '2024-09-05T12:00:00.000Z',
      relatedObjects: [{ id: 'item-1', objectType: 'item' }],
      objectChanges: { amount: 5, items: 1, approved: false },
    },
    {
      id: '1001',
      objectType: 'transaction',
      eventName: 'edit',
      description: 'Edit of transaction',
      createdAt: '2024-09-05T12:10:00.000Z',
      relatedObjects: [
        { id: 'item-2', objectType: 'item' },
        { id: 'item-3', objectType: 'item' },
      ],
      objectChanges: { amount: 15, items: 3, approved: false },
    },
    {
      id: '1001',
      objectType: 'transaction',
      eventName: 'edit',
      description: 'Edit of transaction',
      createdAt: '2024-09-05T12:14:00.000Z',
      relatedObjects: [{ id: 'item-4', objectType: 'item' }],
      objectChanges: { amount: 20, items: 4, approved: false },
    },
    {
      id: '1001',
      objectType: 'transaction',
      eventName: 'authorization',
      description: 'Transaction Authorization',
      createdAt: '2024-09-05T12:20:00.000Z',
      relatedObjects: [{ id: 'user-approver-1', objectType: 'user' }],
      objectChanges: { approved: true },
    },
    {
      id: '1001',
      objectType: 'transaction',
      eventName: 'batch-close',
      description: 'Transaction Authorization',
      createdAt: '2024-09-05T12:30:00.000Z',
      relatedObjects: [{ id: 'batch-1', objectType: 'batch' }],
      objectChanges: { settled: true },
    },
  ];

  for (const e of events) {
    await DbTracking.putEntity(e);
  }
}

(async () => {
  await seedTestData();
})();
