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
	if (state?.playersState.length < 1) return { ...state };
	const players = state.playersState.reduce((accPlayers, player) => {
		if (player?.sports?.length < 1) return null;
		const newSports = player.sports.reduce((accSports, sport) => {
			// check sport in payload list
			// if exists update data
			let sportExist = payload.find(s => s.id === sport.id);
			if (sportExist) {
				// get sport discount option and price to update
				//get sport categories
				const sportsCategories = sportExist["categories"];
				if (sportsCategories?.length < 1) return accSports;
				// find a key which categories sub keys equal to player sport category => private === private
				const categoryKey = sportsCategories.find(
					cat => Object.keys(cat) == sport.category
				);
				if (!categoryKey) return accSports;
				// get selected category sport types
				const sportTypes = categoryKey[`${sport.category}`];
				//then find in the object key array a type equal to sport type  => full === full
				if (sportTypes?.length < 1) return accSports;
				const sportDetails = sportTypes.find(
					t => t["type"] === sport.type
				);
				if (!sportDetails || sportDetails === undefined)
					return accSports;
				// const { canDiscount, price } = sportExist["categories"]
				// 	?.find(cat => Object.keys(cat) == sport.category)
				// 	[`${sport.category}`]?.find(t => t["type"] === sport.type);
				// if (!canDiscount || !price) return;
				const newSport = {
					id: sport.id,
					name: sport.name,
					category: sport.category,
					type: sport.type,
					canDiscount: sportDetails.canDiscount,
					price: sportDetails.price,
					discount: -1,
					total: -1
				};
				accSports.push(newSport);
			}
			return accSports;
		}, []);
		player.sports = newSports || [];
		accPlayers.push(player || {});
		return accPlayers;
	}, []);

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
