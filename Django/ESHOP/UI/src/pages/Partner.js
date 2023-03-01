import faker from 'faker';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { formatDistance } from 'date-fns';
import { Link as RouterLink } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
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

import { getAllPartners } from '../_mocks_/repo/data';
// ----------------------------------------------------------------------

export default function Partner() {
  const [partners, setPartner] = useState([]);
  const [loader, setLoader] = useState(false);

  const init = () => {
    setLoader(true);
    getAllPartners().then((data) => {
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

  const PARTNERS = partners.map((_, index) => {
    const setIndex = index + 1;
    return {
      id: partners[index].id,
      name: partners[index].name,
      logo: partners[index].logo,
      url: partners[index].url
    };
  });

  return (
    <Card>
      <Grid container spacing={2}>
        <Grid item xs={10}>
          <CardHeader title="Our Partners" />
        </Grid>
        <Grid item xs={2} mt={2}>
          <Button
            variant="contained"
            component={RouterLink}
            to="/dashboard/partner/add"
            icon={<Icon name="add" size={12} color="white" />}
          >
            Add Partner
          </Button>
        </Grid>
      </Grid>
      {loader === true ? (
        <Container m={10}>
          <CircularProgress color="secondary" />
        </Container>
      ) : (
        <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
          {PARTNERS.map((news) => (
            <SinglePartner key={news.id} partner={news} />
          ))}
        </Stack>
      )}
    </Card>
  );
}

SinglePartner.propTypes = {
  partner: PropTypes.object.isRequired
};

function SinglePartner({ partner }) {
  const { id, name, logo, url } = partner;

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Box
        component="img"
        alt={name}
        src={logo}
        sx={{ width: 'auto', height: 60, borderRadius: 1.0 }}
      />
      <Box sx={{ minWidth: 240 }}>
        <Link
          color="inherit"
          underline="hover"
          component={RouterLink}
          to={`/dashboard/partner/${id}`}
        >
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        </Link>
        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
          {url}
        </Typography>
      </Box>
    </Stack>
  );
}
