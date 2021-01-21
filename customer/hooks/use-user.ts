import useSWR from 'swr';
import userFetcher from '../apis/api-user';

export default function useUser() {
	const {data, mutate, error} = useSWR('user', userFetcher);
	console.log(data, error);
	const loading = !data && !error;
	// console.log(2,error, error.response)
	const loggedOut = error && error.response.status === 401;
	console.log({
		loading,
		loggedOut,
		user: data,
		mutate
	})
	return {
		loading,
		loggedOut,
		user: data,
		mutate
	}
}