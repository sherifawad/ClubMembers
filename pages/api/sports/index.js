import { sports } from "../../../Data/sports";
import { sportsAr } from "../../../Data/sportsAr";
import { sportsMulti } from "../../../Data/sportsMulti";

export default function handler(req, res) {
	const { language } = req.query;
	let sportsList = sportsMulti;
	// sportsList = language && language === "ar" ? sportsAr : sports;
	const sportsWithFilteredTypes = sportsList.reduce((accSports, sport) => {
		if (!sport || sport.sportHide === true) return accSports;
		const filteredCategories = sport.categories.reduce(
			(accCategories, category) => {
				if (!category || category.length < 1) return accCategories;

				const values = category?.value?.filter(x => x.hide === false);

				if (values && values.length > 0) {
					accCategories.push({ ...category, value: values });
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
