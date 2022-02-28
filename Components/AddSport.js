import React, { useState } from "react";
import { useSelector } from "react-redux";
import styles from "../styles/components/AddSport.module.scss";
const AddSport = () => {
	// Extracting sports state from redux store
	const SportsItems = useSelector(state => state.sports);

	const handleSelectedSport = selectedSport => {
		if (!selectedSport && !SportsItems) return;
		setSportName(selectedSport);
		const sportExist = SportsItems.find(sport => sport.id == selectedSport);

		if (sportExist) {
			setSportCategoryList(sportExist.categories);
		}
	};

	const handleSelectedCategory = selectedCategory => {
		if (!selectedCategory && !SportsItems) return;
		setSportCategory(selectedCategory);
		const types = sportCategoryList.find(
			y => y.name === selectedCategory
		).type;
		if (types) {
			setSportTypeList(types);
		}
	};

	const [search, setSearch] = useState("");
	const [sportName, setSportName] = useState(" ");
	const [sportCategoryList, setSportCategoryList] = useState([]);
	const [sportCategory, setSportCategory] = useState(" ");
	const [sportTypeList, setSportTypeList] = useState([]);
	const [sportType, setSportType] = useState(" ");

	return (
		<div className={styles.container}>
			{/* <input
				type="text"
				className={styles.searchInput}
				placeholder="Sport search..."
				value={search}
				onChange={e => setSearch(e.target.value)}
			/> */}
			<div className={styles.selectionContainer}>
				<div className={styles.selectionItemContainer}>
					<h5 className={styles.selectionItemLabel}>Choose Sport</h5>
					<select
						className={styles.selectItem}
						onChange={e => handleSelectedSport(e.target.value)}
						value={sportName}
					>
						<option value=" " disabled>
							Choose Sport
						</option>
						{SportsItems.map(x => (
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
						value={sportCategory}
					>
						<option value=" " disabled></option>
						{sportCategoryList.map((x, i) => (
							<option key={i} value={x.name}>
								{x.name}
							</option>
						))}
					</select>
				</div>

				<div className={styles.selectionItemContainer}>
					<h5 className={styles.selectionItemLabel}>Choose Type</h5>
					<select
						className={styles.selectItem}
						onChange={e => setSportType(e.target.value)}
						value={sportType}
					>
						<option value=" " disabled></option>
						{sportTypeList.map((x, i) => (
							<option key={i} value={x}>
								{x.Category}
							</option>
						))}
					</select>
				</div>
			</div>
			<div className={styles.buttonContainer}>
				<button className={styles.add_button}>Add</button>
				<button className={styles.cancel_button}>Cancel</button>
			</div>
			{/* <ul className={styles.sportsList}>
				{onlyUniqueSportName(
					SportsItems.filter(x =>
						x.name
							.toLocaleLowerCase()
							.includes(search.toLocaleLowerCase())
					)
				).map(sport => (
					<li className={styles.sportsList__item} key={sport.id}>
						{sport.name}
					</li>
				))}
			</ul> */}
		</div>
	);
};

export default AddSport;
