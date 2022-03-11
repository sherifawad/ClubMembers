import Link from "next/link";
import React from "react";
import styles from "../styles/components/Navbar.module.scss";
const Navbar = () => {
	return (
		<div className={styles.menu}>
			<ul className={styles.menuList}>
				<li className={styles.listItem}>
					<Link href="/">
						<a className={styles.itemLink}>Home</a>
					</Link>
				</li>
				<li className={styles.listItem}>
					<Link href="/AddPage">
						<a className={styles.itemLink}>Add Player</a>
					</Link>
				</li>
			</ul>
		</div>
	);
};

export default Navbar;
