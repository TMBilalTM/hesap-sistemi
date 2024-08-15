import { useState } from 'react';
import { useRouter } from 'next/router';
import { toast, Toaster } from 'react-hot-toast';
import Link from 'next/link';
export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        toast.success('Kayıt başarılı! Giriş yapabilirsiniz.');
        const data = await res.json();
        router.push('/login');
      } else {
        toast.error('Kayıt başarısız oldu. Lütfen tekrar deneyin.');
      }
    } catch (error) {
      console.error('Beklenmeyen bir hata oluştu:', error);
      toast.error('Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <Toaster />
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800">Kayıt Ol</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              E-posta
            </label>
            <input
              id="email"
              type="email"
              placeholder="E-posta"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="text-gray-800 w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Şifre
            </label>
            <input
              id="password"
              type="password"
              placeholder="Şifre"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="text-gray-800 w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="text-white w-full px-4 py-3 bg-indigo-600 rounded-lg shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Kayıt Ol
          </button>
        </form>
        <p className="text-center text-sm text-gray-600">
          Zaten bir hesabınız var mı?{' '}
          <Link href="/login" className="text-indigo-600 hover:underline">
            Giriş Yap
          </Link>
        </p>
      </div>
    </div>
  );
}
