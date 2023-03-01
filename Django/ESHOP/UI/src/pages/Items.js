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
  Box
} from '@mui/material';
import { Icon } from '@iconify/react';
import CreateIcon from '@mui/icons-material/Create';
import { Link as RouterLink } from 'react-router-dom';
import * as React from 'react';
import { useState, useEffect } from 'react';
import Page from '../components/Page';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../components/_dashboard/user';
import Scrollbar from '../components/Scrollbar';
//

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const TABLE_HEAD = [
  { id: 'name', label: 'Product Name', alignRight: false },
  { id: 'cost', label: 'Cost Price (in Rs.)', alignRight: false },
  { id: 'sale', label: 'Sale Price (in Rs.)', alignRight: false },
  { id: 'stock', label: 'Stock Quantity', alignRight: false },
  { id: 'action', label: 'Action', alignRight: false }
];

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9)
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

export default function Items() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [categories, setCategoy] = useState([]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const CATEGORYLIST = [
    { name: 'Gift For Her', cost: '1200' },
    { name: 'Birthday Cake', cost: '590' },
    { name: 'Redvelvet Cake', cost: '530' },
    { name: '10 Rose Bouquet', cost: '800' },
    { name: 'Magic Mirror', cost: '1280' },
    { name: 'Customized Cup', cost: '120' },
    { name: 'Personalized Bottle', cost: '300' },
    { name: 'Plant', cost: '200' }
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
    <Page title="ITEMS - BIZHOPS">
      <Box justifyContent="space-between" display="flex" mb={3}>
        <Typography variant="h1">Items</Typography>
      </Box>
      <Container sx={{ backgroundColor: 'whitesmoke' }}>
        <UserListToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
          onImportClick={importItems}
          onExportClick={exportItems}
          onAddClick={addItems}
        />
        <Scrollbar>
          <TableContainer sx={{ minWidth: 700 }}>
            <Table sx={{ backgroundColor: 'white' }}>
              <UserListHead
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
                    const { id, name, description, featureImage, cost, products } = row;
                    const isItemSelected = selected.indexOf(name) !== -1;

                    return (
                      <TableRow
                        hover
                        key={id}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isItemSelected}
                            onChange={(event) => handleClick(event, name)}
                          />
                        </TableCell>
                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar alt={name} src={featureImage} />
                            <Typography variant="subtitle2" noWrap>
                              {name}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">Rs. {cost}</TableCell>
                        <TableCell align="left">Rs. {cost + 0}</TableCell>
                        <TableCell align="center">14</TableCell>
                        <TableCell align="center">
                          <IconButton
                            color="secondary"
                            aria-label="upload picture"
                            component="span"
                          >
                            <CreateIcon />
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
          rowsPerPageOptions={[5, 10, 25]}
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
