import { sports } from "../../../Data/sports";

export default function handler(req, res) {
	res.status(200).json(sports);
}
