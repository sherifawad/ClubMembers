import { useState } from "react";
import { QrReader } from "react-qr-reader";
import styles from "../styles/components/ScanComponent.module.scss";
function ScanComponent() {
	const [data, setData] = useState("No Result");

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
	return (
		<div>
			<QrReader
				containerStyle={containerStyle}
				delay={300}
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

			<p>{data}</p>
		</div>
	);
}

export default ScanComponent;
