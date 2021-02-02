import AppHeader from './app-header';

function Layout({children}) {
  return (
    <>
      <AppHeader />
      {children}
    </>
	);
}

export default Layout;