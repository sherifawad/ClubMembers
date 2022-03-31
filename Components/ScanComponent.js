import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { QrReader } from "react-qr-reader";
function ScanComponent() {
	const [data, setData] = useState("");
	const router = useRouter();
	let containerStyle = {
		display: "grid",
		width: "clamp(270px, 90vw, 40em)",
		margin: "auto"
	};
	let viewFinderStyle = () => (
		<div
			style={{
				position: "absolute",
				width: "90%",
				top: "15%",
				bottom: "15%",
				left: "5%",
				border: "2px solid red",
				display: "block",
				zIndex: "9999"
			}}
		></div>
	);

	useEffect(() => {
		if (!data || data.length === 0) return;
		try {
			router.push({
				pathname: "/",
				query: { data: data }
			});
			setData("");
		} catch (error) {
			console.log(
				"🚀 ~ file: ScanComponent.js ~ line 45 ~ useEffect ~ error",
				error
			);
		}
	}, [data, router]);

	return (
		<>
			<QrReader
				containerStyle={containerStyle}
				// constraints={{ facingMode: "environment" }}
				// facingMode={selfie ? "user" : "environment"}
				onResult={(result, error) => {
					if (!!result) {
						setData(result?.text);
					}

					if (!!error) {
						// console.info(error);
					}
				}}
				ViewFinder={viewFinderStyle}
			/>
		</>
	);
}

export default ScanComponent;
