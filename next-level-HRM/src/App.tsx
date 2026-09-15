import { RouterProvider } from 'react-router';
import router from './routes/Router';
import './css/globals.css';
import { ThemeProvider } from './components/provider/theme-provider';
import { Toaster } from 'sonner';

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Toaster duration={1500} richColors position="bottom-right" />
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
}

export default App;
