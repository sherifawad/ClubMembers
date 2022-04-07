import { useEffect, useState } from "react";
import Link from "next/link";

import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/components/PlayersList.module.scss";
import { deletePlayer, selectPlayers } from "../StoreRedux/playersSlice";
import { fetchAllSports, selectSports } from "../StoreRedux/sportSlice";

function PlayersList({ playersList, language = "ar" }) {
	// Extracting players state from redux store
	const playersItems = useSelector(selectPlayers);
	// Extracting sports state from redux store
	const { list, loading, error } = useSelector(selectSports);
	const dispatch = useDispatch();
	const [players, setPlayers] = useState([]);

	useEffect(() => {
		if (list.length === 0) {
			dispatch(fetchAllSports());
		}
	}, [dispatch, list, list.length]);
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
								<span>{sport.name[language]}</span>
								<span>{sport.categoryName[language]}</span>
								<span>{sport.typeName[language]}</span>
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
