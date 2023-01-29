// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/scroll-to-top';
import { ContextLoginUser, useLoginUser } from './lib/hooks';

// ----------------------------------------------------------------------

export default function App() {
  const user = useLoginUser()
  return (
    <ThemeProvider>
      <ContextLoginUser.Provider value={user}>
        <ScrollToTop />
        <Router />
      </ContextLoginUser.Provider>
    </ThemeProvider>
  );
}
