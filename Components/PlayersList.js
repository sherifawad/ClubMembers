import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/components/PlayersList.module.scss";
import { deletePlayer } from "../StoreRedux/playersSlice";

function PlayersList() {
	// Extracting players state from redux store
	const playersItems = useSelector(state => state.players);
	const dispatch = useDispatch();
	const [players, setPlayers] = useState([]);
	useEffect(() => {
		setPlayers(playersItems);
	}, [playersItems]);

	const handleDeletePlayer = playerId => {
		dispatch(deletePlayer(playerId));
	};

	return (
		<div className={styles.container}>
			{players.map(player => (
				<div key={player.id} className={styles.items}>
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
						{player.sports.map(sport => (
							<div
								key={sport.id}
								className={styles.items_body_content}
							>
								<span>{sport.name}</span>
								<span>{sport.categories}</span>
								<span>{sport.type}</span>
								<span>{sport.price}$</span>
							</div>
						))}
					</div>
				</div>
			))}
		</div>
	);
}

export default PlayersList;