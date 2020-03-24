import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';

import { WebPage } from 'types';
import { RootState } from 'store';
import { deleteOrganization, deleteAllOrganizations } from '../Organizations/slice';

interface Slice {
  entities: Record<string, WebPage>
}

const slice = createSlice({
  name: 'webPages',
  initialState: {
    entities: {}
  } as Slice,
  reducers: {
    createOrUpdateWebPage: (state, { payload }: PayloadAction<WebPage>) => {
      state.entities[payload.uuid] = payload;
    },

    deleteWebPage: (state, { payload }: PayloadAction<string>) => {
      delete state.entities[payload];
    },

    deleteAllWebPages: state => {
      state.entities = {};
    }
  },
  extraReducers: {
    [deleteOrganization.toString()]: (state, { payload }: PayloadAction<string>) => {
      state.entities = Object.entries(state.entities).reduce((acc: Record<string, WebPage>, [id, webPage]) => {
        if (webPage.parentId !== payload) acc[id] = webPage;
        return acc;
      }, {});
    },

    [deleteAllOrganizations.toString()]: state => {
      state.entities = {};
    }
  }
});

export const getWebPages = createSelector(
  (state: RootState) => state.webPages,
  webPages => webPages.entities
);

export const getWebPageSnippets = createSelector(
  getWebPages,
  webPages => {
    return Object.values(webPages).map(webPage => ({
      id: webPage.uuid,
      parentId: webPage.parentId,
      name: webPage.name
    }))
  }
);

export const {
  createOrUpdateWebPage,
  deleteWebPage,
  deleteAllWebPages
} = slice.actions;

export default slice.reducer;