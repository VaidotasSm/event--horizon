'use client';

import { TrackingEventDto } from '@/app/server/dto';
import { TableCell, TableRow } from '@mui/material';
import React from 'react';

export const EventDetails: React.FC<{ event: TrackingEventDto }> = (props) => (
  <TableRow key={props.event.id}>
    <TableCell>{props.event.eventName}</TableCell>
    <TableCell component="th" scope="row">
      {props.event.description}
    </TableCell>
    <TableCell>{props.event.createdAt}</TableCell>
  </TableRow>
);
