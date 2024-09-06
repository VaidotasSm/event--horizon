'use client';

import { TrackingEventDto } from '@/app/server/dto';
import {
  Collapse,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import React, { useMemo, useState } from 'react';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { EventDetails } from '@/app/tracker/object/EventsDetails';

interface RelatedObject {
  id: string;
  objectType: string;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
}));

export const EventsTable: React.FC<{ events: TrackingEventDto[] }> = (props) => {
  const relatedObjects: RelatedObject[] = props.events.flatMap((e) => e.relatedObjects);
  const [filterRelatedObjIndex, setFilterRelatedObjIndex] = useState<number>(-1);
  const handleFilterRelatedObjIndexChange = (e: SelectChangeEvent) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      setFilterRelatedObjIndex(value);
    }
  };

  const filterRelatedObj = relatedObjects[filterRelatedObjIndex];
  const events = useMemo(
    () =>
      filterRelatedObj
        ? props.events.filter((e) => e.relatedObjects.includes(filterRelatedObj))
        : props.events,
    [props.events, filterRelatedObj],
  );

  // const handle;
  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="related-objects">Related Objects</InputLabel>
        <Select
          labelId="related-objects"
          label="Related Objects"
          value={`${filterRelatedObjIndex}`}
          onChange={handleFilterRelatedObjIndexChange}
        >
          <MenuItem value={-1}>
            <em>All</em>
          </MenuItem>
          {relatedObjects.map((relatedObj, i) => (
            <MenuItem key={`${relatedObj.id}-${i}`} value={i}>
              {relatedObj.id} ({relatedObj.objectType})
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TableContainer sx={{ pb: 2, mt: 2 }} component={Paper}>
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
            {events.map((event) => (
              <TableRowEvent key={`${event.createdAt}-${event.eventName}`} event={event} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
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
        <TableRow sx={{ backgroundColor: 'grey.200' }}>
          <TableCell
            style={{
              paddingBottom: 0,
              paddingTop: 0,
            }}
            colSpan={4}
          >
            <Collapse in={showEventDetails} timeout="auto" unmountOnExit>
              <EventDetails event={event} />
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </>
  );
}
