'use client';

import { TrackingEventDto } from '@/app/server/dto';
import { Typography } from '@mui/material';
import React from 'react';
import { EventDetails } from './EventsDetails';

export const EventsTable: React.FC<{ events: TrackingEventDto[] }> = (props) => {
  if (props.events.length === 0) {
    return (
      <Typography variant="h4" color="warning">
        Object has no events
      </Typography>
    );
  }

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
