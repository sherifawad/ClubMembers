import { useRouter } from "next/router";
import { forwardRef, useEffect, useRef, useState } from "react";
import { QrReader } from "react-qr-reader";
function ScanComponent() {
	const [data, setData] = useState("");
	const qrRef = useRef();
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

	// eslint-disable-next-line react/display-name
	const QRComponent = forwardRef((props, ref) => (
		<QrReader
			innerRef={ref}
			{...props}
			containerStyle={containerStyle}
			constraints={{ facingMode: "environment" }}
			legacyMode={true}
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
	));

	return (
		<>
			<QRComponent ref={qrRef} />
			<input
				type="button"
				value="Submit QR Code"
				onClick={() => qrRef.current.openImageDialog()}
			/>
		</>
	);
}

export default ScanComponent;
