
const SportsList = () => {
    const sports = ["Swimming", "Tennis"];
	return (
		<ul>
			{sports.map((item, index) => 
				<li key={index}>{item}</li>
			)}
		</ul>
	);
};

export default SportsList;
