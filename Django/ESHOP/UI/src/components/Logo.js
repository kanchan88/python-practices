import PropTypes from 'prop-types';
// material
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

Logo.propTypes = {
  sx: PropTypes.object
};

export default function Logo({ sx }) {
  return (
    <center>
      <Box component="img" src="/static/logo.png" sx={{ height: 100, ...sx }} />
    </center>
  );
}
