import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	SelectPrivateSchoolGroup,
	setSchoolGroup
} from "../StoreRedux/playersSlice";
import { fetchAllSports, selectSports } from "../StoreRedux/sportSlice";
import styles from "../styles/components/AddSport.module.scss";

const AddSport = ({ setSport, language = "ar" }) => {
	const [selectedSportID, setSelectedSportID] = useState(0);
	const [selectedSport, setSelectedSport] = useState({});
	const [sportCategoryList, setSportCategoryList] = useState([]);
	const [sportCategoryIndex, setSportCategoryIndex] = useState(" ");
	const [sportCategoryId, setSportCategoryId] = useState(0);
	const [sportCategory, setSportCategory] = useState({});
	const [sportTypeList, setSportTypeList] = useState([]);
	const [sportTypeIndex, setSportTypeIndex] = useState(" ");
	const [sportTypeId, setSportTypeId] = useState(0);
	const [sportPrice, setSportPrice] = useState(0);
	const [sportTypeName, setSportTypeName] = useState({});
	const [sportTypeDiscount, setSportTypeDiscount] = useState(false);
	const [sportTypePenalty, setSportTypePenalty] = useState(false);

	// Extracting sports state from redux store
	const { list, loading, error, errorMessage } = useSelector(selectSports);
	const dispatch = useDispatch();
	const privateSchoolGroupSelected = useSelector(SelectPrivateSchoolGroup);

	// const language = useSelector(selectSettingsLanguage);
	// const language = "ar";

	useEffect(() => {
		if (list?.length < 1) {
			dispatch(fetchAllSports(false));
		}
	}, [dispatch, list?.length]);

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
		const selectedCat = selectedSport.categories[selectedCategoryIndex];
		setSportCategoryIndex(selectedCategoryIndex);
		setSportCategoryId(selectedCat.id);
		setSportCategory(selectedCat.name);
		if (selectedCat.value) {
			setSportTypeList(selectedCat.value);
		}
	};

	const handleSelectedType = selectedTypeIndex => {
		if (!selectedTypeIndex) return;
		const selectedType = sportTypeList[selectedTypeIndex];
		if (selectedType) {
			setSportTypeIndex(selectedTypeIndex);
			setSportTypeId(selectedType.id);
			setSportTypeName(selectedType.name);
			setSportPrice(selectedType["price"]);
			setSportTypeDiscount(selectedType["canDiscount"]);
			setSportTypePenalty(selectedType["penalty"]);
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
			setSportCategory({});
			setSportCategoryIndex(" ");
			setSportCategoryId(0);
			category = true;
		}
		if (category) {
			setSportTypeList([]);
			setSportTypeIndex(" ");
			setSportTypeId(0);
			setSportPrice(0);
			setSportTypeName({});
			setSportTypeDiscount(false);
			setSportTypePenalty(false);
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
		if (
			parseInt(selectedSportID) === 1 &&
			parseInt(sportTypeId) === 6 &&
			privateSchoolGroupSelected
		) {
			return;
		}

		const newSport = {
			id: parseInt(selectedSportID),
			name: selectedSport.name,
			categoryName: sportCategory,
			categoryId: sportCategoryId,
			typeName: sportTypeName,
			typeId: sportTypeId,
			canDiscount: sportTypeDiscount,
			penalty: sportTypePenalty,
			price: sportPrice,
			discount: -1,
			penaltyFees: 0,
			total: -1
		};
		if (
			newSport.price > 0 &&
			!isNullOrEmpty(newSport) &&
			newSport.categoryId > 0 &&
			newSport.typeId > 0
		) {
			setSport(newSport);
			if (
				parseInt(newSport.id) === 1 &&
				parseInt(newSport.typeId) === 6
			) {
				dispatch(setSchoolGroup());
			}
		}
		resetValues();
	};

	if (loading) {
		return <h1>....Loading</h1>;
	}

	if (error) {
		return <h1>{errorMessage}</h1>;
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
								{x.name[language]}
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
								{x.name[language]}
							</option>
						))}
					</select>
				</div>

				<div className={styles.selectionItemContainer}>
					<h5 className={styles.selectionItemLabel}>Choose Type</h5>
					<select
						className={styles.selectItem}
						onChange={e => handleSelectedType(e.target.value)}
						value={sportTypeIndex}
					>
						<option value=" " disabled></option>
						{sportTypeList.map((x, i) => (
							<option key={i} value={i}>
								{x["name"][language]}
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
