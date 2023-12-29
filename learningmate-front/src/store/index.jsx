import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
import authReducer from './auth';
import locationReducer from './location'

const rootReducer = combineReducers({
    auth: authReducer,
    location: locationReducer
});
//redux-persist사용
const persistConfig = {
    key: 'root',
    storage: storageSession,
    whitelist: ['auth', 'location'], //리듀서의 이름이 들어가야함
};
//persistReducer를 사용하여 Redux reducer를 감싸고, configureStore에 전달합니다.
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    //reducer객체의 키가 여러개일경우 키는 state의 진입점이 됨
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export default store;
