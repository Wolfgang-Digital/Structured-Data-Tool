import React from 'react';
import {
  Box,
  Grid,
  Link,
  Image,
  Stack,
  PseudoBox,
  Flex,
  Heading,
  Button,
  IconButton,
  Tooltip,
  useColorMode,
  Collapse
} from '@chakra-ui/core';
import { useSelector } from 'react-redux';
import { Link as RouterLink, useRouteMatch } from 'react-router-dom';
import { get } from 'lodash';

import { getOrganizationSnippets } from 'features/Organizations/slice';
import { getWebPageSnippets } from 'features/WebPages/slice';

interface LinkProps {
  id: string;
  name: string;
  pages: {
    id: string;
    parentId: string;
    name: string;
  }[];
}

interface SubLinkProps {
  id: string;
  parentId: string;
  name: string;
  match: boolean;
}

const SidebarSubLink: React.FC<SubLinkProps> = ({ id, parentId, name, match }) => {
  return (
    <PseudoBox
      key={id}
      pl={5}
      pr={3}
      fontWeight={400}
      color="gray.700"
      _hover={{ transform: 'translateX(4px)' }}
      transition="200ms ease-out"
      cursor="pointer"
      width="100%"
    >
      <Link
        // @ts-ignore
        as={RouterLink}
        to={`/organizations/${parentId}/web-pages/${id}`}
        display="flex"
        _focus={{ boxShadow: 0 }}
        _hover={{ textDecoration: 0 }}
        color="gray.600"
        width="100%"
        fontSize="md"
        fontWeight={!!match ? 500 : 400}
      >
        {name}
      </Link>
    </PseudoBox>
  );
};

const SidebarLink: React.FC<LinkProps> = ({ id, name, pages }) => {
  const match = useRouteMatch(`/organizations/${id}`);
  const subMatch = useRouteMatch(`/organizations/${id}/web-pages/:id`);

  return (
    <Box>
      <Flex align="center" justify="space-between" pr={3}>
        <PseudoBox
          px={3}
          py={1}
          fontWeight={400}
          color="gray.700"
          _hover={{ transform: 'translateX(4px)' }}
          transition="200ms ease-out"
          cursor="pointer"
          width="100%"
        >
          <Link
            // @ts-ignore
            as={RouterLink}
            to={`/organizations/${id}`}
            display="flex"
            _focus={{ boxShadow: 0 }}
            _hover={{ textDecoration: 0 }}
            color={!!match ? 'purple.500' : 'gray.500'}
            width="100%"
            fontSize="md"
            fontWeight={500}
          >
            {name}
          </Link>
        </PseudoBox>
        <PseudoBox opacity={!!match ? 1 : 0} transition="200ms ease-out">
          <RouterLink to={`/organizations/${id}/web-pages`}>
            <Tooltip label="New Web Page" aria-label="New Web Page" showDelay={250}>
              <IconButton icon="add" aria-label="New Web Page" size="sm" variant="ghost" variantColor="purple" />
            </Tooltip>
          </RouterLink>
        </PseudoBox>
      </Flex>
      <Collapse isOpen={!!match}>
        <Stack spacing={1}>
          {pages.map(page => (
            <SidebarSubLink key={page.id} match={get(subMatch, 'params.id') === page.id} {...page} />
          ))}
        </Stack>
      </Collapse>
    </Box>
  );
};

const Sidebar: React.FC = () => {
  const organizations = useSelector(getOrganizationSnippets);
  const webPages = useSelector(getWebPageSnippets);

  const { colorMode } = useColorMode();

  const background = { light: 'white', dark: 'unset' };

  return (
    <Box
      as="nav"
      position="sticky"
      top={0}
      height="100vh"
      width="100%"
      gridArea="sidebar"
      borderRight="1px solid"
      borderColor="gray.200"
      backgroundColor={background[colorMode]}
    >
      <Grid templateColumns="minmax(0px, 1fr)" templateRows="72px 1fr">
        <Link href="https://wolfgangdigital.com" isExternal borderBottom="1px solid" borderColor="gray.200">
          <Image src="/static/wolfgang_logo.png" height="100%" margin="auto" alt="Wolfgang Digital logo" />
        </Link>
        <Stack overflowY="auto" height="calc(100vh - 72px)">
          <Flex px={3} py={2} mt={1} alignItems="center">
            <Heading as="h3" size="sm" color="gray.600" mr="auto">
              Organizations
            </Heading>
            <RouterLink to="/organizations">
              <Button size="xs" variant="outline" variantColor="teal">
                New
              </Button>
            </RouterLink>
          </Flex>
          {organizations.map(organization => {
            const pages = webPages.filter(webPage => webPage.parentId === organization.id);
            return <SidebarLink key={organization.id} pages={pages} {...organization} />;
          })}
        </Stack>
      </Grid>
    </Box>
  );
};

export default Sidebar;
