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
  CircularProgress,
  Container
} from '@mui/material';
import { useState, useEffect } from 'react';
import Page from '../components/Page';

import { getAllBlogNews } from '../_mocks_/repo/data';
// ----------------------------------------------------------------------

export default function Blog() {
  const [blognews, setBlogNews] = useState([]);
  const [loader, setLoader] = useState(false);

  const init = () => {
    setLoader(true);
    getAllBlogNews().then((data) => {
      if (data === undefined) {
        setLoader(true);
      } else {
        setBlogNews(data.data);
        setLoader(false);
      }
    });
  };
  useEffect(() => {
    init();
  }, []);

  const NEWS = blognews.map((_, index) => {
    const setIndex = index + 1;
    return {
      id: blognews[index].id,
      image: blognews[index].featured_image,
      title: blognews[index].name,
      category: blognews[index].category
    };
  });

  return (
    <Page title="Blog | BrainStrom">
      <Card>
        <Grid container spacing={2}>
          <Grid item xs={10}>
            <CardHeader title="News Update" />
          </Grid>
          <Grid item xs={2} mt={2}>
            <Button
              variant="contained"
              component={RouterLink}
              to="/dashboard/blog/add"
              icon={<Icon name="add" size={12} color="white" />}
            >
              Add Blog
            </Button>
          </Grid>
        </Grid>

        {loader === true ? (
          <Container m={10}>
            <CircularProgress color="secondary" />
          </Container>
        ) : (
          <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
            {NEWS.map((news) => (
              <NewsItem key={news.name} news={news} />
            ))}
          </Stack>
        )}

        <Divider />

        <Box sx={{ p: 2, textAlign: 'right' }}>
          <Button
            to="#"
            size="small"
            color="inherit"
            component={RouterLink}
            endIcon={<Icon icon={arrowIosForwardFill} />}
          >
            View all
          </Button>
        </Box>
      </Card>
    </Page>
  );
}

NewsItem.propTypes = {
  news: PropTypes.object.isRequired
};

function NewsItem({ news }) {
  const { id, image, title, category } = news;

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Box
        component="img"
        alt={title}
        src={image}
        sx={{ width: 80, height: 60, borderRadius: 1.0 }}
      />
      <Box sx={{ minWidth: 240 }}>
        <Link color="inherit" underline="hover" component={RouterLink} to={`/dashboard/blog/${id}`}>
          <Typography variant="subtitle2" noWrap>
            {title}
          </Typography>
        </Link>
        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
          {category}
        </Typography>
      </Box>
    </Stack>
  );
}
