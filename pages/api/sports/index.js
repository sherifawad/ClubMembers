import { sports } from "../../../Data/sports";

export default function handler(req, res) {
	const sportsWithFilteredTypes = sports.reduce((accSports, sport) => {
		if (!sport || sport.sportHide == true) return accSports;
		const filteredCategories = sport.categories.reduce(
			(accCategories, Categories) => {
				if (!Categories || Categories.length < 0) return accCategories;
				const normalSports = Categories.normal?.filter(
					x => x.hide === false
				);
				if (normalSports && normalSports.length > 0) {
					accCategories.push({
						normal: [...normalSports]
					});
				}
				const privateSports = Categories.private?.filter(
					x => x.hide === false
				);
				if (privateSports && privateSports.length > 0) {
					accCategories.push({
						private: [...privateSports]
					});
				}
				const otherSports = Categories.other?.filter(
					x => x.hide === false
				);
				if (otherSports && otherSports.length > 0) {
					accCategories.push({
						other: [...otherSports]
					});
				}
				return accCategories;
			},
			[]
		);
		accSports.push({
			...sport,
			categories: filteredCategories
		});
		return accSports;
	}, []);
	res.status(200).json(sportsWithFilteredTypes);
}
