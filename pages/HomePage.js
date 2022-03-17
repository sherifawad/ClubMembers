import styles from "../styles/pages/Home.module.css";
import PlayersList from "../Components/PlayersList";
import { useSelector } from "react-redux";
import { useState } from "react";

const HomePage = () => {
	const [totalPrice, setTotalPrice] = useState(0);
	const [maxDiscount, setMaxDiscount] = useState(0);
	const players = useSelector(state => state.players) ?? [];

	const calculateMultipleSports = playersList => {
		let playerDiscount = 0;
		playersList.forEach(player => {
			console.log(
				"🚀 ~ file: HomePage.js ~ line 52 ~ HomePage ~ playerName",
				player.name
			);

			let playerTotalPrice = 0;
			// get number of sports
			let playerSportsLength = player.sports.length;

			const orderedSport = player.sports
				.slice()
				.sort((a, b) => (a.price > b.price ? -1 : 1));
			switch (playerSportsLength) {
				//two sports
				case 2:
					playerTotalPrice += orderedSport[0].price * 0.9;
					playerTotalPrice += orderedSport[1].price;
					playerDiscount = playerDiscount > 10 ? playerDiscount : 10;
					break;

				case 3:
					// three sports
					playerTotalPrice += orderedSport[0].price * 0.8;
					playerTotalPrice += orderedSport[1].price * 0.9;
					playerTotalPrice += orderedSport[2].price;
					playerDiscount = 20;
					break;

				default:
					// more than three sports
					playerTotalPrice += orderedSport[0].price * 0.8;
					playerTotalPrice += orderedSport[1].price * 0.9;
					for (
						let index = 2;
						index < playerSportsLength.length;
						index++
					) {
						playerTotalPrice += orderedSport[index].price;
					}

					playerDiscount = 20;
					break;
			}
			setTotalPrice((totalPrice += playerTotalPrice));
			console.log(
				"🚀 ~ file: HomePage.js ~ line 56 ~ HomePage ~ playerTotalPrice",
				playerTotalPrice
			);
			maxDiscount = playerDiscount;
			console.log(
				"🚀 ~ file: HomePage.js ~ line 56 ~ HomePage ~ maxDiscount",
				maxDiscount
			);
		});
		// setMaxDiscount(prevState =>
		// 	playerDiscount > prevState ? playerDiscount : prevState
		// );
	};

	const calculateSingleSport = playersList => {
		const playersLength = playersList.length;
		let playerTotalPrice = 0;
		let playerDiscount = 0;
		let hasPreviousDiscount = false;
		//check if there were a brother with more than one sport
		//by checking if there are a discount used in pervious function => max discount
		// if there were discount start with 10%  discount
		//else first sport had no discount
		if (maxDiscount > 0) {
			hasPreviousDiscount = true;
		}
		console.log(
			"🚀 ~ file: HomePage.js ~ line 79 ~ HomePage ~ hasPreviousDiscount",
			hasPreviousDiscount
		);
		// brother discount according to no of players
		switch (playersLength) {
			case 1:
				if (hasPreviousDiscount) {
					playerTotalPrice += playersList[0].sports[0].price * 0.9;
					console.log(
						`Name: ${playersList[0].name} ---- price: ${
							playersList[0].sports[0].price * 0.9
						}`
					);
				} else {
					playerTotalPrice += playersList[0].sports[0].price;
					console.log(
						`Name: ${playersList[0].name} ---- price: ${playersList[0].sports[0].price}`
					);
				}
				break;

			case 2:
				if (hasPreviousDiscount) {
					playerTotalPrice += playersList[0].sports[0].price * 0.8;
					playerTotalPrice += playersList[1].sports[0].price * 0.9;
					console.log(
						`Name: ${playersList[0].name} ---- price: ${
							playersList[0].sports[0].price * 0.8
						} Name: ${playersList[1].name} ---- price: ${
							playersList[1].sports[0].price * 0.9
						}`
					);
				} else {
					playerTotalPrice += playersList[0].sports[0].price * 0.9;
					playerTotalPrice += playersList[1].sports[0].price;
					console.log(
						`Name: ${playersList[0].name} ---- price: ${
							playersList[0].sports[0].price * 0.8
						} Name: ${playersList[1].name} ---- price: ${
							playersList[1].sports[0].price * 0.9
						}`
					);
				}
				break;

			default:
				// more than three brothers
				playerTotalPrice += playersList[0].sports[0].price * 0.8;
				playerTotalPrice += playersList[1].sports[0].price * 0.9;

				console.log(
					`Name: ${playersList[0].name} ---- price: ${
						playersList[0].sports[0].price * 0.8
					} Name: ${playersList[1].name} ---- price: ${
						playersList[1].sports[0].price * 0.9
					}`
				);
				for (let index = 2; index < playersList.length; index++) {
					playerTotalPrice += playersList[index].sports[0].price;

					console.log(
						`Name: ${playersList[index].name} ---- price: ${playersList[index].sports[0].price}`
					);
				}

				break;
		}
		// playersList.forEach((player, pIndex) => {
		// 	console.log(
		// 		"🚀 ~ file: HomePage.js ~ line 89 ~ playersList.forEach ~ playerName",
		// 		player.name
		// 	);
		// 	// let playerTotalPrice = 0;
		// 	// switch (playerDiscount) {
		// 	// 	case 20:
		// 	// 		console.log("no discount");
		// 	// 		playerTotalPrice += player.sports[0].price;
		// 	// 		break;

		// 	// 	case 10:
		// 	// 		console.log("20% discount");
		// 	// 		playerTotalPrice += player.sports[0].price * 0.8;
		// 	// 		playerDiscount = 20;
		// 	// 		break;

		// 	// 	case 0:
		// 	// 		if (playersLength > 1) {
		// 	// 			console.log("20% discount");
		// 	// 			playerTotalPrice += player.sports[0].price * 0.8;
		// 	// 			playerDiscount = 20;
		// 	// 		} else {
		// 	// 			console.log("10% discount");
		// 	// 			playerTotalPrice += player.sports[0].price * 0.9;
		// 	// 			playerDiscount = 20;
		// 	// 		}
		// 	// 		break;

		// 	// 	default:
		// 	// 		break;
		// 	// }
		// 	// setMaxDiscount(prevState =>
		// 	// 	playerDiscount > prevState ? playerDiscount : prevState
		// 	// );
		// });
		setTotalPrice((totalPrice += playerTotalPrice));
	};

	const calculate = () => {
		if (!players) return;

		//copt of the array
		// const items = [...players];
		let orderedPlayers;
		//check if all players has one sport
		//if true sort by price ascending
		//if false filter with number of sports then sort by price
		const playersHasOneSport = players.every(p => p.sports.length === 1);
		if (!playersHasOneSport) {
			//filter players with multiple sports
			const playersWithMultiple = players.filter(
				p => p.sports.length > 1
			);
			calculateMultipleSports(playersWithMultiple);
		}
		//filter players with one sport the sort
		const playersWithOne = players
			.filter(p => p.sports.length === 1)
			.sort((a, b) => (a.sports[0].price > b.sports[0].price ? -1 : 1));
		calculateSingleSport(playersWithOne);

		// //order plyer by number of sports
		// orderedPlayers = players
		// 	.slice()
		// 	.sort((a, b) =>
		// 		a.sports.length > b.sports.length
		// 			? -1
		// 			: 1 || a.sports[0].price > b.sports[0].price
		// 			? -1
		// 			: 1
		// 	);
		// console.log(
		// 	"🚀 ~ file: HomePage.js ~ line 18 ~ calculate ~ orderedPlayers",
		// 	orderedPlayers
		// );
		// let previousPlayerMaxDiscount = 0;
		// totalPrice = 0;

		// console.log(
		// 	"🚀 ~ file: HomePage.js ~ line 32 ~ calculate ~ playerWithOneSport",
		// 	playerWithOneSport
		// );
		// orderedPlayers.forEach((player, index) => {
		// 	// total price for individualPlayer
		// 	let playerTotalPrice = 0;
		// 	//check if player has more than one sport
		// 	if (player.sports.length > 1) {
		// 		// get number of sports
		// 		let playerSportsLength = player.sports.length;

		// 		const orderedSport = player.sports
		// 			.slice()
		// 			.sort((a, b) => (a.price > b.price ? -1 : 1));
		// 		switch (playerSportsLength) {
		// 			//two sports
		// 			case 2:
		// 				playerTotalPrice += orderedSport[0].price * 0.9;
		// 				playerTotalPrice += orderedSport[1].price;
		// 				if (playerWithOneSport) {
		// 					previousPlayerMaxDiscount = 10;
		// 				}
		// 				break;

		// 			case 3:
		// 				// three sports
		// 				playerTotalPrice += orderedSport[0].price * 0.8;
		// 				playerTotalPrice += orderedSport[1].price * 0.9;
		// 				playerTotalPrice += orderedSport[2].price;
		// 				if (playerWithOneSport) {
		// 					previousPlayerMaxDiscount = 20;
		// 				}
		// 				break;

		// 			default:
		// 				// more than three sports
		// 				playerTotalPrice += orderedSport[0].price * 0.8;
		// 				playerTotalPrice += orderedSport[1].price * 0.9;
		// 				for (
		// 					let index = 2;
		// 					index < playerSportsLength.length;
		// 					index++
		// 				) {
		// 					playerTotalPrice += orderedSport[1].price;
		// 				}
		// 				if (playerWithOneSport) {
		// 					previousPlayerMaxDiscount = 20;
		// 				}
		// 				break;
		// 		}
		// 	} else {
		// 		//if player has one sport and index less than 3 apply brother discount
		// 		if (index < 3) {
		// 			switch (previousPlayerMaxDiscount) {
		// 				case 20:
		// 					console.log("no discount");
		// 					playerTotalPrice += player.sports[0].price;
		// 					break;

		// 				case 10:
		// 					console.log("20% discount");
		// 					playerTotalPrice += player.sports[0].price * 0.8;

		// 					previousPlayerMaxDiscount = 20;

		// 					break;

		// 				case 0:
		// 					console.log("10% discount");

		// 					playerTotalPrice += player.sports[0].price * 0.9;
		// 					previousPlayerMaxDiscount = 10;
		// 					break;

		// 				default:
		// 					break;
		// 			}
		// 		} else {
		// 			//if player has one sport and index at least 3 apply brother discount

		// 			playerTotalPrice += player.sports[0].price;
		// 		}
		// 	}
		// 	console.log(
		// 		`playerTotalPrice -index: ${index} => ${playerTotalPrice}$`
		// 	);
		// 	setTotalPrice((totalPrice += playerTotalPrice));
		// });
	};

	return (
		<div className={styles.container}>
			<div className={styles.title}>Calculate Sports Payments</div>
			<PlayersList />
			<h3 style={{ color: "red" }}>{totalPrice}</h3>
			<button
				type="button"
				onClick={() => {
					maxDiscount = 0;
					totalPrice = 0;
					calculate();
				}}
			>
				Calculate
			</button>
		</div>
	);
};

export default HomePage;
