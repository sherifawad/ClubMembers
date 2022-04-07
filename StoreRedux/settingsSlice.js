import { createSelector, createSlice } from "@reduxjs/toolkit";

export const settingsInitialState = {
	language: ""
};

const settingsSlice = createSlice({
	name: "settings",
	initialState: settingsInitialState,
	reducers: {
		setLanguage: (state, { payload }) => {
			switch (payload) {
				case "en":
					state.language = "en";
					break;
				case "ar":
					state.language = "ar";
					break;
				default:
					break;
			}
		}
	}
});

export const { setLanguage } = settingsSlice.actions;

export const selectSettingsLanguage = createSelector(
	state => state.settings,
	settings => settings.language
);

export default settingsSlice.reducer;
