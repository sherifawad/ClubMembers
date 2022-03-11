export const onlyUniqueSportName = array =>
	array.filter(
		(value, index, self) =>
			index === self.findIndex(t => t.name === value.name)
	);

export const getCategory = () => {
	const result = SportsItems.find(item => item.name === sportName).categories;
	return SportsItems;
};

//or checking if a variable is falsey or if the string only contains whitespace or is empty
export function isBlank(str) {
	return !str || /^\s*$/.test(str);
}
