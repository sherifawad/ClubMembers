import { createSelector } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSchoolGroup } from "../StoreRedux/playersSlice";
import { selectSports } from "../StoreRedux/sportSlice";
import styles from "../styles/components/AddSport.module.scss";

const AddSport = ({ setSport }) => {
	// Extracting sports state from redux store
	const { list, loading, error } = useSelector(selectSports);
	const dispatch = useDispatch();
	const privateSchoolGroupSelected = useSelector(
		state => state.players.SchoolGroupSelected
	);

	const handleSelectedSport = sportID => {
		if (!sportID && !list) return;
		resetValues(false, true);
		const sportExist = list.find(sport => sport.id == sportID);
		if (sportExist) {
			setSelectedSport(sportExist);
			setSelectedSportID(sportID);
			setSportCategoryList(sportExist.categories);
		}
	};

	const handleSelectedCategory = selectedCategoryIndex => {
		if (!selectedCategoryIndex) return;
		resetValues(false, false, true);
		const cat = Object.keys(
			selectedSport.categories[selectedCategoryIndex]
		)[0];
		setSportCategoryIndex(selectedCategoryIndex);
		setSportCategory(cat);

		const types = selectedSport.categories[selectedCategoryIndex][`${cat}`];
		if (types) {
			setSportTypeList(types);
		}
	};

	const handleSelectedType = selectedTypeIndex => {
		if (!selectedTypeIndex) return;
		const selectedType = sportTypeList[selectedTypeIndex];
		if (selectedType) {
			setSportType(selectedType);
			setSportTypeName(selectedType["type"]);
			setSportPrice(selectedType["price"]);
			setSportTypeDiscount(selectedType["canDiscount"]);
		}
	};

	const resetValues = (all = true, sport = false, category = false) => {
		if (all) {
			sport = true;
			category = true;
			setSelectedSportID(0);
			setSelectedSport({});
		}
		if (sport) {
			setSportCategoryList([]);
			setSportCategory(" ");
			setSportCategoryIndex(" ");
			category = true;
		}
		if (category) {
			setSportTypeList([]);
			setSportType(" ");
			setSportPrice(0);
			setSportTypeName("");
			setSportTypeDiscount(false);
		}
	};

	const isNullOrEmpty = obj =>
		Object.values(obj).every(value => {
			if (value === null || value === " ") {
				return true;
			}

			return false;
		});

	const addSport = () => {
		if (privateSchoolGroupSelected && sportTypeName === "Schools Group")
			return;
		const newSport = {
			id: parseInt(selectedSportID),
			name: selectedSport.name,
			category: sportCategory,
			type: sportTypeName,
			canDiscount: sportTypeDiscount,
			price: sportPrice,
			discount: -1,
			total: -1
		};
		if (newSport.price > 0 && !isNullOrEmpty(newSport)) {
			setSport(newSport);
			if (sportTypeName === "Schools Group") {
				dispatch(setSchoolGroup());
			}
		}
		resetValues();
	};

	const [selectedSportID, setSelectedSportID] = useState(0);
	const [selectedSport, setSelectedSport] = useState({});
	const [sportCategoryList, setSportCategoryList] = useState([]);
	const [sportCategoryIndex, setSportCategoryIndex] = useState(" ");
	const [sportCategory, setSportCategory] = useState(" ");
	const [sportTypeList, setSportTypeList] = useState([]);
	const [sportType, setSportType] = useState(" ");
	const [sportPrice, setSportPrice] = useState(0);
	const [sportTypeName, setSportTypeName] = useState("");
	const [sportTypeDiscount, setSportTypeDiscount] = useState(false);

	if (loading) {
		return <h1>....Loading</h1>;
	}

	if (error) {
		return <h1>Error</h1>;
	}
	return (
		<div className={styles.container}>
			<div className={styles.selectionContainer}>
				<div className={styles.selectionItemContainer}>
					<h5 className={styles.selectionItemLabel}>Choose Sport</h5>
					<select
						className={styles.selectItem}
						onChange={e => handleSelectedSport(e.target.value)}
						value={selectedSportID}
					>
						<option value={0} disabled>
							Choose Sport
						</option>
						{list.map(x => (
							<option key={x.id} value={x.id}>
								{x.name}
							</option>
						))}
					</select>
				</div>

				<div className={styles.selectionItemContainer}>
					<h5 className={styles.selectionItemLabel}>
						Choose Category
					</h5>
					<select
						className={styles.selectItem}
						onChange={e => handleSelectedCategory(e.target.value)}
						value={sportCategoryIndex}
					>
						<option value=" " disabled></option>
						{sportCategoryList.map((x, i) => (
							<option key={i} value={i}>
								{Object.keys(x)}
							</option>
						))}
					</select>
				</div>

				<div className={styles.selectionItemContainer}>
					<h5 className={styles.selectionItemLabel}>Choose Type</h5>
					<select
						className={styles.selectItem}
						onChange={e => handleSelectedType(e.target.value)}
						value={sportType}
					>
						<option value=" " disabled></option>
						{sportTypeList.map((x, i) => (
							<option key={i} value={i}>
								{x.type}
							</option>
						))}
					</select>
				</div>
			</div>
			<div className={styles.buttonContainer}>
				<button className={styles.add_button} onClick={addSport}>
					Add
				</button>
				<button className={styles.cancel_button} onClick={resetValues}>
					Cancel
				</button>
			</div>
		</div>
	);
};

export default AddSport;
