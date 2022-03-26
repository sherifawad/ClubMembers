import React from "react";
import styles from "../styles/components/Footer.module.scss";
const Footer = () => {
	return (
		<div className={styles.center}>
			Awad &copy; {new Date().getFullYear().toString()}
		</div>
	);
};

export default Footer;
