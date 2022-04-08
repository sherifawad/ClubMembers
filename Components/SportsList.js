import Image from "next/image";
import deleteIcon from "../public/deleteIcon.svg";
import { useEffect, useState } from "react";
import styles from "../styles/components/SportsList.module.scss";

const SportsList = ({
	sport,
	setPlayerSportsList,
	receivedPlayerSportsList,
	language,
	setRemoveSwimmingGroup = false,
	setSportError
}) => {
	const [sportsList, setSportsList] = useState([]);
	const removeSport = index => {
		const sportToRemove = sportsList[index];
		if (sportToRemove.id === 1 && sportToRemove.typeId === 6) {
			// inform parent to change status
			setRemoveSwimmingGroup(true);
		}
		setSportsList(sportsList.filter((_, i) => i !== index));
	};

	useEffect(() => {
		setSportError("");
		if (sport) {
			const duplicateSport = sportsList.find(
				item =>
					item.id === sport.id && item.categoryId === sport.categoryId
			);
			if (duplicateSport) return;
			setSportsList(oldList => [...oldList, sport]);
		}
	}, [sport]);

	useEffect(() => {
		setPlayerSportsList(sportsList);
	}, [setPlayerSportsList, sportsList]);

	useEffect(() => {
		if (receivedPlayerSportsList && receivedPlayerSportsList.length > 0) {
			setSportsList(receivedPlayerSportsList);
		}
	}, [receivedPlayerSportsList]);

	return (
		<div className={styles.Container}>
			<ul className={styles.items}>
				{sportsList?.map((sport, index) => (
					<li key={index} className={styles.item_content}>
						<div className={styles.item_data}>
							<div className={styles.item_header}>
								<h4>{sport.name[language]}</h4>
								<h5>({sport.categoryName[language]})</h5>
							</div>
							<div className={styles.item_body}>
								<h5>{sport.typeName[language]}</h5>
								<h5>
									<span>$</span>
									{sport.price}
								</h5>
							</div>
						</div>
						<Image
							className={styles.Icon}
							src={deleteIcon}
							alt="Delete Icon"
							width={20}
							height={20}
							onClick={() => removeSport(index)}
						/>
					</li>
				))}
			</ul>
		</div>
	);
};

export default SportsList;
