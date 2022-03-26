import React from "react";
import styles from "../styles/components/Footer.module.scss";
const Footer = () => {
	return (
		<div className={styles.center}>
			Awad &copy; {new Date().getFullYear().toString()}
			{/* <script type="text/javascript">
				document.write()
			</script> */}
		</div>
	);
};

export default Footer;
