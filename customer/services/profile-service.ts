import Cookies from 'js-cookie';
import axios from 'axios';

const API_URL = "http://127.0.0.1:3000/";

class ProfileService {
	async editProfile(field, value) {
		if (Cookies.get('user')) {
			const user = Cookies.get('user');

			return axios({
				headers: {'Authorization': `Bearer ${user}`},
				method: 'post',
				url: API_URL + "user/edit",
				data: {
					field: field,
					value: value
				}
			})
				.then(response => {
					return response.data;
				})
				.catch(error => console.log(error));
		} else {
			return null;
		}

	}
}

export default new ProfileService();