import {
	createAsyncThunk,
	createSelector,
	createSlice
} from "@reduxjs/toolkit";
import sportsApi from "../services/sportsApi";
import { updatePlayersSports } from "./playersSlice";

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
	async (_, { rejectWithValue, dispatch }) => {
		try {
			// thunkAPI has a method to get any state value from the redux store
			const data = await sportsApi.fetchAll();
			dispatch(updatePlayersSports(data));
			return data;
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			return rejectWithValue(message);
		}
	}
);

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
	// 	if (!state?.players?.playersState) return;
	// 	console.log(
	// 		"🚀 ~ file: playersSlice.js ~ line 14 ~ updatePlayersSportsData ~ state",
	// 		state
	// 	);
	// 	const players = state.players.playersState.reduce(
	// 		(accPlayers, player) => {
	// 			const newSports = player.sports.reduce((accSports, sport) => {
	// 				let newSport = { ...sport };
	// 				// check sport in payload list
	// 				// if exists update data
	// 				let sportExist = state.sports.list.find(
	// 					s => s.id === newSport.id
	// 				);
	// 				if (sportExist) {
	// 					newSport = { ...sportExist };
	// 					accSports.push(newSport);
	// 				}
	// 				return accSports;
	// 			}, []);
	// 			player.sports = newSports;
	// 			accPlayers.push(player);
	// 			return accPlayers;
	// 		},
	// 		[]
	// 	);
	// 	state.players.playersState = players;
	// 	return state.sports;
	// },
	state => state.sports,
	sports => sports
);

export default sportSlice.reducer;
