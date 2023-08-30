import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import postReducers from './reducer';
import { fetchUsersEpic, listProductHome, registerEpic, listProductWarehouse } from './usersEpic';

// Disable the problematic middleware
const customizedMiddleware = getDefaultMiddleware({
    serializableCheck: false,
    immutableCheck: false,
});

const epicMiddleware = createEpicMiddleware();

const rootEpic = combineEpics(fetchUsersEpic, registerEpic, listProductHome, listProductWarehouse);

const store = configureStore({
    reducer: {
        postReducers,
    },
    middleware: [...customizedMiddleware, epicMiddleware], // Use the customizedMiddleware here
});

epicMiddleware.run(rootEpic);

export default store;
