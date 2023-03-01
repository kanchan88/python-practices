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
  IconButton,
  Box,
  Dialog,
  DialogTitle,
  TextField,
  DialogContent,
  DialogContentText,
  DialogActions,
  FormControl,
  MenuItem,
  Select
} from '@mui/material';
import { Icon } from '@iconify/react';
import CreateIcon from '@mui/icons-material/Create';
import PreviewIcon from '@mui/icons-material/Preview';
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
  { id: 'name', label: 'Full Name', alignRight: false },
  { id: 'phone', label: 'Phone Number', alignRight: false },
  { id: 'type', label: 'Type', alignRight: false },
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

export default function Parties() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [categories, setCategoy] = useState([]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const CATEGORYLIST = [
    { name: 'Kanchan Bhatta', phone: '9808738792', type: 'supplier' },
    { name: 'Bishal Khadka', phone: '980291455', type: 'customer' },
    { name: 'Ashmit Gautam', phone: '9847755813', type: 'customer' },
    { name: 'Abhishek Sapkota', phone: '9823861286', type: 'supplier' }
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

  const importParties = () => {
    console.log('IMPORT PARTIES');
  };

  const exportParties = () => {
    console.log('EXPORT PARTIES');
  };

  const addParties = () => {
    console.log('Add PARTIES');
  };

  const [party, setParty] = useState({
    name: '',
    phone: '',
    location: '',
    type: '',
    email: ''
  });

  // handle edit
  const handlePartyChanges = (e) => {
    setParty({
      ...party,
      [e.target.name]: e.target.value
    });
  };

  // dialog for add

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // dialog for edit
  const [edit, setEdit] = React.useState(false);

  const handleEditOpen = () => {
    setEdit(true);
  };

  const handleEditClose = () => {
    setEdit(false);
  };

  return (
    <Page title="PARTIES - BIZHOPS">
      <Box justifyContent="space-between" display="flex" mb={3}>
        <Typography variant="h1">Parties</Typography>
      </Box>
      <Container sx={{ backgroundColor: 'whitesmoke' }}>
        <UserListToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
          onImportClick={importParties}
          onExportClick={exportParties}
          onAddClick={handleClickOpen}
        />
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>
            <Typography variant="h2">Add Party</Typography>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Add Vendors/Customers in Bizhops to track or manage transactions with them.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              name="name"
              label="Full Name"
              value={party.name}
              onChange={handlePartyChanges}
              type="text"
              fullWidth
              variant="outlined"
            />
            <TextField
              margin="normal"
              name="phone"
              label="Phone Number"
              value={party.phone}
              onChange={handlePartyChanges}
              type="number"
              variant="outlined"
            />
            <TextField
              margin="normal"
              name="email"
              label="Email Address"
              value={party.email}
              onChange={handlePartyChanges}
              type="email"
              variant="outlined"
              sx={{ ml: 3 }}
            />
            <TextField
              margin="normal"
              name="location"
              label="Location"
              value={party.location}
              onChange={handlePartyChanges}
              type="text"
              variant="outlined"
            />
            <FormControl margin="normal" sx={{ ml: 3 }}>
              <Select labelId="select" id="select" value="customer">
                <MenuItem value="customer">Customer</MenuItem>
                <MenuItem value="vendor">Vendor</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose}>Add</Button>
          </DialogActions>
        </Dialog>
        <Dialog open={edit} onClose={handleEditClose}>
          <DialogTitle>
            <Typography variant="h2">Edit Party</Typography>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>Edit Vendors/Customers information.</DialogContentText>
            <TextField
              margin="dense"
              name="name"
              value={party.name}
              onChange={handlePartyChanges}
              label="Name"
              type="text"
              fullWidth
              variant="outlined"
            />
            <TextField
              margin="normal"
              name="phone"
              label="Phone"
              value={party.phone}
              onChange={handlePartyChanges}
              type="number"
              variant="outlined"
            />
            <TextField
              margin="normal"
              name="email"
              label="Email Address"
              onChange={(e) => handlePartyChanges(e)}
              type="email"
              value={party.email}
              variant="outlined"
              sx={{ ml: 3 }}
            />
            <TextField
              margin="normal"
              name="location"
              label="Location"
              type="text"
              value={party.location}
              onChange={(e) => handlePartyChanges(e)}
              variant="outlined"
            />
            <FormControl margin="normal" sx={{ ml: 3 }}>
              <Select labelId="select" name="type" value={party.type} onChange={handlePartyChanges}>
                <MenuItem value="customer">Customer</MenuItem>
                <MenuItem value="vendor">Vendor</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditClose}>Cancel</Button>
            <Button onClick={handleEditClose}>Edit Party</Button>
          </DialogActions>
        </Dialog>
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
                    const { id, name, phone, type } = row;
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
                          <Stack direction="row" alignItems="end" spacing={2}>
                            <Typography variant="subtitle2" noWrap>
                              {name}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">{phone}</TableCell>
                        <TableCell align="left">
                          {type === 'customer' ? (
                            <Typography variant="button">{type}</Typography>
                          ) : (
                            <Typography variant="button">{type}</Typography>
                          )}
                        </TableCell>

                        <TableCell align="left">
                          <IconButton color="secondary" aria-label="edit" component="span">
                            <CreateIcon onClick={handleEditOpen} />
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
          rowsPerPageOptions={[10, 25]}
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
