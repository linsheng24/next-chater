import LoginPage from "../components/login-page";
import { CssBaseline } from '@material-ui/core';
import useUser from '../customer/hooks/use-user';
import Layout from '../components/layout';
import LoadingModal from '../components/loading-modal';

export default function MyApp({ Component, pageProps }) {
  const { user, loading, error } = useUser();
  const isLogin = !loading && user && !error;

  return (
    <CssBaseline>
      <LoadingModal open={loading}/>
      { isLogin ?
        <Layout>
          <Component {...pageProps} />
        </Layout>
        : <LoginPage />
      }
    </CssBaseline>
  );
}
