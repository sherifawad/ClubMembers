import Link from "next/link";
import React, { useState } from "react";
import styles from "../styles/components/Navbar.module.scss";
const Navbar = () => {
	//on mobile hamburger  menu if link item is clicked close menu
	const [checked, setChecked] = useState(false);
	// handle link clicked
	const handleLinkClick = () => setChecked(prevState => !prevState);
	return (
		<div className={styles.container}>
			<input
				id="toggle"
				className={styles.toggle}
				type="checkbox"
				checked={checked}
				onChange={() => {}}
			/>

			<label
				className={styles.toggle_container}
				htmlFor="toggle"
				onClick={handleLinkClick}
			>
				<span className={styles.button_toggle}></span>
			</label>
			<ul className={styles.menuList}>
				<li className={styles.listItem}>
					<Link href="/">
						<a
							className={styles.itemLink}
							onClick={handleLinkClick}
						>
							Home
						</a>
					</Link>
				</li>
				<li className={styles.listItem}>
					<Link href="/AddPage">
						<a
							className={styles.itemLink}
							onClick={handleLinkClick}
						>
							Add Player
						</a>
					</Link>
				</li>
				<li className={styles.listItem}>
					<Link href="/ScanPage">
						<a
							className={styles.itemLink}
							onClick={handleLinkClick}
						>
							Scan
						</a>
					</Link>
				</li>
			</ul>
		</div>
	);
};

export default Navbar;
