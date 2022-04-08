import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { overWritePlayersState } from "../StoreRedux/playersSlice";
import styles from "../styles/components/ScanResult.module.scss";
function ScanResult({ data = "", handleEvent, language }) {
	const [players, setPlayers] = useState([]);
	const [year, setYear] = useState(0);
	const [code, setCode] = useState(0);
	const [resultData, setResultData] = useState({});
	const t = useTranslations("Home");

	const dispatch = useDispatch();

	useEffect(() => {
		if (!data || data.length === 0) return;
		try {
			const result = JSON.parse(data);
			if (result) {
				if (
					result.year &&
					result.year > 0 &&
					result.code &&
					result.code > 0 &&
					result.list &&
					result.list.length > 0
				) {
					setResultData(result);
					setYear(result.year);
					setCode(result.code);
					setPlayers(result.list);
				}
			}
		} catch (error) {
			console.log(
				"🚀 ~ file: ScanComponent.js ~ line 45 ~ useEffect ~ error",
				error
			);
		}
	}, [data]);

	const handleImport = () => {
		new Promise((resolve, reject) => {
			dispatch(overWritePlayersState(resultData));
			resolve();
		}).then(() => handleEvent());
		// dispatch(overWritePlayersState(resultData));
		// handleEvent();
	};

	return (
		<div className={styles.dialog_content}>
			<div className={styles.panel}>
				{year > 0 && code > 0 && (
					<div className={styles.panel_title}>
						<span>{year}</span> <span> / </span> <span>{code}</span>
					</div>
				)}
				{
					<ul>
						{players?.map((p, playerIndex) => (
							<li
								key={playerIndex}
								className={styles.playerContainer}
							>
								<p className={styles.playerTitle}>{p.name}</p>
								<hr />
								<ul>
									{p.sports?.map((s, sportIndex) => (
										<li
											key={sportIndex}
											className={styles.sportsContainer}
										>
											<p>{s.name[language]}</p>
											<p>{s.categoryName[language]}</p>
											<p>{s.typeName[language]}</p>
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
						onClick={handleEvent}
					>
						{t("cancel")}
					</button>
					<button
						type="button"
						className={styles.nextButton}
						onClick={handleImport}
					>
						{t("import")}
					</button>
				</div>
			</div>
		</div>
	);
}

export default ScanResult;
