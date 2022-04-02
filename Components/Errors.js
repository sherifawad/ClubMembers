import useOfflineIndicator from "../hooks/useOfflineIndicator";
import styles from "../styles/components/Errors.module.scss";
function Errors() {
	const status = useOfflineIndicator();
	return (
		<div className={styles.container}>
			{!status && (
				<p className={styles.offlineIndicator}>
					Offline!! may sports types and prices were changed
				</p>
			)}
		</div>
	);
}

export default Errors;
