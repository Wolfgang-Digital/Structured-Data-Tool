import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';

import { MainEntityType } from 'types';
import { RootState } from 'store';
import { deleteOrganization, deleteAllOrganizations } from '../Organizations/slice';
import { deleteWebPage, deleteAllWebPages } from '../WebPages/slice';

interface Slice {
  entities: Record<string, MainEntityType>
}

const slice = createSlice({
  name: 'mainEntities',
  initialState: {
    entities: {}
  } as Slice,
  reducers: {
    createOrUpdateMainEntity: (state, { payload }: PayloadAction<MainEntityType>) => {
      state.entities[payload.uuid] = payload;
    },

    deleteMainEntity: (state, { payload }: PayloadAction<string>) => {
      delete state.entities[payload];
    },

    deleteAllMainEntities: state => {
      state.entities = {};
    }
  },
  extraReducers: {
    [deleteOrganization.toString()]: (state, { payload }: PayloadAction<string>) => {
      state.entities = Object.values(state.entities).reduce((acc: Record<string, MainEntityType>, entity) => {
        if (entity.rootId !== payload) acc[entity.uuid] = entity;
        return acc;
      }, {});
    },

    [deleteAllOrganizations.toString()]: state => {
      state.entities = {};
    },

    [deleteWebPage.toString()]: (state, { payload }: PayloadAction<string>) => {
      state.entities = Object.values(state.entities).reduce((acc: Record<string, MainEntityType>, entity) => {
        if (entity.parentId !== payload) acc[entity.uuid] = entity;
        return acc;
      }, {});
    },

    [deleteAllWebPages.toString()]: state => {
      state.entities = {};
    }
  }
});

export const getMainEntities = createSelector(
  (state: RootState) => state.mainEntities,
  entities => entities.entities
);

export const getMainEntityList = createSelector(
  getMainEntities,
  entities => Object.values(entities)
);

export const {
  createOrUpdateMainEntity,
  deleteMainEntity,
  deleteAllMainEntities
} = slice.actions;

export default slice.reducer;