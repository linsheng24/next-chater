import LoginPage from "../components/login_page";
import { CssBaseline } from '@material-ui/core';

export default function MyApp({ Component, pageProps }) {
  const isLogin = false;
  return (
    <CssBaseline>
      {isLogin ? <Component {...pageProps} /> : <LoginPage />}
    </CssBaseline>
  );
}
