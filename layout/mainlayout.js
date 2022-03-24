import React from "react";
import Head from "next/head";
import Footer from "../Components/footer";
import Navbar from "../Components/Navbar";
import { Provider } from "react-redux"; // Importing Provider
import store from "../StoreRedux/store.js";

const MainLayout = ({ children }) => {
	return (
		<Provider store={store}>
			<div>
				<Head>
					<title>Club Members</title>
					<meta
						name="description"
						content="A site that Save sports subscriptions an calculate the total payments including the discounts that may be applied and the payment type cash or with credit card"
					></meta>
					<meta name="theme-color" content="#fff" />
					<meta
						name="viewport"
						content="initial-scale=1.0, width=device-width"
					/>
					<link rel="manifest" href="/manifest.json" />
					<link rel="apple-touch-icon" href="/icon.png"></link>
					<link
						rel="shortcut icon"
						href="favicon.ico"
						type="image/x-icon"
					/>
				</Head>
				<header>
					<Navbar />
				</header>
				<main>{children}</main>
				<footer>
					<Footer />
				</footer>
			</div>
		</Provider>
	);
};

export default MainLayout;
