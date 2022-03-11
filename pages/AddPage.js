import React, { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import AddSport from "../Components/AddSport";
import SportsList from "../Components/SportsList";
import { isBlank } from "../Data/utils";
import { addPlayer } from "../StoreRedux/playersSlice";
import styles from "../styles/pages/AddPage.module.scss";

const AddPage = () => {
	const router = useRouter();
	const [name, setName] = useState();
	const [sport, setSport] = useState();
	const [playerSportsList, setPlayerSportsList] = useState([]);
	const dispatch = useDispatch();
	const players = useSelector(state => state.players);

	const handlePlayerAddition = () => {
		if (isBlank(name) || playerSportsList.length < 1) return;
		const playerExists = players.find(
			player =>
				player.name.toLocaleLowerCase() === name.toLocaleLowerCase()
		);
		if (playerExists) {
			return;
		}
		const player = {
			name: name,
			sports: playerSportsList
		};

		try {
			dispatch(addPlayer(player));
			router.push("/");
		} catch (err) {
			console.log(
				"🚀 ~ file: AddPage.js ~ line 29 ~ handlePlayerAddition ~ err",
				err
			);
		}
	};

	return (
		<div className={styles.container}>
			<input
				type="text"
				className={styles.searchInput}
				placeholder="Player Name"
				value={name}
				onChange={e => setName(e.target.value)}
			/>
			<AddSport setSport={setSport} />

			<SportsList
				sport={sport}
				setPlayerSportsList={setPlayerSportsList}
			/>
			<button type="button" onClick={handlePlayerAddition}>
				Add Player
			</button>
		</div>
	);
};

export default AddPage;
