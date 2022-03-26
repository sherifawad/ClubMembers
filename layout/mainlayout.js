import React from "react";
import Head from "next/head";
import styles from "../styles/layouts/mainLayout.module.scss";
import Footer from "../Components/footer";
import Navbar from "../Components/Navbar";

const MainLayout = ({ children }) => {
	return (
		<div className={styles.mainLayoutContainer}>
			<header>
				<Navbar />
			</header>
			<main>{children}</main>
			<footer>
				<Footer />
			</footer>
		</div>
	);
};

export default MainLayout;
