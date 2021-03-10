import axios from 'axios';

class MatcherService {
	async getMatchers() {
		return axios({
			method: 'get',
			url: '/api/matchers',
		})
			.then(response => {
				return response.data;
			})
			.catch(error => console.log(error));
	}
}

export default new MatcherService();