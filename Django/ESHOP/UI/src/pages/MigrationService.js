import { useFormik } from 'formik';
import { Link as RouterLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
// material
import { Container, Stack, Typography, Button, Icon } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Modal from '@mui/material/Modal';
import * as React from 'react';
import Box from '@mui/material/Box';
// components
import plusFill from '@iconify/icons-eva/plus-fill';
import Page from '../components/Page';
import { ProductList } from '../components/_dashboard/products';
//
import { getAllMigrationService } from '../_mocks_/repo/data';

export default function EcommerceShop() {
  const [openFilter, setOpenFilter] = useState(false);
  const [visaservices, setVisaServices] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [loader, setLoader] = useState(false);
  const [shownull, setShowNull] = useState(false);

  const init = () => {
    setLoader(true);
    getAllMigrationService().then((data) => {
      if (data === undefined) {
        setLoader(true);
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
      cover: visaservices[index].featured_image,
      name: visaservices[index].name,
      service: 'migration-service'
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
            Migration Services
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/dashboard/migration-service/add"
            icon={<Icon name="add" size={15} color="white" />}
          >
            Add Service
          </Button>
        </Stack>
        {loader ? (
          <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
            <CircularProgress color="secondary" />
          </Stack>
        ) : (
          <ProductList products={MIGRATIONSERVICELIST} />
        )}
      </Container>
    </Page>
  );
}
