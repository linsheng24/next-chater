import LoginPage from "../components/login-page";
import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import useUser from '../customer/hooks/use-user';
import Layout from '../components/layout';
import LoadingModal from '../components/loading-modal';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#4caf50' },
    secondary: { main: '#76ff03'}
  }
})

export default function MyApp({ Component, pageProps }) {
  const { user, loading, error } = useUser();
  const isLogin = !loading && user && !error;

  return (
    <CssBaseline>
      <ThemeProvider theme={theme}>
        { isLogin ?
          <Layout>
            <Component {...pageProps} />
          </Layout>
          : <LoginPage />
        }
      </ThemeProvider>
      <LoadingModal open={loading}/>
    </CssBaseline>
  );
}
