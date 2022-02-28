import styles from "../styles/pages/Home.module.css";
import SportsList from "../Components/SportsList";

const HomePage = () => {
	return (
		<div className={styles.container}>
			<div className={styles.title}>Calculate Sports Payments</div>
			<SportsList />
			<button>Add Member</button>
		</div>
	);
};

export default HomePage;
