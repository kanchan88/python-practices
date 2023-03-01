import PropTypes from 'prop-types';
// material
import { Grid, Container } from '@mui/material';
import ShopProductCard from './ProductCard';

// ----------------------------------------------------------------------

VisaServiceList.propTypes = {
  products: PropTypes.array.isRequired
};

export default function VisaServiceList({ products, ...other }) {
  return (
    <Grid container spacing={3} {...other}>
      {products.length === 0 ? (
        <Container> Oops. No data! But you can always add one! </Container>
      ) : (
        products.map((product) => (
          <Grid key={product.id} item xs={12} sm={6} md={3}>
            <ShopProductCard product={product} />
          </Grid>
        ))
      )}
    </Grid>
  );
}
