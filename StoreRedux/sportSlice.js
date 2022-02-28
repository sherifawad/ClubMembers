import { createSlice } from "@reduxjs/toolkit";

const initialState = [
	{
		id: 1,
		name: "Swimming",
		categories: [
			{
				name: "normal",
				type: [
					{
						Category: "Special Schools",
						price: 450
					},
					{
						Category: "Schools",
						price: 250
					},
					{
						Category: "Preparation",
						price: 250
					},
					{
						Category: "Team",
						price: 150
					}
				]
			},
			{
				name: "private",
				type: [
					{
						Category: "Full",
						price: 1000
					},
					{
						Category: "Disconnected",
						price: 600
					},
					{
						Category: "Schools Group",
						price: 1800
					},
					{
						Category: "Single Session",
						price: 50
					}
				]
			},
			{
				name: "Free",
				type: [
					{
						Category: "Free Swimming",
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
				name: "normal",
				type: [{ Category: "Hand Ball", price: 150 }]
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
