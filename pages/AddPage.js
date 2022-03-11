import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import AddSport from "../Components/AddSport";
import SportsList from "../Components/SportsList";
import { isBlank } from "../Data/utils";
import {
	addPlayer,
	getPlayerId,
	updatePlayer
} from "../StoreRedux/playersSlice";
import styles from "../styles/pages/AddPage.module.scss";

const AddPage = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	const [name, setName] = useState();
	const [sport, setSport] = useState();
	const [playerSportsList, setPlayerSportsList] = useState([]);
	const [receivedPlayerSportsList, setReceivedPlayerSportsList] = useState(
		[]
	);
	const [isUpdate, setIsUpdate] = useState(false);
	const [playerId, setPlayerId] = useState(0);
	const players = useSelector(state => state.players);

	// check for queries
	useEffect(() => {
		const { pid } = router.query;
		if (!pid || pid === 0) return;
		const playerExists = players.find(
			player => player.id === parseInt(pid)
		);

		if (playerExists) {
			setName(playerExists.name);
			setReceivedPlayerSportsList(playerExists.sports);
			setIsUpdate(true);
			setPlayerId(playerExists.id);
		}
	}, [players, router.query]);

	const handlePlayerAddition = () => {
		if (isBlank(name) || playerSportsList.length < 1) return;
		const player = {
			name: name,
			sports: playerSportsList
		};
		const playerExists = players.find(
			player =>
				player.name.toLocaleLowerCase() === name.toLocaleLowerCase()
		);
		if (playerExists) {
			if (!isUpdate || (isUpdate && playerExists.id !== playerId)) return;
		}
		try {
			if (isUpdate) {
				player.id = playerId;
				dispatch(updatePlayer(player));
			} else {
				dispatch(addPlayer(player));
			}
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
				receivedPlayerSportsList={receivedPlayerSportsList}
			/>
			<button type="button" onClick={handlePlayerAddition}>
				{isUpdate ? "Update Player" : "Add Player"}
			</button>
		</div>
	);
};

export default AddPage;
