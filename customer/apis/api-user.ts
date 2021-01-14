import AuthService from '../services/auth-service';
import Cookies from 'js-cookie';

export default async () => {
	if (Cookies.get('user')) {
		const user_cookie = Cookies.get('user');
		const user = JSON.parse(user_cookie);
		const { data } = await AuthService.getCurrentUser(user);
		return data;
	}
}