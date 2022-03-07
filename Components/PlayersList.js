import React, { useState } from "react";
import { useSelector } from "react-redux";
import styles from "../styles/components/PlayersList.module.scss";

function PlayersList() {
	// Extracting players state from redux store
	const players = useSelector(state => state.players);
	return (
		<div className={styles.container}>
			{players.map(player => (
				<div key={player.id} className={styles.items}>
					<div className={styles.items_head}>
						<p>{player.name}</p>
						<hr />
					</div>
					<div className={styles.items_body}>
						{player.sports.map(sport => (
							<div
								key={sport.id}
								className={styles.items_body_content}
							>
								<span>{sport.name}</span>
								<span className={styles.item_icon}>{">"}</span>
							</div>
						))}
					</div>
				</div>
			))}
		</div>
	);
}

export default PlayersList;
