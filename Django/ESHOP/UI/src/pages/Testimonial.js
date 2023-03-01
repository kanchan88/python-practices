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
  alertTitleClasses,
  Container,
  CircularProgress
} from '@mui/material';
import { useState, useEffect } from 'react';

import { getAllTestimonial } from '../_mocks_/repo/data';
// ----------------------------------------------------------------------

export default function Testimonial() {
  const [testimonies, setTestimonies] = useState([]);
  const [loader, setLoader] = useState(false);

  const init = () => {
    setLoader(true);
    getAllTestimonial().then((data) => {
      if (data === undefined) {
        setLoader(true);
      } else {
        setTestimonies(data.data);
        setLoader(false);
      }
    });
  };
  useEffect(() => {
    init();
  }, []);

  const PARTNERS = testimonies.map((_, index) => {
    const setIndex = index + 1;
    return {
      id: testimonies[index].id,
      name: testimonies[index].name,
      title: testimonies[index].title,
      content: testimonies[index].content,
      reviewerImage: testimonies[index].reviewer_image,
      youtubeLink: testimonies[index].youtube_link
    };
  });

  return (
    <Card>
      <Grid container spacing={2}>
        <Grid item xs={10}>
          <CardHeader title="Happy Customers!!" />
        </Grid>
        <Grid item xs={2} mt={2}>
          <Button
            variant="contained"
            component={RouterLink}
            to="/dashboard/testimonial/add"
            icon={<Icon name="add" size={12} color="white" />}
          >
            Add Review
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
  const { id, name, title, content, reviewerImage, youtubeLink } = partner;

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Box
        component="img"
        alt={name}
        src={reviewerImage}
        sx={{ width: 'auto', height: 60, borderRadius: 1.0 }}
      />
      <Box sx={{ minWidth: 240 }}>
        <Link
          color="inherit"
          underline="hover"
          component={RouterLink}
          to={`/dashboard/testimonial/${id}`}
        >
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        </Link>
        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
          {title}
        </Typography>
      </Box>
    </Stack>
  );
}
