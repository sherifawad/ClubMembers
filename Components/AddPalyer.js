import React, { useState } from "react";
import styles from "../styles/components/AddPlayer.module.scss";

const AddPlayer = () => {
	const [name, setName] = useState("");
	const [sportName, setSportName] = useState(" ");
	const [sportCategoryList, setSportCategoryList] = useState([]);
	const [sportCategory, setSportCategory] = useState(" ");
	const [sportTypeList, setSportTypeList] = useState([]);
	const [sportType, setSportType] = useState(" ");

	return (
		<div className={styles.container}>
			<input
				type="text"
				className={styles.searchInput}
				placeholder="Player Name"
				value={name}
				onChange={e => setName(e.target.value)}
			/>
			<div className={styles.discountContainer}>
				<div className={styles.discountItemContainer}>
					<div className={styles.discountSwitchContainer}>
						{/* <label className={styles.switchButton}>
							<input type="checkbox" />
							<span className={`${styles.slider} ${styles.round}`}></span>
						</label> */}

						<input
							className={`${styles.tgl} ${styles.tglSkewed}`}
							id="cb3"
							type="checkbox"
						/>
						<label
							className={styles.tglBtn}
							data-tg-off="OFF"
							data-tg-on="ON"
							htmlFor="cb3"
						></label>
					</div>
					<div className={styles.radioContainer}>
						<label htmlFor="f-option" className={styles.radio}>
							<input
								type="radio"
								id="f-option"
								name="selector"
								tabIndex="1"
							/>
							<span>10%</span>
						</label>
						<label htmlFor="s-option" className={styles.radio}>
							<input
								type="radio"
								id="s-option"
								name="selector"
								tabIndex="2"
							/>
							<span>20%</span>
						</label>
					</div>
				</div>
			</div>

			<div className={styles.buttonContainer}>
				<button className={styles.add_button}>Add</button>
				<button className={styles.cancel_button}>Cancel</button>
			</div>
		</div>
	);
};

export default AddPlayer;
