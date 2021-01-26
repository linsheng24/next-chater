import AuthService from '../services/auth-service';
import Cookies from 'js-cookie';

export default async () => {
	if (Cookies.get('user')) {
		const user_cookie = Cookies.get('user');
		const user = JSON.parse(user_cookie);

		try {
			const { data } = await AuthService.getCurrentUser(user);
			return data;
		} catch (e) {
			const error = new Error("Not authorized!");
			error.status = 403;
			throw error;
		}
	} else {
		return null;
	}
}