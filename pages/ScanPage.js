import { useTranslations } from "next-intl";
import Head from "next/head";
import dynamic from "next/dynamic";
import { Suspense } from "react";

function ScanPage() {
	const t = useTranslations("Scan");
	const ScanComponent = dynamic(() => import("../Components/ScanComponent"), {
		loading: () => <h1>....{t("load")}</h1>,
		ssr: false
	});
	return (
		<>
			<Head>
				<title>{t("title")}</title>
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
export default ScanPage;
