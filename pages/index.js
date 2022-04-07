import Head from "next/head";
import Image from "next/image";
import HomePage from "./HomePage";

export default function Home() {
	return <HomePage />;
}

export async function getStaticProps({ locale }) {
	return {
		props: {
			// You can get the messages from anywhere you like. The recommended
			// pattern is to put them in JSON files separated by language and read
			// the desired one based on the `locale` received from Next.js.
			messages: (await import(`../translations/${locale}.json`)).default
		}
	};
}
