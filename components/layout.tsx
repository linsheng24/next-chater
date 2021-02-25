import AppHeader from './app-header';
import AppContent from './app-content';

function Layout({children}) {
  return (
    <>
      <AppHeader />
      <AppContent>
        {children}
      </AppContent>
    </>
	);
}

export default Layout;