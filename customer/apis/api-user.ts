import AuthService from '../services/auth-service';
import Cookies from 'js-cookie';

export default async () => {
	if (Cookies.get('user')) {
		const user_cookie = Cookies.get('user');
		const user = JSON.parse(user_cookie);
		console.log(4);

		try {
			const { data } = await AuthService.getCurrentUser(user);
			console.log(4,data);
			return data;
		} catch (e) {
			console.log(3);
			return null;
		}
		// return data;

	}
}