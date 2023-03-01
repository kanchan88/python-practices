import * as React from 'react';
import { Container, Grid, Typography, Button, Stack, Icon } from '@mui/material';

/* global gapi */
// prettier-ignore

export default function EventBookSuccess() {

  return (
    <Container>
        <Typography mt={15} mb={2} variant="h6">
          You meeting is successfully scheduled... See you!
        </Typography>
    </Container>
  );
}
