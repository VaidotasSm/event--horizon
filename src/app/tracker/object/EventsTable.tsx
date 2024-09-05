'use client';

import { TrackingEventDto } from '@/app/server/dto';
import React from 'react';
import { EventDetails } from './EventsDetails';

export const EventsTable: React.FC<{ events: TrackingEventDto[] }> = (props) => {
  return (
    <ul>
      {props.events.map((e) => (
        <li key={e.createdAt}>
          <EventDetails event={e} />
        </li>
      ))}
    </ul>
  );
};
