import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { Link as RouterLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';

// material
import {
  Container,
  Stack,
  Typography,
  Button,
  Icon,
  Card,
  Link,
  Grid,
  CircularProgress
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import Modal from '@mui/material/Modal';
import * as React from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
// components
import plusFill from '@iconify/icons-eva/plus-fill';
import Page from '../components/Page';
import { ProductList } from '../components/_dashboard/products';

//
import { getAllMedia, getAllSuccessStory } from '../_mocks_/repo/data';

const ProductImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

export default function SuccessStory() {
  const [openFilter, setOpenFilter] = useState(false);
  const [visaservices, setVisaServices] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [open, setOpen] = React.useState(false);

  const [loader, setLoader] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const init = () => {
    setLoader(true);
    getAllSuccessStory().then((data) => {
      if (data.error) {
        console.log('ERR');
      } else {
        setVisaServices(data.data);
        setLoader(false);
      }
    });
  };
  useEffect(() => {
    init();
  }, []);

  const MIGRATIONSERVICELIST = visaservices.map((_, index) => {
    const setIndex = index + 1;
    return {
      id: visaservices[index].id,
      image: visaservices[index].image,
      name: visaservices[index].name,
      description: visaservices[index].description
    };
  });

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  return (
    <Page title="Dashboard | Brainstrom">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            All Happy Faces
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/dashboard/success-story/add"
            icon={<Icon name="add" size={15} color="white" />}
          >
            Add Success Story
          </Button>
        </Stack>
        {loader === true ? (
          <Grid container justifyContent="center">
            <CircularProgress color="secondary" />
          </Grid>
        ) : (
          <Grid container spacing={1}>
            {MIGRATIONSERVICELIST.map((service) => (
              <Grid item key={service.id}>
                <ImageCard images={service} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Page>
  );
}

function ImageCard({ images }) {
  const { id, name, image } = images;
  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        <ProductImgStyle alt={name} src={image} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link
          to={`/dashboard/success-story/${id}`}
          color="inherit"
          underline="hover"
          component={RouterLink}
        >
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        </Link>
      </Stack>
    </Card>
  );
}
