import dynamic from "next/dynamic";
import { useState } from "react";
import { QrReader } from "react-qr-reader";

function ScanComponent() {
	const [data, setData] = useState("No Result");
	// const QrReader = dynamic(() => import("react-qr-reader"), {
	// 	ssr: false
	// });

	return (
		<>
			<QrReader
				delay={300}
				onResult={(result, error) => {
					if (!!result) {
						setData(result?.text);
					}

					if (!!error) {
						// console.info(error);
					}
				}}
				style={{ width: "100%" }}
			/>
			<p>{data}</p>
		</>
	);
}

export default ScanComponent;
