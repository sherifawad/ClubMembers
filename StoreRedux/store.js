import { configureStore } from "@reduxjs/toolkit";
import sportReducer from "./sportSlice";

const reducer = {
	sports: sportReducer
};

const store = configureStore({
	reducer
});

export default store;
