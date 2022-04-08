import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useTranslations } from "next-intl";
import AddSport from "../Components/AddSport";
import SportsList from "../Components/SportsList";
import { isBlank } from "../Data/utils";
import {
	addPlayer,
	removeSchoolGroup,
	updatePlayer
} from "../StoreRedux/playersSlice";
import styles from "../styles/pages/AddPage.module.scss";
import { createSelector } from "@reduxjs/toolkit";
import Head from "next/head";

const AddPage = () => {
	const t = useTranslations("Add");
	const { locale, query, push } = useRouter();
	const [name, setName] = useState("");
	const [sport, setSport] = useState();
	const [playerSportsList, setPlayerSportsList] = useState([]);
	const [receivedPlayerSportsList, setReceivedPlayerSportsList] = useState(
		[]
	);
	const [nameError, setNameError] = useState("");
	const [sportError, setSportError] = useState("");
	const [isUpdate, setIsUpdate] = useState(false);
	const [playerId, setPlayerId] = useState(0);
	const [removeSwimmingGroup, setRemoveSwimmingGroup] = useState(0);

	const selectPlayers = createSelector(
		state => state.players,
		players => players.playersState
	);
	const players = useSelector(selectPlayers);

	const dispatch = useDispatch();

	// check for queries
	useEffect(() => {
		const { pid } = query;
		if (!pid || isBlank(pid) || pid === "0") return;
		const playerExists = players.find(
			player => player.id === parseInt(pid)
		);

		if (playerExists) {
			setName(playerExists.name);
			setReceivedPlayerSportsList(playerExists.sports);
			setIsUpdate(true);
			setPlayerId(playerExists.id);
		}
	}, [players, query]);

	const handlePlayerNameChange = e => {
		if (nameError.length > 0) {
			setNameError("");
		}
		setName(e.target.value);
	};

	const handlePlayerAddition = () => {
		if (isBlank(name)) {
			setNameError(t("nameEmpty"));
			return;
		}
		if (!playerSportsList || playerSportsList.length < 1) {
			setSportError(t("addSport"));
			return;
		}

		//sort sports descending by price
		const sports = playerSportsList
			.slice()
			.sort((a, b) => (a.price > b.price ? -1 : 1));
		const player = {
			name: name,
			sports: sports,
			discount: -1
		};
		const playerExists = players.find(
			player =>
				player.name.toLocaleLowerCase() === name.toLocaleLowerCase()
		);
		if (playerExists) {
			if (!isUpdate || (isUpdate && playerExists.id !== playerId)) {
				setNameError(t("nameDuplicate"));
				return;
			}
		}
		try {
			if (isUpdate) {
				player.id = playerId;
				dispatch(updatePlayer(player));
			} else {
				dispatch(addPlayer(player));
			}
			if (removeSwimmingGroup) {
				dispatch(removeSchoolGroup());
			}
			push("/");
		} catch (err) {
			console.error(
				"🚀 ~ file: AddPage.js ~ line 29 ~ handlePlayerAddition ~ err",
				err
			);
		}
	};

	return (
		<>
			<Head>
				<title>{t("title")}</title>
				<meta
					name="description"
					content="Add or update player information player name and plyer sports"
				></meta>
			</Head>
			<div className={styles.container}>
				<input
					type="text"
					className={styles.searchInput}
					placeholder={t("nameHolder")}
					value={name}
					onChange={handlePlayerNameChange}
				/>
				<p className={styles.errorMessage}>{nameError}</p>
				<AddSport
					setSport={setSport}
					language={locale}
					setSportError={setSportError}
				/>
				<p className={styles.errorMessage}>{sportError}</p>

				<SportsList
					sport={sport}
					setPlayerSportsList={setPlayerSportsList}
					receivedPlayerSportsList={receivedPlayerSportsList}
					language={locale}
					setRemoveSwimmingGroup={setRemoveSwimmingGroup}
					setSportError={setSportError}
				/>
				<button type="button" onClick={handlePlayerAddition}>
					{isUpdate ? t("updatePlayer") : t("addPlayer")}
				</button>
			</div>
		</>
	);
};
export async function getStaticProps({ locale }) {
	return {
		props: {
			// You can get the messages from anywhere you like. The recommended
			// pattern is to put them in JSON files separated by language and read
			// the desired one based on the `locale` received from Next.js.
			messages: (await import(`../translations/${locale}.json`)).default
		}
	};
}
export default AddPage;
