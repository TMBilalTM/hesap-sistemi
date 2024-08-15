import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { toast, Toaster } from 'react-hot-toast';
import Image from 'next/image';
import { parseCookies } from 'nookies';

export default function Sessions() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIpAddress, setCurrentIpAddress] = useState('');
  const router = useRouter();

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!loggedIn) {
      router.push('/');
      return;
    }

    const fetchIpAddress = async () => {
      try {
        const res = await fetch('https://api.ipify.org?format=json');
        const data = await res.json();
        setCurrentIpAddress(data.ip);
      } catch (error) {
        console.error('IP address could not be fetched:', error);
        toast.error('IP adresi alınamadı.');
      }
    };

    const fetchSessions = async () => {
      try {
        const res = await fetch('/api/auth/sessions');
        if (res.ok) {
          const data = await res.json();
          setSessions(data.sessions);
        } else {
          toast.error('Oturumlar getirilemedi.');
          console.error('Oturumlar getirilemedi:', res.statusText);
        }
      } catch (error) {
        toast.error('Oturumlar getirilirken bir hata oluştu.');
        console.error('Oturumlar getirilirken bir hata oluştu:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchIpAddress();
    fetchSessions();
  }, [router]);

  const handleLogout = async (sessionId) => {
    try {
      const res = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId }),
      });

      if (res.ok) {
        toast.success('Başarıyla oturum sonlandırıldı!');
        setSessions(sessions.filter(session => session.session_id !== sessionId));
      } else {
        toast.error('Oturum sonlandırılamadı.');
        console.error('Oturum sonlandırılamadı:', res.statusText);
      }
    } catch (error) {
      toast.error('Oturum sonlandırılırken bir hata oluştu.');
      console.error('Oturum sonlandırılırken bir hata oluştu:', error);
    }
  };

  if (loading) {
    return <div className="text-center p-4">Yükleniyor...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <Toaster />
      <h2 className="text-3xl font-bold mb-6 text-gray-900">Aktif Oturumlar</h2>
      {sessions.length === 0 ? (
        <p className="text-gray-600 text-lg text-center">Aktif oturum bulunamadı.</p>

      ) : (
        <ul className="space-y-6">
          {sessions.map((session) => (
            <li key={session.id} className="border border-gray-200 rounded-lg shadow-lg bg-white p-6 flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-4">
              <div className="flex-shrink-0 flex items-center justify-center">
                {/* Conditional icons based on device type */}
                {session.device_type === 'Mobile' && (
                  <Image src="https://banner2.cleanpng.com/lnd/20240417/axl/transparent-camera-lens-black-iphone-11-pro-max-camera-extended661fa5684e92c0.77071282.webp" alt="Mobile" width={50} height={50} />
                )}
                {session.device_type === 'Tablet' && (
                  <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAdBKKJzDMYlywl1qZBfFrCSAhW1TgrjdW-A&s" alt="Tablet" width={50} height={50} />
                )}
                {session.device_type === 'Windows' && (
                  <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRq7Pi4eKYFaNI42FsntgMZdc378HZHU3D_Dw&s" alt="Windows" width={50} height={50} />
                )}
                {session.device_type === 'Mac' && (
                  <Image src="https://www.apple.com/newsroom/images/product/os/macos/standard/macOS_preview_Hero_06042018_big.jpg.large.jpg" alt="Mac" width={50} height={50} />
                )}
                {session.device_type === 'Linux' && (
                  <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdsQDoTu_QAK3V2Fz_0tC0YDb2KaYVseFrRQ&s" alt="Linux" width={50} height={50} />
                )}
                {/* Fallback image for unknown device types */}
                {session.device_type === 'Unknown' && (
                  <Image src="https://via.placeholder.com/50" alt="Unknown Device" width={50} height={50} />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-semibold text-gray-900 text-lg">
                    {session.device_type}
                  </div>
                  {/* Compare IP addresses */}
                  {currentIpAddress === session.ip_address && (
                    <span className="inline-block bg-green-500 text-white text-xs font-semibold rounded-full px-2 py-1">
                      Bu Cihaz
                    </span>
                  )}
                </div>
                <div className="text-sm text-gray-700 mb-2">
                  <div className="mb-1">
                    <span className="font-medium">Tarayıcı:</span> {session.browser_info}
                  </div>
                  <div className="mb-1">
                    <span className="font-medium">IP Adresi:</span> {session.ip_address}
                  </div>
                  <div className="mb-1">
                    <span className="font-medium">Cihaz Markası:</span> {session.device_brand}
                  </div>
                  <div>
                    <span className="font-medium">Cihaz Modeli:</span> {session.device_model}
                  </div>
                  <div className="mt-1">
                    <span className="font-medium">Giriş Zamanı:</span> {new Date(session.login_time).toLocaleString()}
                  </div>
                </div>
                <button
                  onClick={() => handleLogout(session.session_id)}
                  className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Oturumu Sonlandır
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
