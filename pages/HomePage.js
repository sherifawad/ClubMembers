import styles from "../styles/pages/Home.module.css";
import PlayersList from "../Components/PlayersList";

const HomePage = () => {
	return (
		<div className={styles.container}>
			<div className={styles.title}>Calculate Sports Payments</div>
			<PlayersList />
			<button>Add Member</button>
		</div>
	);
};

export default HomePage;
