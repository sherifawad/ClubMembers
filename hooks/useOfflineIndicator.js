import { useEffect, useState } from "react";

function useOfflineIndicator() {
	const getOnLineStatus = () =>
		typeof navigator !== "undefined" &&
		typeof navigator.onLine === "boolean"
			? navigator.onLine
			: true;
	const [status, setStatus] = useState(getOnLineStatus());
	const setOnline = () => setStatus(true);

	const setOffline = () => setStatus(false);

	useEffect(() => {
		window.addEventListener("online", setOnline);
		window.addEventListener("offline", setOffline);

		return () => {
			window.removeEventListener("online", setOnline);
			window.removeEventListener("offline", setOffline);
		};
	}, []);

	return status;
}

export default useOfflineIndicator;
