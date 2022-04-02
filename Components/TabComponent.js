import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import styles from "../styles/components/TabComponent.module.scss";
import { useSelector } from "react-redux";
function TabComponent({ players = [], handleEvent, year = 0, code = 0 }) {
	const QrGenerate = dynamic(() => import("./QrGenerate"), {
		loading: () => <h1>....Loading</h1>,
		ssr: false
	});
	const [currentRadioValue, setCurrentRadioValue] = useState("one");
	const [memberYear, setMemberYear] = useState(`${year}`);
	const [memberCode, setMemberCode] = useState(code);
	const [error, setError] = useState("");
	const [checkedPlayers, setCheckedPlayers] = useState([]);
	const [qrString, setQrString] = useState("");
	const listRef = useRef();

	const privateSchoolGroupSelected = useSelector(
		state => state.players.SchoolGroupSelected
	);

	// listen to escape keydown which closes the dialog box then reset values
	useEffect(() => {
		const handleEsc = event => {
			if (event.keyCode === 27) {
				reset();
			}
		};
		window.addEventListener("keydown", handleEsc);

		return () => {
			window.removeEventListener("keydown", handleEsc);
		};
	}, [reset]);

	const handleRadioChange = e => {
		setCurrentRadioValue(e.target.value);
	};

	// Add/Remove checked item from list
	const handleCheck = (event, playerIndex, sportIndex) => {
		//get sport details
		//  if sport is checked
		if (event.target.checked) {
			// get sport from main player sports
			const mainSport = players[playerIndex].sports[sportIndex];
			// if the player is not in checkedPlayers list
			// add player
			setCheckedPlayers(prevState => {
				const checkPlayerIndex = prevState.findIndex(
					player => player.id === players[playerIndex].id
				);
				if (checkPlayerIndex < 0) {
					return [
						...prevState,
						{
							...players[playerIndex],
							sports: [players[playerIndex].sports[sportIndex]]
						}
					];
				} else {
					return [
						...prevState.slice(0, checkPlayerIndex),
						{
							...prevState[checkPlayerIndex],
							sports: [
								...prevState[checkPlayerIndex].sports,
								mainSport
							]
						},

						...prevState.slice(checkPlayerIndex + 1)
					];
				}
			});
		} else {
			//check player sports length if one remove sport from checkedPlayers
			// else remove only unchecked sport
			setCheckedPlayers(prevState => {
				const checkPlayerIndex = prevState.findIndex(
					player => player.id === players[playerIndex].id
				);
				if (checkPlayerIndex < 0) return prevState;

				if (prevState[checkPlayerIndex].sports.length < 2) {
					return prevState.filter(
						player => player.id !== players[playerIndex].id
					);
				} else {
					return [
						...prevState.slice(0, checkPlayerIndex),
						{
							...prevState[checkPlayerIndex],
							sports: prevState[checkPlayerIndex].sports.filter(
								sport =>
									sport.id !==
									prevState[checkPlayerIndex].sports[
										sportIndex
									].id
							)
						},

						...prevState.slice(checkPlayerIndex + 1)
					];
				}
			});
		}

		// var updatedList = [...checkedSports];
		// if (event.target.checked) {
		// 	updatedList = [...checkedSports, event.target.value];
		// } else {
		// 	updatedList.splice(checkedSports.indexOf(event.target.value), 1);
		// }
		// console.log(
		// 	"🚀 ~ file: TabComponent.js ~ line 23 ~ TabComponent ~ updatedList",
		// 	updatedList
		// );
		// setCheckedSports(updatedList);
	};

	const handleFirstTabNext = () => {
		let year;
		let code;
		try {
			year = parseInt(memberYear, 10);
		} catch (error) {
			setError("Invalid year");
			return;
		}
		if (!year || year < 1950 || year > 2050) {
			setError("Invalid year");
			return;
		}

		try {
			code = parseInt(memberCode);
		} catch (error) {
			setError("Invalid Code");
			return;
		}
		if (!code || code < 1) {
			setError("Invalid Code");
			return;
		}
		setCurrentRadioValue("two");
		setError("");
		setQrString("");
	};

	const handleSecondTabNext = () => {
		if (checkedPlayers?.length < 1) return;
		const playersAsString = JSON.stringify({
			year: memberYear,
			code: memberCode,
			SchoolGroupSelected: privateSchoolGroupSelected,
			list: checkedPlayers
		});
		if (playersAsString && playersAsString.length > 0) {
			setCurrentRadioValue("three");
			setQrString(playersAsString);
		}
	};

	const handleSecondTabPrev = () => {
		setCurrentRadioValue("one");
	};

	const handleThirdTabPrev = () => {
		setQrString("");
		setCurrentRadioValue("two");
	};

	const handleClick = e => {
		handleEvent();
		reset();
	};
	const reset = useCallback(() => {
		setCurrentRadioValue("one");
		setMemberYear(`${year}`);
		setMemberCode(code);
		setError("");
		setCheckedPlayers([]);
		setQrString("");
		listRef.current
			.querySelectorAll("input[type=checkbox]")
			.forEach(el => (el.checked = false));
	}, [code, year]);

	const handleCodeChange = e => {
		setError("");
		setMemberCode(e.target.value);
	};
	const handleYearChange = e => {
		setError("");
		setMemberYear(e.target.value);
	};

	return (
		<div className={styles.wrapper}>
			<input
				disabled
				id="one"
				className={styles.radio}
				name="group"
				type="radio"
				value={"one"}
				checked={currentRadioValue === "one"}
				onChange={handleRadioChange}
			/>
			<input
				disabled
				id="two"
				className={styles.radio}
				name="group"
				type="radio"
				value={"two"}
				checked={currentRadioValue === "two"}
				onChange={handleRadioChange}
			/>
			<input
				disabled
				id="three"
				className={styles.radio}
				name="group"
				type="radio"
				value={"three"}
				checked={currentRadioValue === "three"}
				onChange={handleRadioChange}
			/>
			<div className={styles.tabs}>
				<label
					className={
						currentRadioValue === "one"
							? `${styles.active} ${styles.tab}`
							: styles.tab
					}
					id="one-tab"
					htmlFor="one"
				>
					No
				</label>
				<label
					className={
						currentRadioValue === "two"
							? `${styles.active} ${styles.tab}`
							: styles.tab
					}
					id="two-tab"
					htmlFor="two"
				>
					Players
				</label>
				<label
					className={
						currentRadioValue === "three"
							? `${styles.active} ${styles.tab}`
							: styles.tab
					}
					id="three-tab"
					htmlFor="three"
				>
					Qr
				</label>
			</div>
			<div className={styles.panels}>
				<div
					className={
						currentRadioValue === "one"
							? `${styles.panel} ${styles.active}`
							: styles.panel
					}
					id="one-panel"
				>
					<div className={styles.panel_title}>MemberShip Number</div>
					<div className={styles.panel_content}>
						<p>Year / code</p>
						<div className={styles.panel_input_container}>
							<input
								type="number"
								className={styles.panel_input}
								placeholder="Year"
								value={memberYear}
								onChange={handleYearChange}
							/>
							<p> / </p>
							<input
								type="number"
								className={styles.panel_input}
								placeholder="Code"
								value={memberCode}
								onChange={handleCodeChange}
							/>
						</div>
					</div>
					<p className={styles.err}>{error}</p>
					<div className={styles.panel_buttons_container}>
						<button
							type="button"
							className={styles.prevButton}
							onClick={handleClick}
						>
							Cancel
						</button>
						<button
							type="button"
							className={styles.nextButton}
							onClick={handleFirstTabNext}
						>
							Next
						</button>
					</div>
				</div>

				<div
					className={
						currentRadioValue === "two"
							? `${styles.panel} ${styles.active}`
							: styles.panel
					}
					id="two-panel"
				>
					<div className={styles.panel_title}>Select Players</div>
					{
						<ul ref={listRef}>
							{players?.map((p, playerIndex) => (
								<li key={playerIndex}>
									<p className={styles.playerTitle}>
										{p.name}
									</p>
									<hr />
									<ul>
										{p.sports.map((s, sportIndex) => (
											<li
												key={sportIndex}
												className={
													styles.sportsContainer
												}
											>
												<p>{s.name}</p>
												<p>{s.type}</p>
												<input
													type="checkbox"
													value={p.id}
													onChange={e =>
														handleCheck(
															e,
															playerIndex,
															sportIndex
														)
													}
												/>
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
							onClick={handleSecondTabPrev}
						>
							Previous
						</button>
						<button
							type="button"
							className={styles.nextButton}
							onClick={handleSecondTabNext}
						>
							Next
						</button>
					</div>
				</div>
				<div
					className={
						currentRadioValue === "three"
							? `${styles.panel} ${styles.active} ${styles.qr}`
							: styles.panel
					}
					id="three-panel"
				>
					<div className={styles.panel_title}>Qr Code</div>
					<div className={styles.panel_content}>
						<Suspense>
							<QrGenerate qrStringProp={qrString} />
						</Suspense>
					</div>

					<div className={styles.panel_buttons_container}>
						<button
							type="button"
							className={styles.prevButton}
							onClick={handleThirdTabPrev}
						>
							Previous
						</button>
						<button
							type="button"
							className={styles.nextButton}
							onClick={handleClick}
						>
							Done
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default TabComponent;
