'use client';

import { TrackingEventDto } from '@/app/server/dto';
import {
  Box,
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
  Typography,
} from '@mui/material';
import React from 'react';
import { EventDetails } from './EventsDetails';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export const EventsTable: React.FC<{ events: TrackingEventDto[] }> = (props) => {
  const [open, setOpen] = React.useState(false);

  if (props.events.length === 0) {
    return (
      <Typography variant="h4" color="warning">
        Object has no events
      </Typography>
    );
  }

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
  }));

  return (
    <TableContainer sx={{ pb: 2 }} component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell />
            <StyledTableCell align="left">ID</StyledTableCell>
            <StyledTableCell align="left">Type</StyledTableCell>
            <StyledTableCell align="left">Object name</StyledTableCell>
            <StyledTableCell align="center">Last Change</StyledTableCell>
            <StyledTableCell align="right">Last Changed</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
            <TableCell>
              <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            </TableCell>
            <TableCell align="left" component="th" scope="row">
              {props.events[0].id}
            </TableCell>
            <TableCell align="left">{props.events[0].objectType}</TableCell>
            <TableCell align="left">{props.events[0].eventName}</TableCell>
            <TableCell align="center">{props.events[0].objectChanges.amount}</TableCell>
            <TableCell align="right">{props.events[0].createdAt}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <Box sx={{ margin: 1 }}>
                  <Typography variant="h6" gutterBottom component="div">
                    History
                  </Typography>
                  <Table size="small" aria-label="purchases">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>Name</StyledTableCell>
                        <StyledTableCell>Change</StyledTableCell>
                        <StyledTableCell>Change date</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {props.events.map((row) => (
                        <EventDetails key={row.id} event={row} />
                      ))}
                    </TableBody>
                  </Table>
                </Box>
                {/* <EventDetails event={row} /> */}
              </Collapse>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>

    // <ul>
    //   {props.events.map((e) => (
    //     <li key={e.createdAt}>
    //       <EventDetails event={e} />
    //     </li>
    //   ))}
    // </ul>
  );
};
