import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import { useSelector } from "react-redux";
import styles from "../styles/components/PlayersList.module.scss";

function PlayersList() {
	// Extracting players state from redux store
	const players = useSelector(state => state.players) ?? [];

	return (
		<div className={styles.container}>
			{players.map(player => (
				<div key={player.id} className={styles.items}>
					<Link
						href={{
							pathname: "/AddPage",
							query: { pid: player.id }
						}}
					>
						<a>
							<div className={styles.items_head}>
								<p>{player.name}</p>
								<span className={styles.item_icon}>{">"}</span>
								<hr />
							</div>
						</a>
					</Link>

					<div className={styles.items_body}>
						{player.sports.map(sport => (
							<div
								key={sport.id}
								className={styles.items_body_content}
							>
								<span>{sport.name}</span>
							</div>
						))}
					</div>
				</div>
			))}
		</div>
	);
}

export default PlayersList;
