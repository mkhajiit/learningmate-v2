import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
import authReducer from './auth';
import { locationReducer, positionReducer } from './location';
import userInfoReducer from './userInfo';
import userStore from './userStore';
import meetStore from './meetStore';

const rootReducer = combineReducers({
  auth: authReducer,
  location: locationReducer,
  position: positionReducer,
  userInfo: userInfoReducer,
  meetStore,
  userStore,
});

const persistConfig = {
  key: 'root',
  storage: storageSession,
  whitelist: ['auth', 'location', 'position', 'userInfo'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
