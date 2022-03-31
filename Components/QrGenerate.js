import { useQRCode } from "next-qrcode";
import { useEffect, useState } from "react";

function QrGenerate({ qrStringProp = "" }) {
	const { Image } = useQRCode();
	const [qrString, setQrString] = useState("");
	useEffect(() => {
		setQrString(qrStringProp);
	}, [qrStringProp]);

	return (
		<Image
			text={qrString.length > 0 ? qrString : " "}
			alt="qr image generated from players list"
			options={{
				type: "image/webp",
				quality: 1,
				level: "H",
				margin: 3,
				scale: 8
			}}
		/>
	);
}

export default QrGenerate;
