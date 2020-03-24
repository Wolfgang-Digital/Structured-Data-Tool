import React from 'react';
import { Tabs, TabList, Tab, TabPanels, TabPanel, Grid } from '@chakra-ui/core';

import SchemaPreview from 'components/SchemaPreview';
import WebPageForm from '../features/WebPages/Form';
import MainEntityForm from '../features/MainEntities/Form';

const WebPagePage: React.FC = () => {
  return (
    <Tabs size="md" variantColor="teal">
      <TabList>
        <Tab>Web Page</Tab>
        <Tab>Main Entity</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Grid templateColumns="1fr minMax(300px, 1fr)">
            <WebPageForm />
            <SchemaPreview />
          </Grid>
        </TabPanel>
        <TabPanel>
          <Grid templateColumns="1fr minMax(300px, 1fr)">
            <MainEntityForm />
            <SchemaPreview />
          </Grid>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default WebPagePage;
