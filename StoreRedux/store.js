import sportReducer, { sportsInitialState } from "./sportSlice";
import playersReducer, { playersInitialState } from "./playersSlice";
import { useMemo } from "react";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// const reducer = {
// 	sports: sportReducer,
// 	players: playersReducer
// };

const storeInitialState = {
	players: playersInitialState,
	sports: sportsInitialState
};

const rootReducer = combineReducers({
	sports: sportReducer,
	players: playersReducer
});

const persistConfig = {
	key: "primary",
	storage,
	whitelist: ["players"],
	blacklist: ["sports"]
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

function makeStore(initialState = storeInitialState) {
	return createStore(
		persistedReducer,
		initialState,
		composeWithDevTools(applyMiddleware())
	);
}

const store = makeStore();

export const initializeStore = preloadedState => {
	let _store = store ?? makeStore(preloadedState);

	// After navigating to a page with an initial Redux state, merge that state
	// with the current state in the store, and create a new store
	if (preloadedState && store) {
		_store = makeStore({
			...store.getState(),
			...preloadedState
		});
		// Reset the current store
		store = undefined;
	}

	// For SSG and SSR always create a new store
	if (typeof window === "undefined") return _store;
	// Create the store once in the client
	if (!store) store = _store;

	return _store;
};

export function useStore(initialState) {
	const store = useMemo(() => initializeStore(initialState), [initialState]);
	return store;
}

export default store;
