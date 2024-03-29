import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import styles from "../styles/components/CalculatedResult.module.scss";
function CalculatedResult({ players = [], setHandler, language = "ar" }) {
	const t = useTranslations("CalculatedResult");

	const [withDiscountList, setWithDiscountList] = useState([]);
	const [withNoDiscountList, setWithNoDiscountList] = useState([]);
	const [privateList, setPrivateList] = useState([]);

	const [isToggled, setIsToggled] = useState(false);
	const [currentRadioValue, setCurrentRadioValue] = useState(0);

	const [totalPrice, setTotalPrice] = useState(0);

	const firstTimeRender = useRef(false);
	const dialogRef = useRef();

	useEffect(() => {
		setHandler(() => () => {
			if (!players) return;
			setWithDiscountList([]);
			setPrivateList([]);
			setWithNoDiscountList([]);
			setTotalPrice(0);
			firstTimeRender.current = false;
			players.forEach(element => {
				playerDivider(element);
			});
			if (!dialogRef.current.open) {
				dialogRef.current.showModal();
			}
		});
	}, [players, setHandler]);

	const toggleChange = () => {
		setIsToggled(!isToggled);
		if (isToggled) {
			setCurrentRadioValue(0);
		}
	};

	const handleRadioChange = e => {
		if (!isToggled) {
			setCurrentRadioValue(0);
			return;
		}

		setCurrentRadioValue(parseFloat(e.target.value));
	};

	// set penalty or fin after specific date
	const penaltyDays = (originalPrice, maX = 10, penaltY = 5) => {
		const date = new Date();
		const todayAsNumber = parseInt(date.getDate());
		const max = parseInt(maX);
		const penalty = parseFloat(penaltY);
		if (todayAsNumber <= max)
			return { penalty: 0, finalePrice: originalPrice };
		const totalPenalty = (todayAsNumber - max) * penalty;
		const finalPrice = totalPenalty + originalPrice;
		return { penalty: totalPenalty, finalePrice: finalPrice };
	};

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
				s => s.categoryId !== 2
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
				s => s.categoryId === 2
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
		}
		return dividedPlayer;
	};

	const handleNoDiscountList = list => {
		let totalPrice = 0;
		const players = list?.reduce((accPlayers, player) => {
			const sports = player.sports?.reduce((accSports, sport) => {
				//copy sport to edit as redux set values as read only
				let newSport = { ...sport };
				totalPrice += sport.price;
				newSport.discount = 0;
				newSport.total = sport.price;
				accSports.push(newSport);
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
		if (!list || list.length < 1) return;
		let totalPrice = 0;
		//check the current day
		let newDate = new Date();
		//get today as integer
		let today = parseInt(newDate.getDate());
		//get player with schools group sport type
		let filteredPlayer;

		list.forEach(player => {
			player.sports.forEach(sport => {
				if (sport.id === 1 && sport.typeId === 6) {
					list = list.filter(p => p.id !== player.id);
					//copy player as redux set values as read only
					filteredPlayer = {
						...player,
						sports: [{ ...player.sports[0] }]
					};
				}
			});
		});
		if (filteredPlayer) {
			//remove from list then add it last on accumulated players and at last sort by sport price
			list = list.sort((a, b) =>
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
		list = list.sort((a, b) =>
			a.sports[0].price > b.sports[0].price ? -1 : 1
		);
		const players = list?.reduce((accPlayers, player, playerIndex) => {
			const sports = player.sports?.reduce((accSports, sport) => {
				//copy sport to edit as redux set values as read only
				let newSport = { ...sport };
				switch (list.length) {
					case 1:
						//check if calculation within first 5 days of the month
						if (today <= 5) {
							totalPrice += sport.price * 0.9;
							newSport.discount = 10;
							newSport.total = sport.price * 0.9;
						} else {
							totalPrice += sport.price;
							newSport.discount = 0;
							newSport.total = sport.price;
						}
						break;

					//There is a second brother
					case 2:
						if (playerIndex == 0) {
							totalPrice += sport.price * 0.8;
							newSport.discount = 20;
							newSport.total = sport.price * 0.8;
						} else {
							if (today <= 5) {
								totalPrice += sport.price * 0.9;
								newSport.discount = 10;
								newSport.total = sport.price * 0.9;
							} else {
								totalPrice += sport.price;
								newSport.discount = 0;
								newSport.total = sport.price;
							}
						}
						break;

					//There is a three or more  brother
					default:
						if (playerIndex == 0) {
							totalPrice += sport.price * 0.7;
							newSport.discount = 30;
							newSport.total = sport.price * 0.7;
						} else if (playerIndex == 1) {
							totalPrice += sport.price * 0.8;
							newSport.discount = 20;
							newSport.total = sport.price * 0.8;
						} else if (playerIndex == 2) {
							if (today <= 5) {
								totalPrice += sport.price * 0.9;
								newSport.discount = 10;
								newSport.total = sport.price * 0.9;
							} else {
								totalPrice += sport.price;
								newSport.discount = 0;
								newSport.total = sport.price;
							}
						} else {
							totalPrice += sport.price;
							newSport.discount = 0;
							newSport.total = sport.price;
						}
						break;
				}
				accSports.push(newSport);
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
					const newSports = player.sports?.reduce(
						(accSports, sport, sportIndex) => {
							//copy sport to edit as redux set values as read only
							let newSport = { ...sport };
							switch (player.sports.length) {
								case 2:
									if (sportIndex == 0) {
										totalPrice += sport.price * 0.9;
										newSport.discount = 10;
										//check if sport can has penalty
										if (newSport.penalty) {
											const pent = penaltyDays(
												sport.price * 0.9
											);
											newSport.penaltyFees = pent.penalty;
											newSport.total = pent.finalePrice;
										} else {
											newSport.penaltyFees = 0;
											newSport.total = sport.price * 0.9;
										}
									} else {
										totalPrice += sport.price;
										newSport.discount = 0;
										//check if sport can has penalty
										if (newSport.penalty) {
											const pent = penaltyDays(
												sport.price
											);
											newSport.penaltyFees = pent.penalty;
											newSport.total = pent.finalePrice;
										} else {
											newSport.penaltyFees = 0;
											newSport.total = sport.price;
										}
									}
									break;

								default:
									if (sportIndex == 0) {
										totalPrice += sport.price * 0.8;
										newSport.discount = 20;
										//check if sport can has penalty
										if (newSport.penalty) {
											const pent = penaltyDays(
												sport.price * 0.8
											);
											newSport.penaltyFees = pent.penalty;
											newSport.total = pent.finalePrice;
										} else {
											newSport.penaltyFees = 0;
											newSport.total = sport.price * 0.8;
										}
									} else if (sportIndex == 1) {
										totalPrice += sport.price * 0.9;
										newSport.discount = 10;
										//check if sport can has penalty
										if (newSport.penalty) {
											const pent = penaltyDays(
												sport.price * 0.9
											);
											newSport.penaltyFees = pent.penalty;
											newSport.total = pent.finalePrice;
										} else {
											newSport.penaltyFees = 0;
											newSport.total = sport.price * 0.9;
										}
									} else {
										totalPrice += sport.price;
										newSport.discount = 0;
										//check if sport can has penalty
										if (newSport.penalty) {
											const pent = penaltyDays(
												sport.price
											);
											newSport.penaltyFees = pent.penalty;
											newSport.total = pent.finalePrice;
										} else {
											newSport.penaltyFees = 0;
											newSport.total = sport.price;
										}
									}
									break;
							}
							accSports.push(newSport);
							return accSports;
						},
						[]
					);
					player.sports = newSports;
					accPlayers.push({ ...player, Sports: newSports });
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
					//copy sport to edit as redux set values as read only
					let newSport = { ...sport };
					switch (playersWithOne.length) {
						case 1:
							if (playersWithMultiple.length > 0) {
								totalPrice += sport.price * 0.9;
								newSport.discount = 10;
								//check if sport can has penalty
								if (newSport.penalty) {
									const pent = penaltyDays(sport.price * 0.9);
									newSport.penaltyFees = pent.penalty;
									newSport.total = pent.finalePrice;
								} else {
									newSport.penaltyFees = 0;
									newSport.total = sport.price * 0.9;
								}
							} else {
								totalPrice += sport.price;
								newSport.discount = 0;
								//check if sport can has penalty
								if (newSport.penalty) {
									const pent = penaltyDays(sport.price);
									newSport.penaltyFees = pent.penalty;
									newSport.total = pent.finalePrice;
								} else {
									newSport.penaltyFees = 0;
									newSport.total = sport.price;
								}
							}
							break;
						case 2:
							if (playersWithMultiple.length > 0) {
								if (playerIndex == 0) {
									totalPrice += sport.price * 0.8;
									newSport.discount = 20;
									//check if sport can has penalty
									if (newSport.penalty) {
										const pent = penaltyDays(
											sport.price * 0.9
										);
										newSport.penaltyFees = pent.penalty;
										newSport.total = pent.finalePrice;
									} else {
										newSport.penaltyFees = 0;
										newSport.total = sport.price * 0.9;
									}
								} else if (playerIndex == 1) {
									totalPrice += sport.price * 0.9;
									newSport.discount = 10;
									//check if sport can has penalty
									if (newSport.penalty) {
										const pent = penaltyDays(
											sport.price * 0.9
										);
										newSport.penaltyFees = pent.penalty;
										newSport.total = pent.finalePrice;
									} else {
										newSport.penaltyFees = 0;
										newSport.total = sport.price * 0.9;
									}
								}
							} else {
								if (playerIndex == 0) {
									totalPrice += sport.price * 0.9;
									newSport.discount = 10;
									//check if sport can has penalty
									if (newSport.penalty) {
										const pent = penaltyDays(
											sport.price * 0.9
										);
										newSport.penaltyFees = pent.penalty;
										newSport.total = pent.finalePrice;
									} else {
										newSport.penaltyFees = 0;
										newSport.total = sport.price * 0.9;
									}
								} else if (playerIndex == 1) {
									totalPrice += sport.price;
									newSport.discount = 0;
									//check if sport can has penalty
									if (newSport.penalty) {
										const pent = penaltyDays(sport.price);
										newSport.penaltyFees = pent.penalty;
										newSport.total = pent.finalePrice;
									} else {
										newSport.penaltyFees = 0;
										newSport.total = sport.price;
									}
								}
							}
							break;

						default:
							if (playerIndex == 0) {
								totalPrice += sport.price * 0.8;
								newSport.discount = 20;
								//check if sport can has penalty
								if (newSport.penalty) {
									const pent = penaltyDays(sport.price * 0.8);
									newSport.penaltyFees = pent.penalty;
									newSport.total = pent.finalePrice;
								} else {
									newSport.penaltyFees = 0;
									newSport.total = sport.price * 0.8;
								}
							} else if (playerIndex == 1) {
								totalPrice += sport.price * 0.9;
								newSport.discount = 10;
								//check if sport can has penalty
								if (newSport.penalty) {
									const pent = penaltyDays(sport.price * 0.9);
									newSport.penaltyFees = pent.penalty;
									newSport.total = pent.finalePrice;
								} else {
									newSport.penaltyFees = 0;
									newSport.total = sport.price * 0.9;
								}
							} else {
								totalPrice += sport.price;
								newSport.discount = 0;
								//check if sport can has penalty
								if (newSport.penalty) {
									const pent = penaltyDays(sport.price);
									newSport.penaltyFees = pent.penalty;
									newSport.total = pent.finalePrice;
								} else {
									newSport.penaltyFees = 0;
									newSport.total = sport.price;
								}
							}
							break;
					}
					accSports.push(newSport);
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

	const handlePaymentOPtions = () => {
		setWithDiscountList([]);
		setPrivateList([]);
		setWithNoDiscountList([]);
		setTotalPrice(0);
		firstTimeRender.current = true;

		if (firstTimeRender.current) {
			handleNoDiscountList(withNoDiscountList);
			handlePrivateSwimmingList(privateList);
			handleDiscountList(withDiscountList);
			setTotalPrice(price => (price += price * currentRadioValue));
			if (dialogRef.current.open) {
				dialogRef.current.close();
			}
		}
	};

	return (
		<div className={styles.container}>
			<dialog ref={dialogRef}>
				<div className={styles.discountContainer}>
					<div className={styles.discountItemContainer}>
						<div className={styles.discountSwitchContainer}>
							<input
								className={`${styles.tgl} ${styles.tglSkewed}`}
								id="cb3"
								type="checkbox"
								checked={isToggled}
								onChange={toggleChange}
							/>
							<label
								className={styles.tglBtn}
								data-tg-off={t("visaOff")}
								data-tg-on={t("visaOn")}
								htmlFor="cb3"
							></label>
						</div>

						<div className={styles.radioContainer}>
							<div className={styles.radioItem}>
								<input
									id="radio-item-1"
									name="radio-item-1"
									type="radio"
									value={0.01}
									onChange={handleRadioChange}
									checked={currentRadioValue === 0.01}
								/>
								<label htmlFor="radio-item-1">
									{t("ahlyBank")}
								</label>
							</div>

							<div className={styles.radioItem}>
								<input
									id="radio-item-2"
									name="radio-item-2"
									type="radio"
									value={0.02}
									onChange={handleRadioChange}
									checked={currentRadioValue === 0.02}
								/>
								<label htmlFor="radio-item-2">
									{" "}
									{t("otherBank")}
								</label>
							</div>
						</div>
					</div>
					{currentRadioValue > 0 && <h3>+{currentRadioValue}</h3>}
					<div className={styles.dialogButtonsContainer}>
						{" "}
						<button
							type="button"
							onClick={() => {
								handlePaymentOPtions();
							}}
						>
							{t("calculate")}
						</button>
						<button
							type="button"
							onClick={() => {
								dialogRef.current.close();
							}}
						>
							{t("cancel")}
						</button>
					</div>
				</div>
			</dialog>

			{totalPrice > 0 && <h3 className={styles.price}>{totalPrice} $</h3>}

			{firstTimeRender.current === true && (
				<div className={styles.result__tablesContainer}>
					{privateList?.length > 0 && (
						<div className={styles.table_wrapper}>
							<div className={styles.table_header}>
								<div className={styles.title}>
									{t("privateSwimming")}
								</div>
							</div>

							<div className={styles.dataWrapper}>
								<div className={styles.table_head}>
									<p
										className={styles.table_column_header}
									></p>
									<p className={styles.table_row_header}>
										{t("name")}
									</p>
									<p className={styles.table_row_header}>
										{t("category")}
									</p>
									<p className={styles.table_row_header}>
										{t("type")}
									</p>
									<p className={styles.table_row_header}>
										{t("price")}
									</p>
									<p className={styles.table_row_header}>
										{t("discount")}
									</p>

									<p className={styles.table_row_header}>
										{t("penalty")}
									</p>
									<p className={styles.table_row_header}>
										{t("total")}
									</p>
								</div>
								<ul className={styles.table_body}>
									{privateList?.map((item, index) => (
										<li
											key={index}
											style={{
												"--sports-length":
													item.sports?.length
											}}
											className={styles.table_row}
										>
											<p
												className={
													styles.table_column_header
												}
											>
												{item.name}
											</p>

											{item.sports?.map(
												(sport, index) => (
													<ul
														key={index}
														className={
															styles.table_data
														}
													>
														<li
															className={
																styles.data_cell
															}
														>
															<p
																data-title={t(
																	"name"
																)}
															>
																{
																	sport.name[
																		language
																	]
																}
															</p>
														</li>
														<li
															className={
																styles.data_cell
															}
														>
															<p
																data-title={t(
																	"category"
																)}
															>
																{
																	sport
																		.categoryName[
																		language
																	]
																}
															</p>
														</li>
														<li
															className={
																styles.data_cell
															}
														>
															<p
																data-title={t(
																	"type"
																)}
															>
																{
																	sport
																		.typeName[
																		language
																	]
																}
															</p>
														</li>
														<li
															className={
																styles.data_cell
															}
														>
															<p
																data-title={t(
																	"price"
																)}
															>
																{sport.price}$
															</p>
														</li>
														{sport.discount >
															-1 && (
															<li
																className={
																	styles.data_cell
																}
															>
																<p
																	data-title={t(
																		"discount"
																	)}
																>
																	-{" "}
																	{
																		sport.discount
																	}
																	%
																</p>
															</li>
														)}
														<li
															className={
																styles.data_cell
															}
														>
															<p
																data-title={t(
																	"penalty"
																)}
															>
																+{" "}
																{
																	sport.penaltyFees
																}
																$
															</p>
														</li>
														{sport.discount >
															-1 && (
															<li
																className={
																	styles.data_cell
																}
															>
																<p
																	data-title={t(
																		"total"
																	)}
																>
																	{
																		sport.total
																	}
																	$
																</p>
															</li>
														)}
													</ul>
												)
											)}
										</li>
									))}
								</ul>
							</div>
						</div>
					)}

					{withDiscountList?.length > 0 && (
						<div className={styles.table_wrapper}>
							<div className={styles.table_header}>
								<div className={styles.title}>
									{t("discountSports")}
								</div>
							</div>

							<div className={styles.dataWrapper}>
								<div className={` ${styles.table_head}`}>
									<p
										className={styles.table_column_header}
									></p>

									<p className={styles.table_row_header}>
										{t("name")}
									</p>
									<p className={styles.table_row_header}>
										{t("category")}
									</p>
									<p className={styles.table_row_header}>
										{t("type")}
									</p>
									<p className={styles.table_row_header}>
										{t("price")}
									</p>
									<p className={styles.table_row_header}>
										{t("discount")}
									</p>

									<p className={styles.table_row_header}>
										{t("penalty")}
									</p>
									<p className={styles.table_row_header}>
										{t("total")}
									</p>
								</div>
								<ul className={styles.table_body}>
									{withDiscountList?.map((item, index) => (
										<li
											key={index}
											style={{
												"--sports-length":
													item.sports?.length
											}}
											className={styles.table_row}
										>
											<p
												className={
													styles.table_column_header
												}
											>
												{item.name}
											</p>

											{item.sports?.map(
												(sport, index) => (
													<ul
														key={index}
														className={
															styles.table_data
														}
													>
														<li
															className={
																styles.data_cell
															}
														>
															<p
																data-title={t(
																	"name"
																)}
															>
																{
																	sport.name[
																		language
																	]
																}
															</p>
														</li>
														<li
															className={
																styles.data_cell
															}
														>
															<p
																data-title={t(
																	"category"
																)}
															>
																{
																	sport
																		.categoryName[
																		language
																	]
																}
															</p>
														</li>
														<li
															className={
																styles.data_cell
															}
														>
															<p
																data-title={t(
																	"type"
																)}
															>
																{
																	sport
																		.typeName[
																		language
																	]
																}
															</p>
														</li>
														<li
															className={
																styles.data_cell
															}
														>
															<p
																data-title={t(
																	"price"
																)}
															>
																{sport.price}$
															</p>
														</li>
														{sport.discount >
															-1 && (
															<li
																className={
																	styles.data_cell
																}
															>
																<p
																	data-title={t(
																		"discount"
																	)}
																>
																	-{" "}
																	{
																		sport.discount
																	}
																	%
																</p>
															</li>
														)}
														<li
															className={
																styles.data_cell
															}
														>
															<p
																data-title={t(
																	"penalty"
																)}
															>
																+{" "}
																{
																	sport.penaltyFees
																}
																$
															</p>
														</li>
														{sport.discount >
															-1 && (
															<li
																className={
																	styles.data_cell
																}
															>
																<p
																	data-title={t(
																		"total"
																	)}
																>
																	{
																		sport.total
																	}
																	$
																</p>
															</li>
														)}
													</ul>
												)
											)}
										</li>
									))}
								</ul>
							</div>
						</div>
					)}

					{withNoDiscountList?.length > 0 && (
						<div className={styles.table_wrapper}>
							<div className={styles.table_header}>
								<div className={styles.title}>
									{t("withoutDiscountSports")}
								</div>
							</div>

							<div className={styles.dataWrapper}>
								<div className={` ${styles.table_head}`}>
									<p
										className={styles.table_column_header}
									></p>

									<p className={styles.table_row_header}>
										{t("name")}
									</p>
									<p className={styles.table_row_header}>
										{t("category")}
									</p>
									<p className={styles.table_row_header}>
										{t("type")}
									</p>
									<p className={styles.table_row_header}>
										{t("price")}
									</p>
									<p className={styles.table_row_header}>
										{t("discount")}
									</p>

									<p className={styles.table_row_header}>
										{t("penalty")}
									</p>
									<p className={styles.table_row_header}>
										{t("total")}
									</p>
								</div>
								<ul className={styles.table_body}>
									{withNoDiscountList?.map((item, index) => (
										<li
											key={index}
											style={{
												"--sports-length":
													item.sports?.length
											}}
											className={styles.table_row}
										>
											<p
												className={
													styles.table_column_header
												}
											>
												{item.name}
											</p>

											{item.sports?.map(
												(sport, index) => (
													<ul
														key={index}
														className={
															styles.table_data
														}
													>
														<li
															className={
																styles.data_cell
															}
														>
															<p
																data-title={t(
																	"name"
																)}
															>
																{
																	sport.name[
																		language
																	]
																}
															</p>
														</li>
														<li
															className={
																styles.data_cell
															}
														>
															<p
																data-title={t(
																	"category"
																)}
															>
																{
																	sport
																		.categoryName[
																		language
																	]
																}
															</p>
														</li>
														<li
															className={
																styles.data_cell
															}
														>
															<p
																data-title={t(
																	"type"
																)}
															>
																{
																	sport
																		.typeName[
																		language
																	]
																}
															</p>
														</li>
														<li
															className={
																styles.data_cell
															}
														>
															<p
																data-title={t(
																	"price"
																)}
															>
																{sport.price}$
															</p>
														</li>
														{sport.discount >
															-1 && (
															<li
																className={
																	styles.data_cell
																}
															>
																<p
																	data-title={t(
																		"discount"
																	)}
																>
																	-{" "}
																	{
																		sport.discount
																	}
																	%
																</p>
															</li>
														)}
														<li
															className={
																styles.data_cell
															}
														>
															<p
																data-title={t(
																	"penalty"
																)}
															>
																+{" "}
																{
																	sport.penaltyFees
																}
																$
															</p>
														</li>
														{sport.discount >
															-1 && (
															<li
																className={
																	styles.data_cell
																}
															>
																<p
																	data-title={t(
																		"total"
																	)}
																>
																	{
																		sport.total
																	}
																	$
																</p>
															</li>
														)}
													</ul>
												)
											)}
										</li>
									))}
								</ul>
							</div>
						</div>
					)}
				</div>
			)}
		</div>
	);
}

export default CalculatedResult;
