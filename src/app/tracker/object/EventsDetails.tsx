'use client';

import { TrackingEventDto } from '@/app/server/dto';
import {
  Box,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React from 'react';

export const EventDetails: React.FC<{ event: TrackingEventDto }> = (props) => {
  const { event } = props;

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
  }));

  return (
    <Box
      className="event-details"
      sx={{
        margin: 1,
      }}
    >
      <Typography variant="h6" gutterBottom component="div">
        Related Objects
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <StyledTableCell>Object ID</StyledTableCell>
            <StyledTableCell>Object Type</StyledTableCell>
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

      <Typography sx={{ mt: 2 }} variant="h6" gutterBottom component="div">
        Updated Fields
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <StyledTableCell>Field</StyledTableCell>
            <StyledTableCell>New Value</StyledTableCell>
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
