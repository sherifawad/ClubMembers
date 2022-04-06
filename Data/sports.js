export const sports = [
	{
		id: 1,
		name: "Swimming",
		sportHide: false,
		categories: [
			{
				normal: [
					{
						type: "Schools",
						hide: false,
						penalty: true,
						canDiscount: true,
						price: 250
					},
					{
						type: "Preparation",

						hide: false,
						penalty: true,
						canDiscount: true,
						price: 250
					},
					{
						type: "Team",
						hide: false,
						penalty: true,
						canDiscount: true,
						price: 150
					}
				]
			},
			{
				private: [
					{
						type: "Full",
						hide: false,
						penalty: false,
						canDiscount: true,
						price: 1000
					},
					{
						type: "Disconnected",
						hide: false,
						penalty: false,
						canDiscount: true,
						price: 600
					},
					{
						type: "Schools Group",
						hide: false,
						penalty: false,
						canDiscount: true,
						price: 1800
					},
					{
						type: "8 Sessions",
						hide: false,
						penalty: false,
						canDiscount: true,
						price: 450
					},
					{
						type: "Single Session",
						hide: true,
						penalty: false,
						canDiscount: false,
						price: 50
					}
				]
			},
			{
				other: [
					{
						type: "Free Swimming",
						hide: false,
						penalty: false,
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
		sportHide: false,
		categories: [
			{
				normal: [
					{
						type: "Hand Ball",
						hide: false,
						penalty: false,
						canDiscount: true,
						price: 150
					}
				]
			}
		]
	},
	{
		id: 3,
		name: "BasketBall",
		sportHide: false,
		categories: [
			{
				normal: [
					{
						type: "Basket Ball",
						hide: false,
						penalty: false,
						canDiscount: true,
						price: 150
					}
				]
			}
		]
	},
	{
		id: 4,
		name: "VolleyBall",
		sportHide: false,
		categories: [
			{
				normal: [
					{
						type: "Volley Ball",
						hide: false,
						penalty: false,
						canDiscount: true,
						price: 150
					}
				]
			}
		]
	},
	{
		id: 5,
		name: "FootBall",
		sportHide: false,
		categories: [
			{
				normal: [
					{
						type: "Special",
						hide: false,
						penalty: false,
						canDiscount: true,
						price: 250
					},
					{
						type: "regular",
						hide: false,
						penalty: false,
						canDiscount: true,
						price: 150
					}
				]
			}
		]
	},
	{
		id: 6,
		name: "Taekwondo",
		sportHide: false,
		categories: [
			{
				normal: [
					{
						type: "Taekwondo",
						hide: false,
						penalty: false,
						canDiscount: true,
						price: 150
					}
				]
			}
		]
	},
	{
		id: 7,
		name: "Karate",
		sportHide: false,
		categories: [
			{
				normal: [
					{
						type: "Karate",
						hide: false,
						penalty: false,
						canDiscount: true,
						price: 150
					}
				]
			}
		]
	},
	{
		id: 8,
		name: "Boxing",
		sportHide: false,
		categories: [
			{
				normal: [
					{
						type: "Team",
						hide: false,
						penalty: false,
						canDiscount: true,
						price: 150
					},
					{
						type: "Cubs",
						hide: false,
						penalty: false,
						canDiscount: true,
						price: 150
					},
					{
						type: "Schools-beginners",
						hide: false,
						penalty: false,
						canDiscount: true,
						price: 200
					},
					{
						type: "Schools-amateurs",
						hide: false,
						penalty: false,
						canDiscount: true,
						price: 200
					}
				],
				private: [
					{
						type: "Private",
						hide: false,
						penalty: false,
						canDiscount: false,
						price: 300
					}
				],
				other: [
					{
						type: "GYM",
						hide: false,
						penalty: false,
						canDiscount: false,
						price: 200
					}
				]
			}
		]
	},
	{
		id: 9,
		name: "Judo",
		sportHide: false,
		categories: [
			{
				normal: [
					{
						type: "Judo",
						hide: false,
						penalty: false,
						canDiscount: true,
						price: 150
					}
				]
			}
		]
	},
	{
		id: 10,
		name: "Bodybuilding",
		sportHide: false,
		categories: [
			{
				normal: [
					{
						type: "Bodybuilding",
						hide: false,
						penalty: false,
						canDiscount: true,
						price: 150
					}
				]
			}
		]
	},
	{
		id: 11,
		name: "Weightlifting",
		sportHide: false,
		categories: [
			{
				normal: [
					{
						type: "Weightlifting",
						hide: false,
						penalty: false,
						canDiscount: true,
						price: 150
					}
				]
			}
		]
	},
	{
		id: 12,
		name: "PingPong",
		sportHide: false,
		categories: [
			{
				normal: [
					{
						type: "PingPong",
						hide: false,
						penalty: false,
						canDiscount: true,
						price: 300
					}
				]
			},
			{
				other: [
					{
						type: "Rental",
						hide: false,
						penalty: false,
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
		sportHide: true,
		categories: [
			{
				normal: [
					{
						type: "laser-run",
						hide: false,
						penalty: false,
						canDiscount: true,
						price: 200
					},
					{
						type: "Swimming laser-run",
						hide: false,
						penalty: false,
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
		sportHide: false,
		categories: [
			{
				normal: [
					{
						type: "Team",
						hide: false,
						penalty: false,
						canDiscount: true,
						price: 500
					},
					{
						type: "Cubs",
						hide: false,
						penalty: false,
						canDiscount: true,
						price: 600
					},
					{
						type: "Schools-beginners",
						hide: false,
						penalty: false,
						canDiscount: true,
						price: 450
					},
					{
						type: "Schools-special",
						hide: false,
						penalty: false,
						canDiscount: true,
						price: 500
					},
					{
						type: "Schools-amateurs",
						hide: false,
						penalty: false,
						canDiscount: true,
						price: 600
					}
				]
			},
			{
				private: [
					{
						type: "Private",
						hide: false,
						penalty: false,
						canDiscount: false,
						price: 100
					},
					{
						type: "GYM",
						hide: false,
						penalty: false,
						canDiscount: false,
						price: 200
					}
				]
			},
			{
				other: [
					{
						type: "Team-Rental",
						hide: false,
						penalty: false,
						canDiscount: false,
						price: 50
					},
					{
						type: "Regular-Rental",
						hide: false,
						penalty: false,
						canDiscount: false,
						price: 100
					},
					{
						type: "Gym",
						hide: false,
						penalty: false,
						canDiscount: false,
						price: 250
					}
				]
			}
		]
	},
	{
		id: 15,
		name: "Tennis",
		sportHide: false,
		categories: [
			{
				normal: [
					{
						type: "Schools",
						hide: false,
						penalty: false,
						canDiscount: true,
						price: 300
					},
					{
						type: "Team",
						hide: false,
						penalty: false,
						canDiscount: true,
						price: 450
					}
				]
			},
			{
				private: [
					{
						type: "Morning-Single",
						hide: false,
						penalty: false,
						canDiscount: false,
						price: 60
					},
					{
						type: "Morning-Double",
						hide: false,
						penalty: false,
						canDiscount: false,
						price: 70
					},
					{
						type: "Morning-Triple",
						hide: false,
						penalty: false,
						canDiscount: false,
						price: 90
					},
					{
						type: "Evening-Single",
						hide: false,
						penalty: false,
						canDiscount: false,
						price: 90
					},
					{
						type: "Evening-Double",
						hide: false,
						penalty: false,
						canDiscount: false,
						price: 130
					},
					{
						type: "Evening-Triple",
						hide: false,
						penalty: false,
						canDiscount: false,
						price: 135
					}
				]
			},
			{
				other: [
					{
						type: "Morning-Rental",
						hide: false,
						penalty: false,
						canDiscount: false,
						price: 40
					},

					{
						type: "Evening-Rental",
						hide: false,
						penalty: false,
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
		sportHide: false,
		categories: [
			{
				normal: [
					{
						type: "Normal",
						hide: false,
						penalty: false,
						canDiscount: true,
						price: 200
					}
				]
			},
			{
				private: [
					{
						type: "Private",
						hide: false,
						penalty: false,
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
		sportHide: false,
		categories: [
			{
				Artistic: [
					{
						type: "Schools",
						hide: false,
						penalty: false,
						canDiscount: true,
						price: 350
					},
					{
						type: "Preparation(6-7)",
						hide: false,
						penalty: false,
						canDiscount: true,
						price: 400
					},
					{
						type: "Team(8-10)",
						hide: false,
						penalty: false,
						canDiscount: true,
						price: 450
					},
					{
						type: "Team(11-15)",
						hide: false,
						penalty: false,
						canDiscount: true,
						price: 800
					},
					{
						type: "Team(grade 1&2)",
						hide: false,
						penalty: false,
						canDiscount: true,
						price: 1200
					}
				]
			},
			{
				general: [
					{
						type: "Academy",
						hide: false,
						penalty: false,
						canDiscount: true,
						price: 200
					},

					{
						type: "Team",
						hide: false,
						penalty: false,
						canDiscount: true,
						price: 400
					}
				]
			},
			{
				Aerobic: [
					{
						type: "Schools",
						hide: false,
						penalty: false,
						canDiscount: true,
						price: 400
					},
					{
						type: "Preparation",
						hide: false,
						penalty: false,
						canDiscount: true,
						price: 500
					},
					{
						type: "Team(7-11)",
						hide: false,
						penalty: false,
						canDiscount: true,
						price: 750
					},
					{
						type: "Team(12-..)",
						hide: false,
						penalty: false,
						canDiscount: true,
						price: 950
					}
				]
			},
			{
				Rhythmic: [
					{
						type: "Schools",
						hide: false,
						penalty: false,
						canDiscount: true,
						price: 1000
					},
					{
						type: "Preparation",
						hide: false,
						penalty: false,
						canDiscount: true,
						price: 1200
					},
					{
						type: "Team(7-10)",
						hide: false,
						penalty: false,
						canDiscount: true,
						price: 1500
					},
					{
						type: "Team(11-15)",
						hide: false,
						penalty: false,
						canDiscount: true,
						price: 1700
					},
					{
						type: "Team(17-grade 1)",
						hide: false,
						penalty: false,
						canDiscount: true,
						price: 2000
					}
				]
			},
			{
				private: [
					{
						type: "Internal Trainer",
						hide: false,
						penalty: false,
						canDiscount: false,
						price: 100
					},

					{
						type: "External Trainer",
						hide: false,
						penalty: false,
						canDiscount: false,
						price: 150
					}
				]
			}
		]
	},
	{
		id: 18,
		name: "Sheesh",
		sportHide: false,
		categories: [
			{
				normal: [
					{
						type: "Sheesh",
						hide: false,
						penalty: false,
						canDiscount: true,
						price: 200
					}
				]
			},
			{
				private: [
					{
						type: "Single Session",
						hide: false,
						penalty: false,
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
		sportHide: false,
		categories: [
			{
				normal: [
					{
						type: "Regular",
						hide: false,
						penalty: false,
						canDiscount: true,
						price: 200
					},

					{
						type: "only-Steel",
						hide: false,
						penalty: false,
						canDiscount: true,
						price: 150
					}
				]
			},
			{
				private: [
					{
						type: "Single Session",
						hide: false,
						penalty: false,
						canDiscount: false,
						price: 40
					},
					{
						type: "Full",
						hide: false,
						penalty: false,
						canDiscount: false,
						price: 325
					}
				]
			}
		]
	},
	{
		id: 20,
		name: "Billiard",
		sportHide: false,
		categories: [
			{
				other: [
					{
						type: "Rental",
						hide: false,
						penalty: false,
						canDiscount: true,
						price: 40
					}
				]
			}
		]
	}
];
