import { useQRCode } from "next-qrcode";
import { useEffect, useState } from "react";

function QrGenerate({ qrStringProp = "" }) {
	const { Canvas } = useQRCode();
	const [qrString, setQrString] = useState("");
	useEffect(() => {
		setQrString(qrStringProp);
	}, [qrStringProp]);

	return (
		<Canvas
			text={qrString.length > 0 ? qrString : " "}
			alt="qr image generated from players list"
			options={{
				type: "image/jpeg",
				quality: 1,
				level: "H",
				margin: 0,
				scale: 1,
				width: 250,
				color: {
					dark: "#010599FF",
					light: "#FFFFFF"
				}
			}}
		/>
	);
}

export default QrGenerate;
