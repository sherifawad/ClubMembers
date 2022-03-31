import styles from "../styles/pages/Home.module.scss";
import PlayersList from "../Components/PlayersList";
import { Suspense, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import CalculatedResult from "../Components/CalculatedResult";
import Head from "next/head";
import TabComponent from "../Components/TabComponent";
import { isBlank } from "../Data/utils";
import ScanResult from "../Components/ScanResult";

const HomePage = () => {
	const [players, setPlayers] = useState([]);
	const [scanResultData, setScanResultData] = useState("");
	// pass calc option from calculated result components and button in home page
	const [handler, setHandler] = useState(() => {});
	const QrDialogRef = useRef();
	const scanResultDialogRef = useRef();

	const router = useRouter();

	// check for queries
	useEffect(() => {
		const { data } = router.query;
		if (!data || isBlank(data)) return;
		setScanResultData(data);
		if (!scanResultDialogRef.current.open) {
			scanResultDialogRef.current.showModal();
		}
	}, [router.query]);

	const handleCloseModel = () => {
		if (QrDialogRef.current.open) {
			QrDialogRef.current.close();
		}
	};

	const handleOpenModel = () => {
		if (!QrDialogRef.current.open) {
			QrDialogRef.current.showModal();
		}
	};

	const handleCancelModel = () => {
		if (scanResultDialogRef.current.open) {
			scanResultDialogRef.current.close();
		}
	};
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
				<dialog ref={scanResultDialogRef}>
					<ScanResult
						className={styles.dialog}
						handleEvent={handleCancelModel}
						data={scanResultData}
					/>
				</dialog>

				<dialog ref={QrDialogRef}>
					<div className={styles.discountContainer}>
						<Suspense>
							<TabComponent
								players={players}
								handleEvent={handleCloseModel}
							/>
						</Suspense>
					</div>
				</dialog>
				{players?.length > 0 && (
					<CalculatedResult
						players={players}
						setHandler={setHandler}
					/>
				)}
				<button type="button" onClick={handleOpenModel}>
					Share
				</button>
				<button
					type="button"
					className={styles.calcButton}
					onClick={handler}
				>
					Calculate
				</button>
			</div>
		</>
	);
};

export default HomePage;
