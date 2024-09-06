'use client';

import { TrackingEventDto } from '@/app/server/dto';
import { Box, Typography } from '@mui/material';
import React from 'react';

export const EventDetails: React.FC<{ event: TrackingEventDto }> = (props) => {
  const { event } = props;

  return (
    <Box
      sx={{
        margin: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box>
        <Typography variant="h5">Related Objects</Typography>
        {event.relatedObjects.map((r) => (
          <Box key={r.id}>
            {r.id} ({r.objectType})
          </Box>
        ))}
      </Box>

      <Box>
        <Typography variant="h5">Related Objects</Typography>
        {Object.entries(event.objectChanges).map(([field, value]) => (
          <Box key={field}>
            {field} = {`${value}`}
          </Box>
        ))}
      </Box>
    </Box>
  );
};
