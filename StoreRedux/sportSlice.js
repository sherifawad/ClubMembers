import {
	createListenerMiddleware,
	createAsyncThunk,
	createSelector,
	createSlice
} from "@reduxjs/toolkit";
import sportsApi from "../services/sportsApi";
import { overWritePlayersState, updatePlayersSports } from "./playersSlice";

export const sportsInitialState = {
	loading: false,
	error: false,
	errorMessage: "",
	list: []
};

// const localServer = "http://localhost:3000/";
// export const fetchData = createAsyncThunk(
// 	"sports/fetchData",
// 	async (url, { dispatch }) => {
// 		const { data } = await axios(localServer + url);
// 		url === "channels"
// 			? dispatch(toolkitSlice.actions.setChannels(data))
// 			: dispatch(toolkitSlice.actions.setFilms(data));
// 	}
// );

export const fetchAllSports = createAsyncThunk(
	"sports/fetchAll",
	// async (_, { rejectWithValue, dispatch }) => {
	async (updatePlayers = true, { rejectWithValue, dispatch }) => {
		try {
			// fetch sports list from server
			const data = await sportsApi.fetchAll();
			if (updatePlayers) {
				// run updatePlayersSports action in players slice
				dispatch(updatePlayersSports(data));
			}
			// return data as payload
			return data;
		} catch (error) {
			// set custom error message
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			// return custom message as payload
			return rejectWithValue(message);
		}
	}
);

// Create the middleware instance and methods
export const listenerMiddleware = createListenerMiddleware();

// Add one or more listener entries that look for specific actions.
// They may contain any sync or async logic, similar to thunks.
listenerMiddleware.startListening({
	actionCreator: overWritePlayersState,
	effect: async (action, listenerApi) => {
		// Can cancel other running instances
		listenerApi.cancelActiveListeners();

		listenerApi.dispatch(fetchAllSports());
	}
});

const setLoading = state => {
	state.loading = true;
	state.error = false;
};

const setError = (state, { payload }) => {
	state.loading = false;
	state.error = true;
	state.errorMessage = payload;
};

const sportSlice = createSlice({
	name: "sports",
	initialState: sportsInitialState,
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
	},
	// NOTE: Functions in here will NOT be automatically converted to action creators
	extraReducers: {
		[fetchAllSports.pending]: setLoading,
		[fetchAllSports.fulfilled]: (state, { payload: sports }) => {
			state.loading = false;
			state.error = false;
			state.list = sports;
		},
		[fetchAllSports.rejected]: setError
	}
});

export const { getSportsList, getSportName, gerSportId, gerSportsCategories } =
	sportSlice.actions;

export const selectSports = createSelector(
	// state => {
	// 	if (state?.players?.playersState.length < 1) return state.sports;

	// 	const players = state.players.playersState.reduce(
	// 		(accPlayers, player) => {
	// 			console.log(
	// 				"🚀 ~ file: sportSlice.js ~ line 115 ~ player",
	// 				player
	// 			);
	// 			if (player?.sports?.length < 1) return;

	// 			const newSports = player.sports.reduce((accSports, sport) => {
	// 				// check sport in payload list
	// 				// if exists update data
	// 				let sportExist = state.sports.list.find(
	// 					s => s.id === sport.id
	// 				);
	// 				if (sportExist) {
	// 					console.log(
	// 						"🚀 ~ file: sportSlice.js ~ line 128 ~ newSports ~ sportExist",
	// 						sportExist
	// 					);
	// 					//get sport discount option and price to update
	// 					//get sport categories
	// 					const sportsCategories = sportExist["categories"];
	// 					if (sportsCategories?.length < 1) return;
	// 					// find a key which categories sub keys equal to player sport category => private === private
	// 					const categoryKey = sportsCategories.find(
	// 						cat => Object.keys(cat) == sport.category
	// 					);
	// 					if (!categoryKey) return;
	// 					// get selected category sport types
	// 					const sportTypes = categoryKey[`${sport.category}`];
	// 					//then find in the object key array a type equal to sport type  => full === full
	// 					if (sportTypes?.length < 1) return;
	// 					const { canDiscount, price } = sportTypes.find(
	// 						t => t["type"] === sport.type
	// 					);
	// 					// const { canDiscount, price } = sportExist["categories"]
	// 					// 	?.find(cat => Object.keys(cat) == sport.category)
	// 					// 	[`${sport.category}`]?.find(t => t["type"] === sport.type);

	// 					const newSport = {
	// 						...sportExist,
	// 						canDiscount: canDiscount,
	// 						price: price,
	// 						discount: -1,
	// 						total: -1
	// 					};
	// 					accSports.push(newSport);
	// 				}
	//                 console.log("🚀 ~ file: sportSlice.js ~ line 164 ~ newSports ~ accSports", accSports)
	// 				return accSports;
	// 			}, []);
	// 			let p = { ...player, sports: newSports };
	//             console.log("🚀 ~ file: sportSlice.js ~ line 166 ~ p", p)
	// 			accPlayers.push({ ...player, sports: newSports });

	// 			return accPlayers;
	// 		},
	// 		[]
	// 	);
	// 	console.log("🚀 ~ file: sportSlice.js ~ line 166 ~ players", players);
	// 	state.players = { ...state.players, playersState: players };
	// 	return state.sports;
	// },
	state => state.sports,
	sports => sports
);

export default sportSlice.reducer;
