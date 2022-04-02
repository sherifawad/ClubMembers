import { Suspense } from "react";
import styles from "../styles/layouts/mainLayout.module.scss";
import Footer from "../Components/Footer";
import dynamic from "next/dynamic";
import Navbar from "../Components/Navbar";

const MainLayout = ({ children }) => {
	const Errors = dynamic(() => import("../Components/Errors"), {
		ssr: false
	});
	return (
		<div className={styles.mainLayoutContainer}>
			<header>
				<Suspense>
					<Errors />
				</Suspense>
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
