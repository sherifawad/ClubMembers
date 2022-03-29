import styles from "../styles/pages/Home.module.scss";
import PlayersList from "../Components/PlayersList";
import { useState } from "react";
import CalculatedResult from "../Components/CalculatedResult";
import Head from "next/head";
import TabComponent from "../Components/TabComponent";

const HomePage = () => {
	const [players, setPlayers] = useState([]);

	return (
		<>
			<Head>
				<title>Club Members</title>
				<meta
					name="description"
					content="A site that Save sports subscriptions an calculate the total payments including the discounts that may be applied and the payment type cash or with credit card"
				></meta>
				<meta name="theme-color" content="#fff" />
				<meta
					name="viewport"
					content="initial-scale=1.0, width=device-width"
				/>
				<link rel="manifest" href="/manifest.json" />
				<link rel="apple-touch-icon" href="/icon.png"></link>
				<link
					rel="shortcut icon"
					href="favicon.ico"
					type="image/x-icon"
				/>
			</Head>
			<div className={styles.container}>
				<div className={styles.title}>Calculate Sports Payments</div>
				<PlayersList playersList={setPlayers} />
				<TabComponent players={players} />
				{players?.length > 0 && <CalculatedResult players={players} />}
			</div>
		</>
	);
};

export default HomePage;
