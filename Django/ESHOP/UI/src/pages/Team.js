import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
// material
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
  imageListItemClasses,
  CircularProgress,
  TableHead
} from '@mui/material';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { getAllTeamMember } from '../_mocks_/repo/data';

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'contact', label: 'Contact', alignRight: false },
  { id: 'description', label: 'Position', alignRight: false }
];

// ----------------------------------------------------------------------

export default function Team() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [categories, setCategoy] = useState([]);
  const [loader, setLoader] = useState(false);

  const init = () => {
    setLoader(true);
    getAllTeamMember().then((data) => {
      if (data === undefined) {
        setLoader(true);
      } else {
        setCategoy(data.data);
        setLoader(false);
      }
    });
  };
  useEffect(() => {
    init();
  }, []);

  const CATEGORYLIST = categories.map((_, index) => ({
    id: categories[index].id,
    name: categories[index].name,
    position: categories[index].position,
    email: categories[index].email,
    image: categories[index].image
  }));

  return (
    <Page title="Team | BrainStrom">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Team Member
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/dashboard/team/add"
            startIcon={<Icon icon={plusFill} />}
          >
            Add Team
          </Button>
        </Stack>
        {loader === true ? (
          <Container m={10}>
            <CircularProgress color="secondary" />
          </Container>
        ) : (
          <Card>
            <Scrollbar>
              <TableContainer sx={{ minWidth: 800 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell />
                      <TableCell align="left">Name</TableCell>
                      <TableCell align="right">Email</TableCell>
                      <TableCell align="right">Position</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {CATEGORYLIST.map((row) => {
                      const { id, name, position, image, email } = row;
                      const isItemSelected = selected.indexOf(name) !== -1;
                      return (
                        <TableRow hover key={id} tabIndex={-1}>
                          <TableCell />
                          <TableCell component="th" scope="row" padding="none" align="right">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Avatar alt={name} src={image} />
                              <Typography
                                variant="subtitle2"
                                color="black"
                                component={RouterLink}
                                to={`/dashboard/team/${id}`}
                                noWrap
                              >
                                {name}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="right">{email}</TableCell>
                          <TableCell align="right">{position}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Scrollbar>
          </Card>
        )}
      </Container>
    </Page>
  );
}
