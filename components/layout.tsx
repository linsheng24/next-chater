import useUser from '../customer/hooks/use-user';
import AuthService from '../customer/services/auth-service';
import AppHeader from './app-header';

function Layout({children}) {
  const { mutate } = useUser();
  const loginOutHandler = () => {
    AuthService.logout();
    mutate();
  }
  return (
    <>
      <AppHeader />
      <button onClick={loginOutHandler}>登出</button>
      {children}
    </>
	);
}

export default Layout;