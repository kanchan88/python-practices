import { filter } from 'lodash';
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  createSvgIcon,
  IconButton,
  Box,
  Tooltip,
  Paper
} from '@mui/material';
import { Icon } from '@iconify/react';
import AddIcon from '@mui/icons-material/Add';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link as RouterLink } from 'react-router-dom';
import * as React from 'react';
import { useState, useEffect } from 'react';
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import TransactionToolBar from '../components/_dashboard/user/ToolBarTransaction';
import TransactionListHead from '../components/_dashboard/user/TransactionListHead';
//

const TABLE_HEAD = [
  { id: 'date', label: 'Expense Date', alignRight: false },
  { id: 'tid', label: 'Transaction Id', alignRight: false },
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'received', label: 'Paid (in Rs.)', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'action', label: 'Action', alignRight: false }
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Expenses() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('desc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('date');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [categories, setCategoy] = useState([]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const CATEGORYLIST = [
    { date: '2078-12-16', id: '1', name: 'Mohan Raj', received: '650', status: 'DONE' },
    { date: '2053-02-11', id: '9', name: 'Abhishek', received: '890', status: 'PENDING' },
    { date: '2078-09-17', id: '3', name: 'Kanchan Bhatta', received: '1290', status: 'PENDING' },
    { date: '2063-10-23', id: '5', name: 'Debaki', received: '1050', status: 'DONE' },
    { date: '2072-02-14', id: '7', name: 'Keshav Raj', received: '1650', status: 'PENDING' },
    { date: '2077-08-23', id: '2', name: 'Rudra', received: '6500', status: 'DONE' },
    { date: '2057-04-23', id: '8', name: 'Seeta Bhatta', received: '200', status: 'DONE' },
    { date: '2042-12-17', id: '6', name: 'Shiva', received: '2000', status: 'PENDING' }
  ];

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = CATEGORYLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - CATEGORYLIST.length) : 0;

  const filteredUsers = applySortFilter(CATEGORYLIST, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  const importItems = () => {
    console.log('IMPORT ITEMS');
  };

  const exportItems = () => {
    console.log('EXPORT ITEMS');
  };

  const addItems = () => {
    console.log('Add ITEMS');
  };

  return (
    <Page title="EXPENSES - BIZHOPS" backgroundColor="white">
      <Container>
        <Box justifyContent="space-between" display="flex" mb={3}>
          <Typography variant="h1">Expenses</Typography>
          <Tooltip title="Other Expenses Details">
            <Button variant="contained" color="secondary" startIcon={<AddIcon />}>
              Add Expenses Record
            </Button>
          </Tooltip>
        </Box>
        <Paper
          style={{
            padding: '26px 20px',
            borderWidth: `2px !important`,
            borderColor: `silver`
          }}
          sx={{ mb: 6 }}
          variant="outlined"
        >
          <Box justifyContent="space-between" display="flex">
            <Box>
              <Typography variant="subheading" mb={3} sx={{ fontSize: 12 }}>
                Total Amount Received
              </Typography>
              <Typography variant="subtitle1" sx={{ fontSize: 22 }}>
                Rs. 69000.00
              </Typography>
            </Box>
            <Box>
              <Typography variant="subheading" mb={3} sx={{ fontSize: 12 }}>
                Total Due Amount
              </Typography>
              <Typography variant="subtitle1" sx={{ fontSize: 22 }}>
                Rs. 8720.00
              </Typography>
            </Box>
            <Box>
              <Typography variant="subheading" mb={3} sx={{ fontSize: 12 }}>
                Payment Collected (this week)
              </Typography>
              <Typography variant="subtitle1" sx={{ fontSize: 22 }}>
                Rs. 5200.00
              </Typography>
            </Box>
          </Box>
        </Paper>

        <TransactionToolBar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
          onImportClick={importItems}
          onExportClick={exportItems}
          onAddClick={addItems}
        />
        <Scrollbar>
          <TableContainer sx={{ minWidth: 700 }}>
            <Table sx={{ backgroundColor: 'white', mt: 2 }}>
              <TransactionListHead
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={CATEGORYLIST.length}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
                onSelectAllClick={handleSelectAllClick}
              />
              <TableBody>
                {filteredUsers
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    const { id, date, name, received, status } = row;
                    const isItemSelected = selected.indexOf(name) !== -1;

                    return (
                      <TableRow hover key={id} tabIndex={-1}>
                        <TableCell align="left">{date}</TableCell>
                        <TableCell align="left">{id}</TableCell>
                        <TableCell align="left">{name}</TableCell>
                        <TableCell align="left">Rs. {received}</TableCell>
                        <TableCell align="left">
                          {status === 'PENDING' ? (
                            <Typography color="primary" sx={{ fontWeight: 800 }}>
                              {status.toLowerCase()}
                            </Typography>
                          ) : (
                            <Typography color="secondary" sx={{ fontWeight: 800 }}>
                              {status.toLowerCase()}
                            </Typography>
                          )}
                        </TableCell>
                        <TableCell align="left">
                          <IconButton color="secondary" aria-label="Edit/Delete" component="span">
                            <CreateIcon />
                          </IconButton>
                          <IconButton color="primary" aria-label="Delete" component="span">
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          rowsPerPageOptions={[10, 20, 30]}
          component="div"
          count={CATEGORYLIST.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Container>
    </Page>
  );
}
