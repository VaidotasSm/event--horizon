'use client';

import {
  Box,
  Collapse,
  IconButton,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  tableCellClasses,
  styled,
  TextField,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import * as React from 'react';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

function createData(id: number, type: string, objectName: string) {
  return {
    id,
    type,
    objectName,
    history: [
      {
        c_id: 1,
        change:
          'Changed amount of transaction and description of transaction in object grid page 1 and 2 and 3',
        objectName: 'lkondrotas',
        changedAt: '2024-01-01',
      },
      {
        c_id: 2,
        change: 'Changed amount of transaction',
        objectName: 'lkondrotas',
        changedAt: '2023-04-01',
      },
    ],
  };
}

function Row(props: { row: ReturnType<typeof createData> }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="left" component="th" scope="row">
          {row.id}
        </TableCell>
        <TableCell align="left">{row.type}</TableCell>
        <TableCell align="left">{row.objectName}</TableCell>
        <TableCell align="center">{row.history[0].change}</TableCell>
        <TableCell align="right">{row.history[0].changedAt}</TableCell>
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
                    <StyledTableCell>Change</StyledTableCell>
                    <StyledTableCell>Change date</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.change}>
                      <TableCell component="th" scope="row">
                        {historyRow.change}
                      </TableCell>
                      <TableCell>{historyRow.changedAt}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const rows = [
  createData(1, 'User', 'lkondrotas'),
  createData(2, 'User', 'lkondrotas'),
  createData(3, 'User', 'lkondrotas'),
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export default function ObjectGridPage() {
  return (
    <>
      {/* Filters */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <TextField
          size="small"
          id="outlined-basic"
          label="Search"
          variant="outlined"
          sx={{ mr: 2 }}
        />
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="demo-select-small-label">Type</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={''}
            label="Type"
            // onChange={handleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={'user'}>User</MenuItem>
            <MenuItem value={'transaction'}>Transaction</MenuItem>
          </Select>
        </FormControl>
        <MenuItem>
          <Typography variant="body1">Filter 3</Typography>
        </MenuItem>
        <MenuItem>
          <Typography variant="body1">Filter 4</Typography>
        </MenuItem>
      </Box>
      {/* Object Grid */}
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
            {rows.map((row) => (
              <Row key={row.id} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
