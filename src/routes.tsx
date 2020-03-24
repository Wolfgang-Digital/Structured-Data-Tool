import React from 'react';
import { Redirect } from 'react-router-dom';

import { RouteWithSubrouteProps } from './types';
import { RenderRoutes } from 'components/Routes';

const routes: RouteWithSubrouteProps[] = [
  {
    path: '/',
    key: 'ROOT',
    exact: true,
    component: () => <Redirect to="/organizations" />
  },
  {
    path: '/organizations',
    key: 'ORGANIZATIONS',
    component: RenderRoutes,
    routes: [
      {
        path: '/organizations/:id?',
        key: 'ORGANIZATION_FORM',
        exact: true,
        component: React.lazy(() => import('pages/Organization'))
      },
      {
        path: '/organizations/:organizationId?/web-pages/:webPageId?',
        key: 'WEB_PAGE_FORM',
        exact: true,
        component: React.lazy(() => import('pages/WebPage'))
      }
    ]
  }
];

export default routes;