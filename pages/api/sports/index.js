import { sports } from "../../../Data/sports";

export default function handler(req, res) {
	const sportsWithFilteredTypes = sports.reduce((accSports, sport) => {
		if (!sport || sport.sportHide === true) return accSports;
		const filteredCategories = sport.categories.reduce(
			(accCategories, Categories) => {
				if (!Categories || Categories.length < 1) return accCategories;

				// get keys and check for hide property
				const keyName = Object.keys(Categories)[0];
				const keyValue = Categories[`${keyName}`]?.filter(
					x => x.hide === false
				);

				if (keyValue && keyValue.length > 0) {
					accCategories.push({
						[keyName]: keyValue
					});
				}
				return accCategories;
			},
			[]
		);
		if (!filteredCategories || filteredCategories.length < 1)
			return accSports;
		accSports.push({
			...sport,
			categories: filteredCategories
		});
		return accSports;
	}, []);
	res.status(200).json(sportsWithFilteredTypes);
}
