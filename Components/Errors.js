import { useSelector } from "react-redux";
import useOfflineIndicator from "../hooks/useOfflineIndicator";
import { selectSports } from "../StoreRedux/sportSlice";
import styles from "../styles/components/Errors.module.scss";
function Errors() {
	const status = useOfflineIndicator();
	const { error, errorMessage } = useSelector(selectSports);
	return (
		<div className={styles.container}>
			{!status && (
				<p className={styles.offlineIndicator}>
					Offline!! may sports types and prices were changed
				</p>
			)}
			{error && <p className={styles.sportsFetchError}>{errorMessage}</p>}
		</div>
	);
}

export default Errors;
