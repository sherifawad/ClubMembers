import React, { useState } from "react";
import styles from "../styles/components/AddPlayer.module.scss";

const AddPlayer = () => {
	const [name, setName] = useState("");
	const [isToggled, setIsToggled] = useState(false);
	const [currentRadioValue, setCurrentRadioValue] = useState(0);

	const toggleChange = () => {
		setIsToggled(!isToggled);
		if (isToggled) {
			setCurrentRadioValue(0);
		}
	};

	const handleRadioChange = e => {
		if (!isToggled) {
			setCurrentRadioValue(0);
			return;
		}

		setCurrentRadioValue(parseInt(e.target.value));
	};

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
						<input
							className={`${styles.tgl} ${styles.tglSkewed}`}
							id="cb3"
							type="checkbox"
							checked={isToggled}
							onChange={toggleChange}
						/>
						<label
							className={styles.tglBtn}
							data-tg-off="OFF"
							data-tg-on="ON"
							htmlFor="cb3"
						></label>
					</div>

					<div className={styles.radioContainer}>
						<div>
							<input
								id="radio-item-1"
								name="radio-item-1"
								type="radio"
								value={10}
								onChange={handleRadioChange}
								checked={currentRadioValue === 10}
							/>
							<label htmlFor="radio-item-1">10</label>
						</div>

						<div>
							<input
								id="radio-item-2"
								name="radio-item-2"
								type="radio"
								value={20}
								onChange={handleRadioChange}
								checked={currentRadioValue === 20}
							/>
							<label htmlFor="radio-item-2">20</label>
						</div>
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
