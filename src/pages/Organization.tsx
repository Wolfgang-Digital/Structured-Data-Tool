import React from 'react';
import { Grid } from '@chakra-ui/core';

import Form from 'features/Organizations/Form';
import SchemaPreview from 'components/SchemaPreview';

const OrganizationPage: React.FC = () => {
  return (
    <Grid templateColumns="1fr minMax(300px, 1fr)">
      <Form />
      <SchemaPreview />
    </Grid>
  );
};

export default OrganizationPage;