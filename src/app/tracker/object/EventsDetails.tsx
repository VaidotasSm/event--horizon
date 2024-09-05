'use client';

import { TrackingEventDto } from '@/app/server/dto';
import React from 'react';

export const EventDetails: React.FC<{ event: TrackingEventDto }> = (props) => (
  <div>
    {props.event.createdAt} - {props.event.eventName}
  </div>
);
