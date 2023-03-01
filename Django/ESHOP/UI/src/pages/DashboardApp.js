// material
import { Box, Grid, Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';

export default function DashboardApp() {
  return (
    <Page title="HOME | BIZHOPS">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Hi, Alphateds Technology</Typography>
          Here is your business summary!
        </Box>
      </Container>
    </Page>
  );
}
