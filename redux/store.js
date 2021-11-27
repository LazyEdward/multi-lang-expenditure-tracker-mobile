import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducer from './reducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'

import { persistStore, persistReducer } from 'redux-persist';

const persistConfig = {
	key: 'root',
	storage: AsyncStorage,
	stateReconciler: autoMergeLevel2,
	blacklist: ['loading', 'tab']
};

const persistedReducer = persistReducer(persistConfig, reducer);

// const store = createStore(reducer, applyMiddleware(thunk));
export const store = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);

// export default store;