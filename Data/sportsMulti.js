export const sportsMulti = [
	{
		id: 1,
		name: {
			en: "Swimming",
			ar: "سباحة"
		},
		sportHide: false,
		categories: [
			{
				normal: {
					name: {
						ar: "عادي",
						en: "normal"
					},
					value: [
						{
							type: {
								id: 1,
								name: {
									ar: "مدارس",
									en: "Schools"
								}
							},
							hide: false,
							penalty: true,
							canDiscount: true,
							price: 250
						},
						{
							type: {
								id: 2,
								name: {
									ar: "تجهيزي",
									en: "Preparation"
								}
							},

							hide: false,
							penalty: true,
							canDiscount: true,
							price: 250
						},
						{
							type: {
								id: 3,
								name: {
									ar: "فريق",
									en: "Team"
								}
							},
							hide: false,
							penalty: true,
							canDiscount: true,
							price: 150
						}
					]
				}
			},
			{
				private: {
					name: {
						ar: "خاص",
						en: "Private"
					},
					value: [
						{
							type: {
								id: 4,
								name: { ar: "تحميل كامل", en: "Full" }
							},
							hide: false,
							penalty: false,
							canDiscount: true,
							price: 1000
						},
						{
							type: {
								id: 5,
								name: { ar: "متقطع", en: "Disconnected" }
							},
							hide: false,
							penalty: false,
							canDiscount: true,
							price: 600
						},
						{
							type: {
								id: 6,
								name: { ar: "مدارس مجمع", en: "Schools Group" }
							},
							hide: false,
							penalty: false,
							canDiscount: true,
							price: 1800
						},
						{
							type: {
								id: 7,
								name: { ar: "8 حصص", en: "8 Sessions" }
							},
							hide: false,
							penalty: false,
							canDiscount: true,
							price: 450
						},
						{
							type: {
								id: 8,
								name: { ar: "حصة واحدة", en: "Single Session" }
							},
							hide: true,
							penalty: false,
							canDiscount: false,
							price: 50
						}
					]
				}
			},
			{
				other: {
					name: {
						ar: "اخرى",
						en: "other"
					},
					value: [
						{
							type: {
								id: 9,
								name: { ar: "حصة واحدة", en: "Single Session" }
							},
							hide: false,
							penalty: false,
							canDiscount: false,
							price: 30
						}
					]
				}
			}
		]
	},
	{
		id: 2,
		name: { ar: "كرة يد", en: "HandBall" },
		sportHide: false,
		categories: [
			{
				normal: {
					name: { ar: "عادي", en: "normal" },
					value: [
						{
							type: {
								id: 1,
								name: { ar: "كرة يد", en: "HandBall" }
							},
							hide: false,
							penalty: false,
							canDiscount: true,
							price: 150
						}
					]
				}
			}
		]
	},
	{
		id: 3,
		name: { ar: "كرة سلة", en: "BasketBall" },
		sportHide: false,
		categories: [
			{
				normal: {
					name: { ar: "عادي", en: "normal" },
					value: [
						{
							type: {
								id: 1,
								name: { ar: "كرة سلة", en: "BasketBall" }
							},
							hide: false,
							penalty: false,
							canDiscount: true,
							price: 150
						}
					]
				}
			}
		]
	},
	{
		id: 4,
		name: { ar: "كرة طائرة", en: "VolleyBall" },
		sportHide: false,
		categories: [
			{
				normal: {
					name: { ar: "عادي", en: "normal" },
					value: [
						{
							type: {
								id: 1,
								name: { ar: "كرة طائرة", en: "VolleyBall" }
							},
							hide: false,
							penalty: false,
							canDiscount: true,
							price: 150
						}
					]
				}
			}
		]
	},
	{
		id: 5,
		name: { ar: "كرة قدم", en: "FootBall" },
		sportHide: false,
		categories: [
			{
				normal: {
					name: { ar: "عادي", en: "normal" },
					value: [
						{
							type: {
								id: 1,
								name: { ar: "مميزة", en: "Special" }
							},
							hide: false,
							penalty: false,
							canDiscount: true,
							price: 250
						},
						{
							type: {
								id: 2,
								name: { ar: "عادي", en: "regular" }
							},
							hide: false,
							penalty: false,
							canDiscount: true,
							price: 150
						}
					]
				}
			}
		]
	},
	{
		id: 6,
		name: { ar: "تايكوندو", en: "Taekwondo" },
		sportHide: false,
		categories: [
			{
				normal: {
					name: { ar: "عادي", en: "normal" },
					value: [
						{
							type: {
								id: 1,
								name: { ar: "تايكوندو", en: "Taekwondo" }
							},
							hide: false,
							penalty: false,
							canDiscount: true,
							price: 150
						}
					]
				}
			}
		]
	},
	{
		id: 7,
		name: { ar: "كاراتيه", en: "Karate" },
		sportHide: false,
		categories: [
			{
				normal: {
					name: { ar: "عادي", en: "normal" },
					value: [
						{
							type: {
								id: 1,
								name: { ar: "كاراتيه", en: "Karate" }
							},
							hide: false,
							penalty: false,
							canDiscount: true,
							price: 150
						}
					]
				}
			}
		]
	},
	{
		id: 8,
		name: { ar: "ملاكمة", en: "Karate" },
		sportHide: false,
		categories: [
			{
				normal: {
					name: { ar: "عادي", en: "normal" },
					value: [
						{
							type: {
								id: 1,
								name: { ar: "فريق", en: "Team" }
							},
							hide: false,
							penalty: false,
							canDiscount: true,
							price: 150
						},
						{
							type: {
								id: 2,
								name: { ar: "براعم", en: "Cubs" }
							},
							hide: false,
							penalty: false,
							canDiscount: true,
							price: 150
						},
						{
							type: {
								id: 3,
								name: {
									ar: "مدارس مبتدئيين",
									en: "Schools-beginners"
								}
							},
							hide: false,
							penalty: false,
							canDiscount: true,
							price: 200
						},
						{
							type: {
								id: 4,
								name: {
									ar: "مدارس هواه",
									en: "Schools-amateurs"
								}
							},
							hide: false,
							penalty: false,
							canDiscount: true,
							price: 200
						}
					]
				},
				private: {
					name: { ar: "خاص", en: "private" },
					value: [
						{
							type: {
								id: 5,
								name: { ar: "خاص", en: "private" }
							},
							hide: false,
							penalty: false,
							canDiscount: false,
							price: 300
						}
					]
				},
				other: {
					name: { ar: "اخرى", en: "other" },
					value: [
						{
							type: {
								id: 6,
								name: { ar: "جيم", en: "GYM" }
							},
							hide: false,
							penalty: false,
							canDiscount: false,
							price: 200
						}
					]
				}
			}
		]
	},
	{
		id: 9,
		name: { ar: "جودو", en: "Judo" },
		sportHide: false,
		categories: [
			{
				normal: {
					name: { ar: "عادي", en: "normal" },
					value: [
						{
							type: { ar: "جودو", en: "Judo" },
							hide: false,
							penalty: false,
							canDiscount: true,
							price: 150
						}
					]
				}
			}
		]
	},
	{
		id: 10,
		name: { ar: "كمال أجسام", en: "Bodybuilding" },
		sportHide: false,
		categories: [
			{
				normal: {
					name: { ar: "عادي", en: "normal" },
					value: [
						{
							type: { ar: "كمال أجسام", en: "Bodybuilding" },
							hide: false,
							penalty: false,
							canDiscount: true,
							price: 150
						}
					]
				}
			}
		]
	},
	{
		id: 11,
		name: { ar: "رفع اثقال", en: "Weightlifting" },
		sportHide: false,
		categories: [
			{
				normal: {
					name: { ar: "عادي", en: "normal" },
					value: [
						{
							type: { ar: "رفع اثقال", en: "Weightlifting" },
							hide: false,
							penalty: false,
							canDiscount: true,
							price: 150
						}
					]
				}
			}
		]
	},
	{
		id: 12,
		name: { ar: "تنس طاولة", en: "PingPong" },
		sportHide: false,
		categories: [
			{
				normal: {
					name: { ar: "عادي", en: "normal" },
					value: [
						{
							type: { ar: "تنس طاولة", en: "PingPong" },
							hide: false,
							penalty: false,
							canDiscount: true,
							price: 300
						}
					]
				}
			},
			{
				other: {
					name: { ar: "اخرى", en: "other" },
					value: [
						{
							type: { ar: "ايجار", en: "Rental" },
							hide: false,
							penalty: false,
							canDiscount: false,
							price: 25
						}
					]
				}
			}
		]
	},
	{
		id: 13,
		name: { ar: "تنس طاولة", en: "ModernPentathlon" },
		sportHide: true,
		categories: [
			{
				normal: {
					name: { ar: "عادي", en: "normal" },
					value: [
						{
							type: { ar: "ثنائي", en: "laser-run" },
							hide: false,
							penalty: false,
							canDiscount: true,
							price: 200
						},
						{
							type: { ar: "ثلاثي", en: "with Swimming" },
							hide: false,
							penalty: false,
							canDiscount: true,
							price: 250
						}
					]
				}
			}
		]
	},
	{
		id: 14,
		name: { ar: "اسكواش", en: "Squash" },
		sportHide: false,
		categories: [
			{
				normal: {
					name: { ar: "عادي", en: "normal" },
					value: [
						{
							type: { ar: "فريق", en: "Team" },
							hide: false,
							penalty: false,
							canDiscount: true,
							price: 500
						},
						{
							type: { ar: "براعم", en: "Cubs" },
							hide: false,
							penalty: false,
							canDiscount: true,
							price: 600
						},
						{
							type: {
								ar: "مدارس مبتدئيين",
								en: "Schools-beginners"
							},
							hide: false,
							penalty: false,
							canDiscount: true,
							price: 450
						},
						{
							type: { ar: "مدارس مميز", en: "Schools-special" },
							hide: false,
							penalty: false,
							canDiscount: true,
							price: 500
						},
						{
							type: { ar: "مدارس هواه", en: "Schools-amateurs" },
							hide: false,
							penalty: false,
							canDiscount: true,
							price: 600
						}
					]
				}
			},
			{
				private: {
					name: { ar: "خاص", en: "private" },
					value: [
						{
							type: { ar: "خاص", en: "private" },
							hide: false,
							penalty: false,
							canDiscount: false,
							price: 100
						},
						{
							type: { ar: "جيم", en: "GYM" },
							hide: false,
							penalty: false,
							canDiscount: false,
							price: 200
						}
					]
				}
			},
			{
				other: {
					name: { ar: "اخرى", en: "other" },
					value: [
						{
							type: { ar: "ايجار للفريق", en: "Team-Rental" },
							hide: false,
							penalty: false,
							canDiscount: false,
							price: 50
						},
						{
							type: { ar: "ايجار عادي", en: "Regular-Rental" },
							hide: false,
							penalty: false,
							canDiscount: false,
							price: 100
						},
						{
							type: { ar: "جيم", en: "Gym" },
							hide: false,
							penalty: false,
							canDiscount: false,
							price: 250
						}
					]
				}
			}
		]
	},
	{
		id: 15,
		name: { ar: "تنس ارضي", en: "Tennis" },
		sportHide: false,
		categories: [
			{
				normal: {
					name: { ar: "عادي", en: "normal" },
					value: [
						{
							type: { ar: "مدارس", en: "Schools" },
							hide: false,
							penalty: false,
							canDiscount: true,
							price: 300
						},
						{
							type: { ar: "فريق", en: "Team" },
							hide: false,
							penalty: false,
							canDiscount: true,
							price: 450
						}
					]
				}
			},
			{
				private: {
					name: { ar: "خاص", en: "private" },
					value: [
						{
							type: { ar: "فردي صباحي", en: "Morning-Single" },
							hide: false,
							penalty: false,
							canDiscount: false,
							price: 60
						},
						{
							type: { ar: "زوجي صباحي", en: "Morning-Double" },
							hide: false,
							penalty: false,
							canDiscount: false,
							price: 70
						},
						{
							type: { ar: "ثلاثي صباحي", en: "Morning-Triple" },
							hide: false,
							penalty: false,
							canDiscount: false,
							price: 90
						},
						{
							type: { ar: "فردي مسائي", en: "Evening-Single" },
							hide: false,
							penalty: false,
							canDiscount: false,
							price: 90
						},
						{
							type: { ar: "زوجي مسائي", en: "Evening-Double" },
							hide: false,
							penalty: false,
							canDiscount: false,
							price: 130
						},
						{
							type: { ar: "ثلاثي مسائي", en: "Evening-Triple" },
							hide: false,
							penalty: false,
							canDiscount: false,
							price: 135
						}
					]
				}
			},
			{
				other: {
					name: { ar: "اخرى", en: "other" },
					value: [
						{
							type: { ar: "إيجار صباحي", en: "Morning-Rental" },
							hide: false,
							penalty: false,
							canDiscount: false,
							price: 40
						},

						{
							type: { ar: "إيجار مسائي", en: "Evening-Rental" },
							hide: false,
							penalty: false,
							canDiscount: false,
							price: 100
						}
					]
				}
			}
		]
	},
	{
		id: 16,
		name: { ar: "العاب قوى", en: "Athletics" },
		sportHide: false,
		categories: [
			{
				normal: {
					name: { ar: "عادي", en: "other" },
					value: [
						{
							type: { ar: "عادي", en: "other" },
							hide: false,
							penalty: false,
							canDiscount: true,
							price: 200
						}
					]
				}
			},
			{
				private: {
					name: { ar: "خاص", en: "other" },
					value: [
						{
							type: { ar: "خاص", en: "other" },
							hide: false,
							penalty: false,
							canDiscount: false,
							price: 100
						}
					]
				}
			}
		]
	},
	{
		id: 17,
		name: { ar: "جمباز", en: "Gymnastics" },
		sportHide: false,
		categories: [
			{
				Artistic: {
					name: { ar: "فني", en: "Artistic" },
					value: [
						{
							type: { ar: "مدارس", en: "Schools" },
							hide: false,
							penalty: false,
							canDiscount: true,
							price: 350
						},
						{
							type: { ar: "تجهيزي 6-7", en: "Preparation(6-7)" },
							hide: false,
							penalty: false,
							canDiscount: true,
							price: 400
						},
						{
							type: { ar: "فريق 8-10", en: "Team(8-10)" },
							hide: false,
							penalty: false,
							canDiscount: true,
							price: 450
						},
						{
							type: { ar: "فريق 11-15", en: "Team(11-15)" },
							hide: false,
							penalty: false,
							canDiscount: true,
							price: 800
						},
						{
							type: {
								ar: "فريق درجة 1 و",
								en: "Team(grade 1&2)"
							},
							hide: false,
							penalty: false,
							canDiscount: true,
							price: 1200
						}
					]
				}
			},
			{
				general: {
					name: { ar: "عام", en: "general" },
					value: [
						{
							type: { ar: "أكاديمية", en: "Academy" },
							hide: false,
							penalty: false,
							canDiscount: true,
							price: 200
						},

						{
							type: { ar: "فريق", en: "Team" },
							hide: false,
							penalty: false,
							canDiscount: true,
							price: 400
						}
					]
				}
			},
			{
				Aerobic: {
					name: { ar: "ايروبك", en: "Aerobic" },
					value: [
						{
							type: { ar: "مدارس", en: "Schools" },
							hide: false,
							penalty: false,
							canDiscount: true,
							price: 400
						},
						{
							type: { ar: "تجهيزي", en: "Preparation" },
							hide: false,
							penalty: false,
							canDiscount: true,
							price: 500
						},
						{
							type: { ar: "فريق 7 -11", en: "Team(7-11)" },
							hide: false,
							penalty: false,
							canDiscount: true,
							price: 750
						},
						{
							type: { ar: "فريق 12 فما فوق", en: "Team(12-..)" },
							hide: false,
							penalty: false,
							canDiscount: true,
							price: 950
						}
					]
				}
			},
			{
				Rhythmic: {
					name: { ar: "إيقاعي", en: "Rhythmic" },
					value: [
						{
							type: { ar: "مدارس", en: "Schools" },
							hide: false,
							penalty: false,
							canDiscount: true,
							price: 1000
						},
						{
							type: { ar: "تجهيزي", en: "Preparation" },
							hide: false,
							penalty: false,
							canDiscount: true,
							price: 1200
						},
						{
							type: { ar: "فريق 7-10", en: "Team(7-10)" },
							hide: false,
							penalty: false,
							canDiscount: true,
							price: 1500
						},
						{
							type: { ar: "فريق 11-15", en: "Team(11-15)" },
							hide: false,
							penalty: false,
							canDiscount: true,
							price: 1700
						},
						{
							type: {
								ar: "فريق 17 و درجه 1",
								en: "Team(17-grade 1)"
							},
							hide: false,
							penalty: false,
							canDiscount: true,
							price: 2000
						}
					]
				}
			},
			{
				private: {
					name: { ar: "خاص", en: "private" },
					value: [
						{
							type: { ar: "مدرب داخلي", en: "Internal Trainer" },
							hide: false,
							penalty: false,
							canDiscount: false,
							price: 100
						},

						{
							type: { ar: "فريق خارجي", en: "External Trainer" },
							hide: false,
							penalty: false,
							canDiscount: false,
							price: 150
						}
					]
				}
			}
		]
	},
	{
		id: 18,
		name: { ar: "شيش", en: "Sheesh" },
		sportHide: false,
		categories: [
			{
				normal: {
					name: { ar: "عادي", en: "normal" },
					value: [
						{
							type: { ar: "شيش", en: "Sheesh" },
							hide: false,
							penalty: false,
							canDiscount: true,
							price: 200
						}
					]
				}
			},
			{
				private: {
					name: { ar: "خاص", en: "private" },
					value: [
						{
							type: { ar: "حصة واحدة", en: "Single Session" },
							hide: false,
							penalty: false,
							canDiscount: false,
							price: 40
						}
					]
				}
			}
		]
	},
	{
		id: 19,
		name: { ar: "جيم", en: "GYM" },
		sportHide: false,
		categories: [
			{
				normal: {
					name: { ar: "عادي", en: "normal" },
					value: [
						{
							type: { ar: "عادي", en: "normal" },
							hide: false,
							penalty: false,
							canDiscount: true,
							price: 200
						},

						{
							type: { ar: "حديد", en: "only-Steel" },
							hide: false,
							penalty: false,
							canDiscount: true,
							price: 150
						}
					]
				}
			},
			{
				private: {
					name: { ar: "خاص", en: "private" },
					value: [
						{
							type: { ar: "حصة واحدة", en: "Single Session" },
							hide: false,
							penalty: false,
							canDiscount: false,
							price: 40
						},
						{
							type: { ar: "كامل", en: "Full" },
							hide: false,
							penalty: false,
							canDiscount: false,
							price: 325
						}
					]
				}
			}
		]
	},
	{
		id: 20,
		name: { ar: "بيلياردو", en: "Billiard" },
		sportHide: false,
		categories: [
			{
				other: {
					name: { ar: "اخرى", en: "other" },
					value: [
						{
							type: { ar: "إيجار", en: "Rental" },
							hide: false,
							penalty: false,
							canDiscount: true,
							price: 40
						}
					]
				}
			}
		]
	}
];
