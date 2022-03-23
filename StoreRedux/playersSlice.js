import { createSelector, createSlice } from "@reduxjs/toolkit";
import { nextPlayerId } from "../Data/utils";

export const playersInitialState = {
	SchoolGroupSelected: false,
	playersState: []
};

const addItemToArray = (state, { payload }) => {
	state.push(payload);
};

const updatePlayersSportsData = (state, { payload }) => {
    if(!state?.playersState) return;
console.log("🚀 ~ file: playersSlice.js ~ line 14 ~ updatePlayersSportsData ~ state", state)
	const players = state.playersState.reduce((accPlayers, player) => {
		const sports = player.sports.reduce((accSports, sport) => {
			let newSport = { ...sport };
			// check sport in payload list
			// if exists update data
			let sportExist = payload.find(s => s.id === newSport.id);
			if (sportExist) {
				newSport = { ...sportExist };
				accSports.push(newSport);
			}
			return accSports;
		}, []);
		player.sports = sports;
		accPlayers.push(player);
		return accPlayers;
	}, []);

	console.log(
		"🚀 ~ file: playersSlice.js ~ line 30 ~ state.playersState=state.playersState.reduce ~ state.playersState",
		players
	);
	state.playersState = players;
};

const removeItemFromArray = (state, { payload }) => {
	// // Construct a new array immutably
	// const newState = state.filter(state => state.id !== payload);
	// // "Mutate" the existing state to save the new array
	// state = newState;
	state.playersState.splice(
		state.playersState.findIndex(arrow => arrow.id === payload),
		1
	);
};

const playersSlice = createSlice({
	name: "players",
	initialState: playersInitialState,
	reducers: {
		getPlayersList: (state, { payload }) => {
			return state.playersState;
		},
		getPlayerName: (state, { payload }) => {
			const playerExists = state.playersState.find(
				player => player.name.toLowerCase() === payload.toLowerCase()
			);
			if (playerExists) {
				return playerExists;
			}
			return null;
		},
		getPlayerId: (state, { payload }) => {
			const playerExists = state.playersState.find(
				player => player.id === payload
			);

			if (playerExists) {
				return playerExists;
			}
			return null;
		},
		getPlayerSportsList: (state, { id }) => {
			const playerExists = state.playersState.filter(
				player => player.id === payload.id
			);
			if (playerExists) {
				return playerExists.sports;
			}
			return [];
		},
		addPlayer: (state, { payload }) => {
			const newPlayer = payload;
			newPlayer.id = nextPlayerId(state.playersState);
			state.playersState.push(newPlayer);
			// return [...state.playersState, newPlayer];
		},
		deletePlayer: removeItemFromArray,
		updatePlayer: (state, { payload }) => {
			const playerIndex = state.playersState.findIndex(
				player => player.id === payload.id
			);
			if (playerIndex > -1) {
				state.playersState[playerIndex].name = payload.name;
				state.playersState[playerIndex].sports = payload.sports;
			}
		},
		setSchoolGroup: (state, { payload }) => {
			return {
				...state,
				SchoolGroupSelected: true
			};
		},
		removeSchoolGroup: (state, { payload }) => {
			return {
				...state,
				SchoolGroupSelected: false
			};
		},
		updatePlayersSports: updatePlayersSportsData
	}
});

export const {
	getPlayersList,
	getPlayerName,
	getPlayerId,
	getPlayerSportsList,
	addPlayer,
	deletePlayer,
	updatePlayer,
	setSchoolGroup,
	removeSchoolGroup,
	updatePlayersSports
} = playersSlice.actions;

export const selectPlayers = createSelector(
	state => state.players,
	players => players.playersState
);

export default playersSlice.reducer;
