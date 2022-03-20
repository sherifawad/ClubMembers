import { createSlice } from "@reduxjs/toolkit";

export const sportsInitialState = [
	{
		id: 1,
		name: "Swimming",
		categories: [
			{
				normal: [
					{
						type: "Special Schools",
						canDiscount: true,
						price: 450
					},
					{
						type: "Schools",
						canDiscount: true,
						price: 250
					},
					{
						type: "Preparation",
						canDiscount: true,
						price: 250
					},
					{
						type: "Team",
						canDiscount: true,
						price: 150
					}
				]
			},
			{
				private: [
					{
						type: "Full",
						canDiscount: true,
						price: 1000
					},
					{
						type: "Disconnected",
						canDiscount: true,
						price: 600
					},
					{
						type: "Schools Group",
						canDiscount: true,
						price: 1800
					},
					{
						type: "Single Session",
						canDiscount: false,
						price: 50
					}
				]
			},
			{
				other: [
					{
						type: "Free Swimming",
						canDiscount: false,
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
				normal: [{ type: "Hand Ball", canDiscount: true, price: 150 }]
			}
		]
	},
	{
		id: 3,
		name: "BasketBall",
		categories: [
			{
				normal: [{ type: "Basket Ball", canDiscount: true, price: 150 }]
			}
		]
	},
	{
		id: 4,
		name: "VolleyBall",
		categories: [
			{
				normal: [{ type: "Volley Ball", canDiscount: true, price: 150 }]
			}
		]
	},
	{
		id: 5,
		name: "FootBall",
		categories: [
			{
				normal: [
					{ type: "Special", canDiscount: true, price: 250 },
					{ type: "regular", canDiscount: true, price: 150 }
				]
			}
		]
	},
	{
		id: 6,
		name: "Taekwondo",
		categories: [
			{
				normal: [{ type: "Taekwondo", canDiscount: true, price: 150 }]
			}
		]
	},
	{
		id: 7,
		name: "Karate",
		categories: [
			{
				normal: [{ type: "Karate", canDiscount: true, price: 150 }]
			}
		]
	},
	{
		id: 8,
		name: "Boxing",
		categories: [
			{
				normal: [{ type: "Boxing", canDiscount: true, price: 150 }]
			}
		]
	},
	{
		id: 9,
		name: "Judo",
		categories: [
			{
				normal: [{ type: "Judo", canDiscount: true, price: 150 }]
			}
		]
	},
	{
		id: 10,
		name: "Bodybuilding",
		categories: [
			{
				normal: [
					{ type: "Bodybuilding", canDiscount: true, price: 150 }
				]
			}
		]
	},
	{
		id: 11,
		name: "Weightlifting",
		categories: [
			{
				normal: [
					{ type: "Weightlifting", canDiscount: true, price: 150 }
				]
			}
		]
	},
	{
		id: 12,
		name: "PingPong",
		categories: [
			{
				normal: [{ type: "PingPong", canDiscount: true, price: 150 }]
			},
			{
				other: [
					{
						type: "Rental",
						canDiscount: false,
						price: 25
					}
				]
			}
		]
	},
	{
		id: 13,
		name: "ModernPentathlon",
		categories: [
			{
				normal: [
					{ type: "laser-run", canDiscount: true, price: 200 },
					{
						type: "Swimming laser-run",
						canDiscount: true,
						price: 250
					}
				]
			}
		]
	},
	{
		id: 14,
		name: "Squash",
		categories: [
			{
				normal: [
					{
						type: "Schools",
						canDiscount: true,
						price: 350
					},
					{
						type: "Team",
						canDiscount: true,
						price: 400
					}
				]
			},
			{
				private: [
					{
						type: "Private",
						canDiscount: false,
						price: 75
					}
				]
			},
			{
				other: [
					{
						type: "Team-Rental",
						canDiscount: false,
						price: 35
					},

					{
						type: "Regular-Rental",
						canDiscount: false,
						price: 75
					}
				]
			}
		]
	},
	{
		id: 15,
		name: "Tennis",
		categories: [
			{
				normal: [
					{
						type: "Schools",
						canDiscount: true,
						price: 300
					},
					{
						type: "Team",
						canDiscount: true,
						price: 450
					}
				]
			},
			{
				private: [
					{
						type: "Morning-Single",
						canDiscount: false,
						price: 60
					},
					{
						type: "Morning-Double",
						canDiscount: false,
						price: 70
					},
					{
						type: "Morning-Triple",
						canDiscount: false,
						price: 90
					},
					{
						type: "Evening-Single",
						canDiscount: false,
						price: 90
					},
					{
						type: "Evening-Double",
						canDiscount: false,
						price: 130
					},
					{
						type: "Evening-Triple",
						canDiscount: false,
						price: 135
					}
				]
			},
			{
				other: [
					{
						type: "Morning-Rental",
						canDiscount: false,
						price: 40
					},

					{
						type: "Evening-Rental",
						canDiscount: false,
						price: 100
					}
				]
			}
		]
	},
	{
		id: 16,
		name: "Athletics",
		categories: [
			{
				normal: [
					{
						type: "Normal",
						canDiscount: true,
						price: 200
					}
				]
			},
			{
				private: [
					{
						type: "Private",
						canDiscount: false,
						price: 100
					}
				]
			}
		]
	},
	{
		id: 17,
		name: "Gymnastics",
		categories: [
			{
				normal: [
					{
						type: "Artistic",
						canDiscount: true,
						price: 200
					},
					{
						type: "Aerobic",
						canDiscount: true,
						price: 300
					}
				]
			},
			{
				private: [
					{
						type: "Single Session",
						canDiscount: false,
						price: 50
					}
				]
			}
		]
	},
	{
		id: 18,
		name: "Sheesh",
		categories: [
			{
				normal: [
					{
						type: "Sheesh",
						canDiscount: true,
						price: 200
					}
				]
			},
			{
				private: [
					{
						type: "Single Session",
						canDiscount: false,
						price: 40
					}
				]
			}
		]
	},
	{
		id: 19,
		name: "GYM",
		categories: [
			{
				normal: [
					{
						type: "Regular",
						canDiscount: true,
						price: 200
					},

					{
						type: "only-Steel",
						canDiscount: true,
						price: 150
					}
				]
			},
			{
				private: [
					{
						type: "Single Session",
						canDiscount: false,
						price: 40
					},
					{
						type: "Full",
						canDiscount: false,
						price: 325
					}
				]
			}
		]
	}
];

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
	}
});

export const { getSportsList, getSportName, gerSportId, gerSportsCategories } =
	sportSlice.actions;

export default sportSlice.reducer;
