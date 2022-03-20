import styles from "../styles/pages/Home.module.css";
import PlayersList from "../Components/PlayersList";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";

const HomePage = () => {
	const [privatePlayersNumbers, setPrivatePlayersNumbers] = useState(0);
	const [regularPlayersNumbers, setRegularPlayersNumbers] = useState(0);
	const [withDiscountList, setWithDiscountList] = useState([]);
	const [withNoDiscountList, setWithNoDiscountList] = useState([]);
	const [privateList, setPrivateList] = useState([]);

	const [totalPrice, setTotalPrice] = useState(0);
	const [maxDiscount, setMaxDiscount] = useState(0);
	const players = useSelector(state => state.players) || [];

	const firstTimeRender = useRef(true);

	useEffect(() => {
		if (firstTimeRender.current) {
			handleNoDiscountList(withNoDiscountList);
			handlePrivateSwimmingList(privateList);
			handleDiscountList(withDiscountList);
			firstTimeRender.current = false;
		}
	}, [firstTimeRender.current]);

	useEffect(() => {
		firstTimeRender.current = false;
	}, []);

	// divide player sports to categories and subCategories
	//main category is sports with applied discount and others
	//divide sports with applied discount to two subCategories (private - regular)
	const playerDivider = playerToDivide => {
		let dividedPlayer = {
			id: playerToDivide.id,
			name: playerToDivide.name,
			discountSports: null,
			noDiscountSports: null
		};
		//sports with applied discount
		const sportsWithDiscount = playerToDivide.sports.filter(
			s => s.canDiscount === true
		);
		if (sportsWithDiscount.length > 0) {
			//divide to subCategories  (private - regular)
			const regularSports = sportsWithDiscount.filter(
				s => s.category !== "private"
			);
			//add to list
			if (regularSports.length > 0) {
				setWithDiscountList(oldList => [
					...oldList,
					{
						id: playerToDivide.id,
						name: playerToDivide.name,
						sports: regularSports
					}
				]);
			}
			const privateSports = sportsWithDiscount.filter(
				s => s.category === "private"
			);
			//add to list
			if (privateSports.length > 0) {
				setPrivateList(oldList => [
					...oldList,
					{
						id: playerToDivide.id,
						name: playerToDivide.name,
						sports: privateSports
					}
				]);
			}
			const discountSportsResult = {
				regular: regularSports.length > 0 ? regularSports : null,
				private: privateSports.length > 0 ? privateSports : null
			};
			dividedPlayer.discountSports = discountSportsResult;
		}

		//sports without discount
		const sportsWithOutDiscount = playerToDivide.sports.filter(
			s => s.canDiscount === false
		);
		if (sportsWithOutDiscount.length > 0) {
			dividedPlayer.noDiscountSports = sportsWithOutDiscount;
			setWithNoDiscountList(oldList => [
				...oldList,
				{
					id: playerToDivide.id,
					name: playerToDivide.name,
					sports: sportsWithOutDiscount
				}
			]);
			// withNoDiscountList = [
			// 	...withNoDiscountList,
			// 	{
			// 		id: playerToDivide.id,
			// 		name: playerToDivide.name,
			// 		sports: sportsWithOutDiscount
			// 	}
			// ];
		}
		return dividedPlayer;
	};

	const handleNoDiscountList = list => {
		let totalPrice = 0;
		const players = list?.reduce((accPlayers, player) => {
			const sports = player.sports?.reduce((accSports, sport) => {
				totalPrice += sport.price;
				sport.discount = 0;
				sport.total = sport.price;
				accSports.push(sport);
				return accSports;
			}, []);
			player.sports = sports;
			accPlayers.push(player);
			return accPlayers;
		}, []);
		setTotalPrice(oldPrice => (oldPrice += totalPrice));
		setWithNoDiscountList(players);
	};

	const handlePrivateSwimmingList = list => {
		let totalPrice = 0;
		//check the current day
		let newDate = new Date();
		//get today as integer
		let today = parseInt(newDate.getDate());
		//get player with schools group sport type
		let filteredPlayer;
		list.forEach(player => {
			player.sports.forEach(sport => {
				if (sport.type === "Schools Group") {
					filteredPlayer = player;
				}
			});
		});
		if (filteredPlayer) {
			//remove from list then add it last on accumulated players and at last sort by sport pruce
			list = list
				.filter(player => player.id !== filteredPlayer.id)
				.sort((a, b) =>
					a.sports[0].price > b.sports[0].price ? -1 : 1
				);
			//check if calculation within first 5 days of the month
			if (today <= 5) {
				totalPrice += filteredPlayer.sports[0].price * 0.9;
				filteredPlayer.sports[0].discount = 10;
				filteredPlayer.sports[0].total = filteredPlayer.sports[0].price;
			} else {
				totalPrice += filteredPlayer.sports[0].price;
				filteredPlayer.sports[0].discount = 0;
				filteredPlayer.sports[0].total = filteredPlayer.sports[0].price;
			}
		}

		const players = list?.reduce((accPlayers, player, playerIndex) => {
			const sports = player.sports?.reduce((accSports, sport) => {
				switch (list.length) {
					case 1:
						//check if calculation within first 5 days of the month
						if (today <= 5) {
							totalPrice += sport.price * 0.9;
							sport.discount = 10;
							sport.total = sport.price * 0.9;
						} else {
							totalPrice += sport.price;
							sport.discount = 0;
							sport.total = sport.price;
						}
						break;

					//There is a second brother
					case 2:
						if (playerIndex == 0) {
							totalPrice += sport.price * 0.8;
							sport.discount = 20;
							sport.total = sport.price * 0.8;
						} else {
							if (today <= 5) {
								totalPrice += sport.price * 0.9;
								sport.discount = 10;
								sport.total = sport.price * 0.9;
							} else {
								totalPrice += sport.price;
								sport.discount = 0;
								sport.total = sport.price;
							}
						}
						break;

					//There is a three or more  brother
					default:
						if (playerIndex == 0) {
							totalPrice += sport.price * 0.7;
							sport.discount = 30;
							sport.total = sport.price * 0.7;
						} else if (playerIndex == 1) {
							totalPrice += sport.price * 0.8;
							sport.discount = 20;
							sport.total = sport.price * 0.8;
						} else if (playerIndex == 2) {
							if (today <= 5) {
								totalPrice += sport.price * 0.9;
								sport.discount = 10;
								sport.total = sport.price * 0.9;
							} else {
								totalPrice += sport.price;
								sport.discount = 0;
								sport.total = sport.price;
							}
						} else {
							totalPrice += sport.price;
							sport.discount = 0;
							sport.total = sport.price;
						}
						break;
				}
				accSports.push(sport);
				return accSports;
			}, []);
			player.sports = sports;
			accPlayers.push(player);
			return accPlayers;
		}, []);
		// add filteredPlayer if exist
		if (filteredPlayer) {
			players.push(filteredPlayer);
		}
		setTotalPrice(oldPrice => (oldPrice += totalPrice));
		setPrivateList(players);
	};

	const handleDiscountList = list => {
		let totalPrice = 0;
		//filter players with multiple sports
		let playersWithMultiple = list?.filter(p => p?.sports.length > 1);
		if (playersWithMultiple.length > 0) {
			const multiple = playersWithMultiple?.reduce(
				(accPlayers, player) => {
					const sports = player.sports?.reduce(
						(accSports, sport, sportIndex) => {
							switch (player.sports.length) {
								case 2:
									if (sportIndex == 0) {
										totalPrice += sport.price * 0.9;
										sport.discount = 10;
										sport.total = sport.price * 0.9;
									} else {
										totalPrice += sport.price;
										sport.discount = 0;
										sport.total = sport.price;
									}
									break;

								default:
									if (sportIndex == 0) {
										totalPrice += sport.price * 0.8;
										sport.discount = 20;
										sport.total = sport.price * 0.8;
									} else if (playerIndex == 1) {
										totalPrice += sport.price * 0.9;
										sport.discount = 10;
										sport.total = sport.price * 0.9;
									} else {
										totalPrice += sport.price;
										sport.discount = 0;
										sport.total = sport.price;
									}
									break;
							}
							accSports.push(sport);
							return accSports;
						},
						[]
					);
					player.sports = sports;
					accPlayers.push(player);
					return accPlayers;
				},
				[]
			);
			setWithDiscountList(multiple);
		}
		//filter players with one sport then sort descendant by price
		const playersWithOne = list
			?.filter(p => p?.sports.length === 1)
			.sort((a, b) => (a.sports[0].price > b.sports[0].price ? -1 : 1));
		if (playersWithOne.length < 1) return;
		const single = playersWithOne?.reduce(
			(accPlayers, player, playerIndex) => {
				let sports = player.sports?.reduce((accSports, sport) => {
					switch (playersWithOne.length) {
						case 1:
							if (playersWithMultiple.length > 0) {
								totalPrice += sport.price * 0.9;
								sport.discount = 10;
								sport.total = sport.price * 0.9;
							} else {
								totalPrice += sport.price;
								sport.discount = 0;
								sport.total = sport.price;
							}
							break;
						case 2:
							if (playersWithMultiple.length > 0) {
								if (playerIndex == 0) {
									totalPrice += sport.price * 0.8;
									sport.discount = 20;
									sport.total = sport.price * 0.8;
								} else if (playerIndex == 1) {
									totalPrice += sport.price * 0.9;
									sport.discount = 10;
									sport.total = sport.price * 0.9;
								}
							} else {
								if (playerIndex == 0) {
									totalPrice += sport.price * 0.9;
									sport.discount = 10;
									sport.total = sport.price * 0.9;
								} else if (playerIndex == 1) {
									totalPrice += sport.price;
									sport.discount = 0;
									sport.total = sport.price;
								}
							}
							break;

						default:
							if (playerIndex == 0) {
								totalPrice += sport.price * 0.8;
								sport.discount = 20;
								sport.total = sport.price * 0.8;
							} else if (playerIndex == 1) {
								totalPrice += sport.price * 0.9;
								sport.discount = 10;
								sport.total = sport.price * 0.9;
							} else {
								totalPrice += sport.price;
								sport.discount = 0;
								sport.total = sport.price;
							}
							break;
					}
					accSports.push(sport);
					return accSports;
				}, []);
				player.sports = sports;
				accPlayers.push(player);
				return accPlayers;
			},
			[]
		);
		setWithDiscountList(old => [...old, ...single]);
		setTotalPrice(oldPrice => (oldPrice += totalPrice));
	};

	const calculate = () => {
		if (!players) return;
		setWithDiscountList([]);
		setPrivateList([]);
		setWithNoDiscountList([]);
		setTotalPrice(0);
		firstTimeRender.current = false;
		players.forEach(element => {
			playerDivider(element);
		});

		firstTimeRender.current = true;
	};

	return (
		<div className={styles.container}>
			<div className={styles.title}>Calculate Sports Payments</div>
			<PlayersList />
			<h3 style={{ color: "red" }}>{totalPrice}</h3>
			<button
				type="button"
				onClick={() => {
					calculate();
				}}
			>
				Calculate
			</button>
			<div>
				<div className={styles.adtable_wrapper}>
					<div className={styles.adtable_header}>
						<div className={styles.title}>private</div>
						<div
							className={` ${styles.adtable_row.headers} ${styles.adtable_table_header} ${styles.adtable_row}`}
						>
							<p>Name</p>
							<p>Category</p>
							<p>Price</p>
							<p>Discount</p>
							<p>Total</p>
						</div>
					</div>
					<ul className={styles.adtable_table_body}>
						{privateList?.map((item, index) => (
							<li
								key={index}
								className={styles.adtable_row.table_data}
							>
								<p>{item.name}</p>
								<ul>
									{item.sports?.map((sport, index) => (
										<li key={index}>
											{" "}
											<div
												className={
													styles.adtable_table_data_cell
												}
											>
												{sport.name}
											</div>
											<div
												className={
													styles.adtable_table_data_cell
												}
											>
												{sport.categories}
											</div>
											<div
												className={
													styles.adtable_table_data_cell
												}
											>
												{sport.type}
											</div>
											<div
												className={
													styles.adtable_table_data_cell
												}
											>
												{sport.price}$
											</div>
											{sport.discount > -1 && (
												<div
													className={
														styles.adtable_table_data_cell
													}
												>
													{sport.discount}%
												</div>
											)}
											{sport.discount > -1 && (
												<div
													className={
														styles.adtable_table_data_cell
													}
												>
													{sport.total}$
												</div>
											)}
										</li>
									))}
								</ul>
							</li>
						))}
					</ul>
				</div>

				<div className={styles.adtable_wrapper}>
					<h5>Discount</h5>
					<ul>
						{withDiscountList?.map((item, index) => (
							<li key={index}>
								<h5>{item.name}</h5>
								<ul>
									{item.sports?.map((sport, index) => (
										<li key={index}>
											{" "}
											<div>{sport.name}</div>
											<div>{sport.category}</div>
											<div>{sport.type}</div>
											<div>{sport.price}$</div>
											{sport.discount > -1 && (
												<div>
													<div>
														{sport.discount}%
													</div>
													<div>{sport.total}$</div>
												</div>
											)}
										</li>
									))}
								</ul>
							</li>
						))}
					</ul>
				</div>

				<div className={styles.adtable_wrapper}>
					<h5>No-Discount</h5>
					<ul>
						{withNoDiscountList?.map((item, index) => (
							<li key={index}>
								<h5>{item.name}</h5>
								<ul>
									{item.sports?.map((sport, index) => (
										<li key={index}>
											{" "}
											<div>{sport.name}</div>
											<div>{sport.categories}</div>
											<div>{sport.type}</div>
											<div>{sport.price}$</div>
											{sport.discount > -1 && (
												<div>
													<div>
														{sport.discount}%
													</div>
													<div>{sport.total}$</div>
												</div>
											)}
										</li>
									))}
								</ul>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default HomePage;
