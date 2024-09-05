import 'isomorphic-fetch';

describe('api - tracking', () => {
  describe('GET events', () => {
    it('should get empty events when none were created', async () => {
      let res = await fetch('http://localhost:3000/api/tracking', { method: 'delete' });
      expect(res.status).toBe(200);

      res = await fetch('http://localhost:3000/api/tracking?id=1&type=typ1');
      expect(res.status).toBe(200);
      expect(await res.json()).toEqual({ events: [] });
    });

    it('should get events when some were created', async () => {
      let res = await fetch('http://localhost:3000/api/tracking', { method: 'delete' });
      expect(res.status).toBe(200);

      res = await fetch('http://localhost:3000/api/tracking', {
        method: 'post',
        body: JSON.stringify({
          id: '1',
          objectType: 'type1',
          eventName: 'event1',
          description: 'Test event 1',
          createdAt: '2024-09-05T12:00:00.000Z',
        }),
      });
      expect(res.status).toBe(200);

      res = await fetch('http://localhost:3000/api/tracking', {
        method: 'post',
        body: JSON.stringify({
          id: '1',
          objectType: 'type1',
          eventName: 'event2',
          description: 'Test event 2',
          createdAt: '2024-09-05T12:01:00.000Z',
        }),
      });
      expect(res.status).toBe(200);

      res = await fetch('http://localhost:3000/api/tracking?id=1&type=type1');

      expect(res.status).toBe(200);
      expect(await res.json()).toEqual({
        events: [
          {
            id: '1',
            objectType: 'type1',
            eventName: 'event1',
            description: 'Test event 1',
            createdAt: '2024-09-05T12:00:00.000Z',
          },
          {
            id: '1',
            objectType: 'type1',
            eventName: 'event2',
            description: 'Test event 2',
            createdAt: '2024-09-05T12:01:00.000Z',
          },
        ],
      });
    });
  });
});
