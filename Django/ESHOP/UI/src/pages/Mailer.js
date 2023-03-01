import faker from 'faker';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { formatDistance } from 'date-fns';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
// material

import {
  Box,
  Stack,
  Link,
  Card,
  Button,
  Divider,
  Typography,
  CardHeader,
  Container,
  CircularProgress
} from '@mui/material';
import { useState, useEffect } from 'react';

import { getAllMailer, apiUrl } from '../_mocks_/repo/data';
// ----------------------------------------------------------------------

export default function Mailer() {
  const [partners, setPartner] = useState([]);
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();

  const init = () => {
    setLoader(true);
    getAllMailer().then((data) => {
      if (data === undefined) {
        setLoader(true);
      } else {
        setPartner(data.data);
        setLoader(false);
      }
    });
  };
  useEffect(() => {
    init();
  }, []);

  const headerFile = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Token ${localStorage.getItem('authToken')}`
    }
  };

  const deleteMailer = async (id) => {
    await axios
      .delete(`${apiUrl}/api/mail/${id}`, headerFile)
      .then((response) => {
        init();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const PARTNERS = partners.map((_, index) => {
    const setIndex = index + 1;
    return {
      id: partners[index].id,
      email: partners[index].email_id
    };
  });

  return (
    <Card>
      <Grid container spacing={2}>
        <Grid item xs={10}>
          <CardHeader title="Mail Subscriber" />
        </Grid>
      </Grid>
      {loader === true ? (
        <Container m={10}>
          <CircularProgress color="secondary" />
        </Container>
      ) : (
        <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
          {PARTNERS.map((news) => (
            <Stack direction="row" alignItems="center" spacing={2}>
              <Box sx={{ minWidth: 5 }}>-</Box>
              <Box sx={{ minWidth: 240 }}>
                <Typography variant="p" noWrap>
                  {news.email}
                </Typography>
              </Box>
            </Stack>
          ))}
        </Stack>
      )}
    </Card>
  );
}
