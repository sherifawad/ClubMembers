import { createSlice } from "@reduxjs/toolkit";

const initialState = [
	{
		id: 1,
		name: "Swimming",
		categories: [
			{
				normal: [
					{
						type: "Special Schools",
						price: 450
					},
					{
						type: "Schools",
						price: 250
					},
					{
						type: "Preparation",
						price: 250
					},
					{
						type: "Team",
						price: 150
					}
				]
			},
			{
				private: [
					{
						type: "Full",
						price: 1000
					},
					{
						type: "Disconnected",
						price: 600
					},
					{
						type: "Schools Group",
						price: 1800
					},
					{
						type: "Single Session",
						price: 50
					}
				]
			},
			{
				other: [
					{
						type: "Free Swimming",
						price: 30
					}
				]
			}
		]
	},
	{
		id: 2,
		name: "HandBall",
		categories: [
			{
				normal: [{ type: "Hand Ball", price: 150 }]
			}
		]
	}
];

const sportSlice = createSlice({
	name: "sports",
	initialState,
	reducers: {
		getSportsList: (state, { payload }) => {
			return { ...state };
		},
		getSportName: (state, { payload }) => {
			const sportExists = state.find(
				sport => sport.name === payload.name
			);
			if (sportExists) {
				return sportExists;
			}
			return null;
		},
		gerSportId: (state, { payload }) => {
			const sportExists = state.find(sport => sport.id === payload.id);

			if (sportExists) {
				return sportExists;
			}
			return null;
		},
		gerSportsCategories: (state, { id }) => {
			const { categories } = state.find(sport => sport.id === id);

			if (categories) {
				return categories;
			}
			return null;
		}
	}
});

export const { getSportsList, getSportName, gerSportId, gerSportsCategories } =
	sportSlice.actions;

export default sportSlice.reducer;
