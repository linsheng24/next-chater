import LoginPage from "../components/login-page";
import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import useUser from '../customer/hooks/use-user';
import Layout from '../components/layout';
import LoadingModal from '../components/loading-modal';
import { RecoilRoot } from 'recoil';
import { useEffect } from 'react';
import io from 'socket.io-client';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#4caf50' },
    secondary: { main: '#76ff03'}
  }
})

export default function MyApp({ Component, pageProps }) {
  const { user, loading, error } = useUser();
  const isLogin = !loading && user && !error;


  useEffect(() => {
    if (isLogin) {
      const socket = io('127.0.0.1:3000/chat');
      window['socket'] = socket;
      socket.on('connect', function() {
        console.log('connect success');
        socket.emit('join', 'test_room');
      });

      socket.on('test', function() {
        console.log('test');
      });
    }
  }, [user, loading]);

  return (
    <CssBaseline>
      <RecoilRoot>
        <ThemeProvider theme={theme}>
          {isLogin ?
            <Layout>
              <Component {...pageProps} />
            </Layout>
            : <LoginPage />
          }
        </ThemeProvider>
        <LoadingModal open={loading} />
      </RecoilRoot>
    </CssBaseline>
  );
}
