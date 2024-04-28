import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from '../reducer';

const persistConfig = {
  key: 'root',
  storage: storage,
  blacklist: ['app']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check as persistor is non-serializable
    }),
  devTools: process.env.NODE_ENV !== 'production' ? true : false // Devtools should be boolean
});

const persistor = persistStore(store);

export { store, persistor };
