'use client';

import { TrackingEventDto } from '@/app/server/dto';
import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import React from 'react';

export const EventDetails: React.FC<{ event: TrackingEventDto }> = (props) => {
  const { event } = props;

  return (
    <Box
      className="event-details"
      sx={{
        margin: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell colSpan={2}>
              <Typography>Related Objects</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography>Object ID</Typography>
            </TableCell>
            <TableCell>
              <Typography>Object Type</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {event.relatedObjects.map((r) => (
            <TableRow key={r.id}>
              <TableCell>{r.id}</TableCell>
              <TableCell>{r.objectType}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell colSpan={2}>
              <Typography>Updated Fields</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography>Field</Typography>
            </TableCell>
            <TableCell>
              <Typography>New Value</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(event.objectChanges).map(([field, value]) => (
            <TableRow key={field}>
              <TableCell>{field}</TableCell>
              <TableCell>{`${value}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};
