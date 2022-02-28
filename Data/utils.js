export const onlyUniqueSportName = array =>
	array.filter(
		(value, index, self) =>
			index === self.findIndex(t => t.name === value.name)
	);

export const getCategory = () => {
	const result = SportsItems.find(item => item.name === sportName).categories;
	return SportsItems;
};
