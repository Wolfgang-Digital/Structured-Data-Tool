import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';
import { sortBy } from 'lodash';

import { OrganizationType } from 'types';
import { RootState } from 'store';

interface Slice {
  entities: Record<string, OrganizationType>
}

const slice = createSlice({
  name: 'organizations',
  initialState: {
    entities: {}
  } as Slice,
  reducers: {
    createOrUpdateOrganization: (state, { payload }: PayloadAction<OrganizationType>) => {
      state.entities[payload.uuid] = payload;
    },

    deleteOrganization: (state, { payload }: PayloadAction<string>) => {
      delete state.entities[payload];
    },

    deleteAllOrganizations: state => {
      state.entities = {};
    }
  }
});

export const getOrganizations = createSelector(
  (state: RootState) => state.organizations,
  organizations => organizations.entities
);

export const getOrganizationSnippets = createSelector(
  getOrganizations,
  organizations => {
    return sortBy(Object.values(organizations).map(organization => ({
      id: organization.uuid,
      name: organization.name
    })), 'name')
  }
);

export const {
  createOrUpdateOrganization,
  deleteOrganization,
  deleteAllOrganizations
} = slice.actions;

export default slice.reducer;