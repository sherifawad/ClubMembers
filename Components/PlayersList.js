import { useEffect, useState } from "react";
import Link from "next/link";

import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/components/PlayersList.module.scss";
import { deletePlayer } from "../StoreRedux/playersSlice";
import { createSelector } from "@reduxjs/toolkit";

function PlayersList({ playersList }) {
	// Extracting players state from redux store
	const selectPlayers = createSelector(
		state => state.players,
		players => players.playersState
	);
	const playersItems = useSelector(selectPlayers);
	const dispatch = useDispatch();
	const [players, setPlayers] = useState([]);
	useEffect(() => {
		setPlayers(playersItems);
		playersList(playersItems);
	}, [playersItems, playersList]);

	const handleDeletePlayer = playerId => {
		dispatch(deletePlayer(playerId));
	};

	return (
		<div className={styles.container}>
			{players.map((player, index) => (
				<div key={index} className={styles.items}>
					<div className={styles.items_head}>
						<Link
							href={{
								pathname: "/AddPage",
								query: { pid: player.id }
							}}
						>
							<a>
								<p>{player.name}</p>
							</a>
						</Link>
						<span
							className={styles.item_icon}
							onClick={() => handleDeletePlayer(player.id)}
						>
							X
						</span>
						<hr />
					</div>

					<div className={styles.items_body}>
						{player.sports.map((sport, index) => (
							<div
								key={index}
								className={styles.items_body_content}
							>
								<span>{sport.name}</span>
								<span>{sport.category}</span>
								<span>{sport.type}</span>
								<span>{sport.price}$</span>
								{sport.discount > 0 && (
									<span>{sport.discount}$</span>
								)}
							</div>
						))}
					</div>
				</div>
			))}
		</div>
	);
}

export default PlayersList;
