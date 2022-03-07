import { configureStore } from "@reduxjs/toolkit";
import sportReducer from "./sportSlice";
import playersReducer from "./playersSlice";

const reducer = {
	sports: sportReducer,
	players: playersReducer
};

const store = configureStore({
	reducer
});

export default store;
