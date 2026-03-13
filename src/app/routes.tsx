import { createBrowserRouter, Outlet } from 'react-router';
import { Home } from './pages/Home';
import { SubmitListing } from './pages/SubmitListing';
import { HowItWorks } from './pages/HowItWorks';
import { Login } from './pages/Login';
import { AdminPanel } from './pages/AdminPanel';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CatMascot } from './components/CatMascot';

function RootLayout() {
  return (
    <div 
      className="flex flex-col min-h-screen"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1658579126739-03385cb1749b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGJsdWUlMjBncmFkaWVudCUyMGJhY2tncm91bmQlMjBwYXR0ZXJufGVufDF8fHx8MTc3MTUxOTk5MXww&ixlib=rb-4.1.0&q=80&w=1080)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CatMascot />
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'submit',
        element: <SubmitListing />,
      },
      {
        path: 'how-it-works',
        element: <HowItWorks />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'admin',
        element: <AdminPanel />,
      },
      {
        path: '*',
        element: <div className="min-h-screen flex items-center justify-center"><h1 className="text-3xl">404 - Page Not Found</h1></div>,
      },
    ],
  },
]);