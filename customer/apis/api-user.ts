import AuthService from '../services/auth-service';
import Cookies from 'js-cookie';

const ApiUser = async () => {
	if (Cookies.get('user')) {
		const user = Cookies.get('user');

		try {
			const { data } = await AuthService.getCurrentUser(user);
			return data;
		} catch (e) {
			const error = new Error("Not authorized!");
			Cookies.remove('user');
			throw error;
		}
	} else {
		return null;
	}
}

export default ApiUser;