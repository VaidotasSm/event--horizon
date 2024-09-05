/* eslint-disable @typescript-eslint/no-explicit-any */
import { TrackingEventDto } from '@/app/server/dto';
import 'isomorphic-fetch';

describe('api - tracking', () => {
  beforeEach(async () => {
    const res = await fetch('http://localhost:3000/api/tracking', { method: 'delete' });
    expect(res.status).toBe(200);
  });

  it('should get empty events when none were created', async () => {
    const res = await fetch('http://localhost:3000/api/tracking?id=1&type=typ1');
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ events: [] });
  });

  it.each<{ body: any; expectedMsg: string }>([
    { body: null, expectedMsg: 'Invalid request body - not a json' },
    { body: '', expectedMsg: 'Invalid request body - not a json' },
    { body: 'text', expectedMsg: 'Invalid request body - not a json' },
    { body: JSON.stringify({ id: '1' }), expectedMsg: 'Invalid request body' },
    { body: JSON.stringify({ type: 'type1' }), expectedMsg: 'Invalid request body' },
    { body: JSON.stringify({ id: '1', type: 'type1' }), expectedMsg: 'Invalid request body' },
  ])('should fail to post event when incorrect body', async (testCase) => {
    const res = await fetch('http://localhost:3000/api/tracking', {
      method: 'post',
      body: testCase.body,
    });
    expect(res.status).toBe(400);
    expect(await res.json()).toMatchObject({ message: testCase.expectedMsg });
  });

  it('should get events when some were created', async () => {
    await postEvent({
      id: '1',
      objectType: 'type1',
      eventName: 'event1',
      description: 'Test event 1',
      createdAt: '2024-09-05T12:00:00.000Z',
      relatedObjects: [{ id: 'parent-1', objectType: 'type2' }],
      objectChanges: { field1: 'edit1' },
    });
    await postEvent({
      id: '1',
      objectType: 'type1',
      eventName: 'event2',
      description: 'Test event 2',
      createdAt: '2024-09-05T12:01:00.000Z',
      relatedObjects: [],
    });

    const res = await fetch('http://localhost:3000/api/tracking?id=1&type=type1');
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({
      events: [
        {
          id: '1',
          objectType: 'type1',
          eventName: 'event1',
          description: 'Test event 1',
          createdAt: '2024-09-05T12:00:00.000Z',
          relatedObjects: [{ id: 'parent-1', objectType: 'type2' }],
          objectChanges: { field1: 'edit1' },
        },
        {
          id: '1',
          objectType: 'type1',
          eventName: 'event2',
          description: 'Test event 2',
          createdAt: '2024-09-05T12:01:00.000Z',
          relatedObjects: [],
        },
      ],
    });
  });
});

async function postEvent(req: Partial<TrackingEventDto>): Promise<void> {
  const res = await fetch('http://localhost:3000/api/tracking', {
    method: 'post',
    body: JSON.stringify({
      id: '1',
      objectType: 'type1',
      eventName: 'event1',
      description: 'Test event 1',
      createdAt: '2024-09-05T12:00:00.000Z',
      ...req,
    }),
  });

  await expectResponseMatch(res, { status: 200, body: { message: 'Created' } });
}

async function expectResponseMatch(res: Response, expected: { status: number; body?: any }) {
  const body = await res.json();
  expect({ status: res.status, body }).toMatchObject(expected);
}
