import { createSlice } from "@reduxjs/toolkit";
import { nextPlayerId, saveToLocalStorage } from "../Data/utils";

export const playersInitialState = [];
// const initialState = [
// 	{
// 		id: 1,
// 		name: "Ahmed",
// 		sports: [
// 			{
// 				id: 1,
// 				name: "Swimming",
// 				categories: "Schools",
// 				price: 250,
// 				discount: 10,
// 				visaFees: 0,
// 				total: 225
// 			}
// 		]
// 	},
// 	{
// 		id: 2,
// 		name: "Ali",
// 		sports: [
// 			{
// 				id: 1,
// 				name: "Swimming",
// 				categories: "Team",
// 				price: 150,
// 				discount: 0,
// 				visaFees: 0,
// 				total: 150
// 			},
// 			{
// 				id: 2,
// 				name: "HandBall",
// 				categories: "Team",
// 				price: 150,
// 				discount: 10,
// 				visaFees: 0,
// 				total: 153
// 			}
// 		]
// 	}
// ];

const addItemToArray = (state, { payload }) => {
	state.push(payload);
};

const removeItemFromArray = (state, { payload }) => {
	// // Construct a new array immutably
	// const newState = state.filter(state => state.id !== payload);
	// // "Mutate" the existing state to save the new array
	// state = newState;
    state.splice(state.findIndex((arrow) => arrow.id === payload), 1);
};

const playersSlice = createSlice({
	name: "players",
	initialState: playersInitialState,
	reducers: {
		getPlayersList: (state, { payload }) => {
			return state;
		},
		getPlayerName: (state, { payload }) => {
			const playerExists = state.find(
				player => player.name.toLowerCase() === payload.toLowerCase()
			);
			if (playerExists) {
				return playerExists;
			}
			return null;
		},
		getPlayerId: (state, { payload }) => {
			const playerExists = state.find(player => player.id === payload);

			if (playerExists) {
				return playerExists;
			}
			return null;
		},
		getPlayerSportsList: (state, { id }) => {
			const playerExists = state.filter(
				player => player.id === payload.id
			);
			if (playerExists) {
				return playerExists.sports;
			}
			return [];
		},
		addPlayer: (state, { payload }) => {
			const newPlayer = payload;
			newPlayer.id = nextPlayerId(state);
			state.push(payload);
			// return [...state, newPlayer];
		},
		deletePlayer: removeItemFromArray,
		updatePlayer: (state, { payload }) => {
			const playerExists = state.find(player => player.id === payload.id);
			if (playerExists) {
				playerExists.name = payload.name;
				playerExists.sports = payload.sports;
			}
		}
	}
});

export const {
	getPlayersList,
	getPlayerName,
	getPlayerId,
	getPlayerSportsList,
	addPlayer,
	deletePlayer,
	updatePlayer
} = playersSlice.actions;

export default playersSlice.reducer;