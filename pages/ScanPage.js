import Head from "next/head";
import dynamic from "next/dynamic";
import { Suspense } from "react";

function ScanPage() {
	const ScanComponent = dynamic(() => import("../Components/ScanComponent"), {
		loading: () => <h1>....Loading</h1>,
		ssr: false
	});
	return (
		<>
			<Head>
				<title>Club Members: Scan</title>
				<meta
					name="description"
					content="Scan qr code to import players details"
				></meta>
			</Head>
			<Suspense>
				<ScanComponent />
			</Suspense>
		</>
	);
}

export default ScanPage;
