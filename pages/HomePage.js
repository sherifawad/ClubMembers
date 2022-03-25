import styles from "../styles/pages/Home.module.scss";
import PlayersList from "../Components/PlayersList";
import { useState } from "react";
import CalculatedResult from "../Components/CalculatedResult";

const HomePage = () => {
	const [players, setPlayers] = useState([]);

	return (
		<div className={styles.container}>
			<div className={styles.title}>Calculate Sports Payments</div>
			<PlayersList playersList={setPlayers} />
			<CalculatedResult players={players} />
		</div>
	);
};

export default HomePage;
