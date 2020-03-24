import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { throttle } from 'lodash';

import { saveState, loadState } from './utils/storage';
import organizations from './features/Organizations/slice';
import webPages from './features/WebPages/slice';
import mainEntities from './features/MainEntities/slice';

const reducer = combineReducers({
  organizations,
  webPages,
  mainEntities
});

const store = configureStore({
  reducer,
  devTools: process.env.NODE_END !== 'production',
  preloadedState: {
    organizations: loadState('organizations', { entities: {} }),
    webPages: loadState('webPages', { entities: {} }),
    mainEntities: loadState('mainEntities', { entities: {} })
  }
});

store.subscribe(throttle(() => {
  const state = store.getState();
  saveState('organizations', state.organizations);
  saveState('webPages', state.webPages);
  saveState('mainEntities', state.mainEntities);
}, 250));

export type RootState = ReturnType<typeof reducer>
export default store;