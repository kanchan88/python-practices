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

import { getAllPages } from '../_mocks_/repo/data';
// ----------------------------------------------------------------------

export default function MainPages() {
  const [pages, setPages] = useState([]);

  const [loader, setLoader] = useState(false);
  const [shownull, setShowNull] = useState(false);

  const init = () => {
    setLoader(true);
    getAllPages().then((data) => {
      if (data === undefined) {
        setLoader(true);
      } else {
        setPages(data.data);
        setLoader(false);
      }
    });
  };
  useEffect(() => {
    init();
  }, []);

  const NEWS = pages.map((_, index) => {
    const setIndex = index + 1;
    return {
      id: pages[index].id,
      image: pages[index].featured_image,
      title: pages[index].name
    };
  });

  return (
    <Card>
      <Grid container spacing={2}>
        <Grid item xs={10}>
          <CardHeader title="All Pages" />
        </Grid>
        <Grid item xs={2} mt={2}>
          <Button
            variant="contained"
            component={RouterLink}
            to="/dashboard/pages/add"
            icon={<Icon name="add" size={12} color="white" />}
          >
            Add New Page
          </Button>
        </Grid>
      </Grid>

      {loader ? (
        <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row" mt={5} mb={5} ml={5}>
          <CircularProgress color="secondary" />
        </Stack>
      ) : (
        <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
          {NEWS.length === 0 ? (
            <Container> Oops. No data! But you can always add one! </Container>
          ) : (
            NEWS.map((news) => <NewsItem key={news.name} news={news} />)
          )}
        </Stack>
      )}
    </Card>
  );
}

NewsItem.propTypes = {
  news: PropTypes.object.isRequired
};

function NewsItem({ news }) {
  const { id, image, title } = news;

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Box
        component="img"
        alt={title}
        src={image}
        sx={{ width: 80, height: 60, borderRadius: 1.0 }}
      />
      <Box sx={{ minWidth: 240 }}>
        <Link color="inherit" underline="hover" component={RouterLink} to={`/dashboard/page/${id}`}>
          <Typography variant="subtitle2" noWrap>
            {title}
          </Typography>
        </Link>
      </Box>
    </Stack>
  );
}
