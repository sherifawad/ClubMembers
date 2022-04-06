const localServer = "http://localhost:3000";
const sportsApi = {
	async fetchAll(language = "en") {
		let res = await fetch(`/api/sports?language=${language}`);
		res = await res.json();
		return res || [];
	},
	async fetchByResource(id) {
		const res = await fetch(`/api/notes?resourceId=${id}`);
		const data = await res.json();
		return data.resourceNotes;
	},
	async create({ resourceID, content }) {
		return fetch("/api/notes", {
			method: "POST",
			body: JSON.stringify({
				resourceId: resourceID,
				noteBody: content
			}),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(response => {
				return response.json();
			})
			.then(data => {
				return data.note;
			});
	},
	async fetchByID(id) {
		const res = await fetch(`/api/notes/${id}`);
		const data = await res.json();
		return data.note;
	},

	async pinByID(id) {
		return fetch(`/api/notes/pinned/${id}`, {
			method: "POST",
			body: JSON.stringify({}),
			headers: {
				"Content-Type": "application/json"
			}
		});
	},

	async unpinByID(id) {
		fetch(`/api/notes/pinned/${id}`, {
			method: "DELETE",
			body: JSON.stringify({}),
			headers: {
				"Content-Type": "application/json"
			}
		});
	}
};
export default sportsApi;
