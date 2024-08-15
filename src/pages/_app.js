import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/globals.css';
import { Toaster } from 'react-hot-toast';
import Loader from '../components/Loader';
function MyApp({ Component, pageProps }) {
  const [isInitialized, setIsInitialized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const initialize = async () => {
      try {
        const res = await fetch('/api/auth/check', {
          method: 'GET',
          credentials: 'include',
        });
        const data = await res.json();

        if (!data.isAuthenticated) {
          console.error('User is not authenticated');
          localStorage.setItem('isLoggedIn', 'false');
        } else {
          localStorage.setItem('isLoggedIn', 'true');
        }
      } catch (error) {
        console.error('An error occurred while checking session:', error);
        localStorage.setItem('isLoggedIn', 'false');
      } finally {
        setIsInitialized(true);
      }
    };

    initialize();
  }, [router]);

  if (!isInitialized) {
    return <Loader />; 
  }

  return (

    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex-grow">
        <Toaster containerClassName="font-medium tracking-tighter" />
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  );
}

export default MyApp;
