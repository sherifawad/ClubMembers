import { createSlice } from "@reduxjs/toolkit";

const initialState = [
	{
		id: 1,
		name: "Ahmed",
		sports: [
			{
				id: 1,
				name: "Swimming",
				categories: "Schools",
				price: 250,
				discount: 10,
				visaFees: 0,
				total: 225
			}
		]
	},
	{
		id: 2,
		name: "Ali",
		sports: [
			{
				id: 1,
				name: "Swimming",
				categories: "Team",
				price: 150,
				discount: 0,
				visaFees: 0,
				total: 150
			},
			{
				id: 2,
				name: "HandBall",
				categories: "Team",
				price: 150,
				discount: 10,
				visaFees: 0,
				total: 153
			}
		]
	}
];

function nextPlayerId(players) {
	const maxId = players.reduce(
		(maxId, player) => Math.max(player.id, maxId),
		-1
	);
	return maxId + 1;
}

const playersSlice = createSlice({
	name: "players",
	initialState,
	reducers: {
		getPlayersList: (state, { payload }) => {
			return { ...state };
		},
		getPlayerName: (state, { payload }) => {
			const playerExists = state.find(
				player =>
					player.name.toLowerCase() === payload.name.toLowerCase()
			);
			if (playerExists) {
				return playerExists;
			}
			return null;
		},
		getPlayerId: (state, { payload }) => {
			const playerExists = state.find(player => player.id === payload.id);

			if (playerExists) {
				return playerExists;
			}
			return null;
		},
		getPlayerSportsList: (state, { id }) => {
			const playerExists = state.find(player => player.id === payload.id);
			if (playerExists) {
				return playerExists.sports;
			}
			return [];
		},
		addPlayer: (state, { payload }) => {
			const newPlayer = payload;
			newPlayer.id = nextPlayerId(state);
			return [...state, newPlayer];
		}
	}
});

export const {
	getPlayersList,
	getPlayerName,
	getPlayerId,
	getPlayerSportsList,
	addPlayer
} = playersSlice.actions;

export default playersSlice.reducer;
