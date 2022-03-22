import { sports } from "../../../Data/sports";

export default function personHandler({ query: { id } }, res) {
	const filtered = sports.filter(s => s.id === id);

	// User with id exists
	if (filtered.length > 0) {
		res.status(200).json(filtered[0]);
	} else {
		res.status(404).json({ message: `Sport with id: ${id} not found.` });
	}
}
