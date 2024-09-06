'use client';

import { TrackingEventDto } from '@/app/server/dto';
import {
  Collapse,
  IconButton,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import React, { useState } from 'react';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { EventDetails } from '@/app/tracker/object/EventsDetails';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
}));

export const EventsTable: React.FC<{ events: TrackingEventDto[] }> = (props) => {
  return (
    <TableContainer sx={{ pb: 2 }} component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell />
            <StyledTableCell align="center">Event</StyledTableCell>
            <StyledTableCell align="right">Description</StyledTableCell>
            <StyledTableCell align="right">Date</StyledTableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {props.events.map((event) => (
            <TableRowEvent key={`${event.createdAt}-${event.eventName}`} event={event} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

function TableRowEvent(props: { event: TrackingEventDto }) {
  const event = props.event;
  const [showEventDetails, setShowEventDetails] = useState(false);
  const handleEventRowClick = () => setShowEventDetails((isShown) => !isShown);

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={handleEventRowClick}>
            {showEventDetails ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="center">{event.eventName}</TableCell>
        <TableCell align="right" component="th" scope="row">
          {event.description}
        </TableCell>
        <TableCell align="right">{event.createdAt}</TableCell>
      </TableRow>
      {showEventDetails && (
        <TableRow>
          <Collapse in={showEventDetails} timeout="auto" unmountOnExit>
            <EventDetails event={event} />
          </Collapse>
        </TableRow>
      )}
    </>
  );
}
