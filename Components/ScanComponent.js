import { useEffect, useRef, useState } from "react";
import { QrReader } from "react-qr-reader";
import styles from "../styles/components/ScanComponent.module.scss";
function ScanComponent() {
	const [data, setData] = useState("");
	const [players, setPlayers] = useState([]);
	const [year, setYear] = useState("");
	const [code, setCode] = useState("");
	const [schoolGroupSelected, setSchoolGroupSelected] = useState(false);

	const dialogRef = useRef();

	let containerStyle = {
		display: "grid",
		width: "clamp(270px, 90vw, 40em)",
		margin: "auto"
	};
	let viewFinderStyle = () => (
		<div
			style={{
				position: "absolute",
				width: "90%",
				top: "15%",
				bottom: "15%",
				left: "5%",
				border: "2px solid red",
				display: "block",
				zIndex: "9999"
			}}
		></div>
	);

	const handleCancel = () => {
		if (dialogRef.current.open) {
			dialogRef.current.close();
		}
	};

	const handleImport = () => {
		if (dialogRef.current.open) {
			dialogRef.current.close();
		}
	};

	useEffect(() => {
		if (!data || data.length === 0) return;
		try {
			const result = JSON.parse(data);
			if (result) {
				setYear(result.year);
				setCode(result.code);
				setSchoolGroupSelected(result.schoolGroupSelected);
				setPlayers(result.list);
				if (!dialogRef.current.open) {
					dialogRef.current.showModal();
				}
			}
		} catch (error) {
			console.log(
				"🚀 ~ file: ScanComponent.js ~ line 45 ~ useEffect ~ error",
				error
			);
		}
	}, [data]);

	return (
		<div>
			<dialog ref={dialogRef} className={styles.dialog}>
				<div className={styles.dialog_content}>
					<div className={styles.panel}>
						<div className={styles.panel_title}>
							<span>{year}</span> <span> / </span>{" "}
							<span>{code}</span>
						</div>
						{
							<ul>
								{players?.map((p, playerIndex) => (
									<li
										key={playerIndex}
										className={styles.playerContainer}
									>
										<p className={styles.playerTitle}>
											{p.name}
										</p>
										<hr />
										<ul>
											{p.sports?.map((s, sportIndex) => (
												<li
													key={sportIndex}
													className={
														styles.sportsContainer
													}
												>
													<p>{s.name}</p>
													<p>{s.category}</p>
													<p>{s.type}</p>
												</li>
											))}
										</ul>
									</li>
								))}
							</ul>
						}
						<div className={styles.panel_buttons_container}>
							<button
								type="button"
								className={styles.prevButton}
								onClick={handleCancel}
							>
								Cancel
							</button>
							<button
								type="button"
								className={styles.nextButton}
								onClick={handleImport}
							>
								Import
							</button>
						</div>
					</div>
				</div>
			</dialog>
			<QrReader
				containerStyle={containerStyle}
				delay={300}
				onResult={(result, error) => {
					if (!!result) {
						setData(result?.text);
					}

					if (!!error) {
						// console.info(error);
					}
				}}
				ViewFinder={viewFinderStyle}
			/>
		</div>
	);
}

export default ScanComponent;
