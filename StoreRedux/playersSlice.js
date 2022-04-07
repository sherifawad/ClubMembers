import {
	createListenerMiddleware,
	createSelector,
	createSlice
} from "@reduxjs/toolkit";
import { nextPlayerId } from "../Data/utils";

export const playersInitialState = {
	year: 0,
	code: 0,
	SchoolGroupSelected: false,
	playersState: []
};

const addItemToArray = (state, { payload }) => {
	state.push(payload);
};

const updatePlayersSportsData = (state, { payload }) => {
	state.SchoolGroupSelected = false;
	state.year = 0;
	state.code = 0;
	if (state?.playersState.length < 1) return { ...state };
	const players = state.playersState.reduce((accPlayers, player) => {
		if (player?.sports?.length < 1) return null;
		const newSports = player.sports.reduce((accSports, sport) => {
			// check sport in payload list
			const resultSport = payload.find(s => s.id === sport.id);
			if (!resultSport) return accSports;
			// find category id match
			const resultCategory = resultSport.categories.find(
				c => c.id === sport.categoryId
			);
			if (!resultCategory) return accSports;
			// find sport type id match
			const resultType = resultCategory.value.find(
				v => v.id === sport.typeId
			);
			if (!resultType) return accSports;

			const newSport = {
				...sport,
				canDiscount: sport.canDiscount,
				penalty: sport.penalty,
				price: sport.price,
				discount: -1,
				penaltyFees: 0,
				total: -1
			};
			accSports.push(newSport);
			// if specified sport exists change state
			if (newSport.id === 1 && newSport.typeId) {
				state.SchoolGroupSelected = false;
			}

			return accSports;
		}, []);
		// if no sports skip
		if (newSports?.length < 1) return accPlayers;
		player.sports = newSports || [];
		accPlayers.push(player || {});
		return accPlayers;
	}, []);

	state.playersState = players;
};

const overWriteSliceState = (state, { payload }) => {
	state.year = payload.year;
	state.code = payload.code;
	state.SchoolGroupSelected = payload.schoolGroupSelected;
	state.playersState = payload.list;
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
	// if no players remove code and year
	if (state.playersState?.length < 1) {
		state.year = 0;
		state.code = 0;
	}
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
			state.SchoolGroupSelected = true;
		},
		removeSchoolGroup: (state, { payload }) => {
			state.SchoolGroupSelected = false;
		},
		setYear: (state, { payload }) => {
			return {
				...state,
				year: parseInt(payload)
			};
		},
		setCode: (state, { payload }) => {
			return {
				...state,
				code: parseInt(payload)
			};
		},
		updatePlayersSports: updatePlayersSportsData,
		overWritePlayersState: overWriteSliceState
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
	updatePlayersSports,
	setYear,
	setCode,
	overWritePlayersState
} = playersSlice.actions;

export const selectPlayers = createSelector(
	state => state.players,
	players => players.playersState
);

export const SelectPrivateSchoolGroup = createSelector(
	state => state.players,
	players => players.SchoolGroupSelected
);

export default playersSlice.reducer;
