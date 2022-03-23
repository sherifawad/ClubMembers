import Image from "next/image";
import deleteIcon from "../public/deleteIcon.svg";
import { useEffect, useState } from "react";
import styles from "../styles/components/SportsList.module.scss";
import { useDispatch } from "react-redux";
import { removeSchoolGroup } from "../StoreRedux/playersSlice";

const SportsList = ({
	sport,
	setPlayerSportsList,
	receivedPlayerSportsList
}) => {
	const [sportsList, setSportsList] = useState([]);
	const dispatch = useDispatch();
	const removeSport = index => {
		const sportType = sportsList[index].type;
		if (sportType === "Schools Group") {
			dispatch(removeSchoolGroup());
		}
		setSportsList(sportsList.filter((_, i) => i !== index));
	};

	useEffect(() => {
		if (sport) {
			const duplicateSport = sportsList.find(
				item =>
					item.name === sport.name && item.category === sport.category
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
								<h4>{sport.name}</h4>
								<h5>({sport.category})</h5>
							</div>
							<div className={styles.item_body}>
								<h5>{sport.type}</h5>
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
