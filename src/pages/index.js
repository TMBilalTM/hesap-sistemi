import Link from 'next/link';

export default function HomePage() {
  return (
    <section>
      <div className="max-w-screen-xl mx-auto px-4 py-28 gap-12 text-gray-600 md:px-8">
        <div className="space-y-5 max-w-4xl mx-auto text-center">
          <h1 className="text-sm text-indigo-600 font-medium">
            BilalTM
          </h1>
          <h2 className="text-4xl text-gray-800 font-extrabold mx-auto md:text-5xl">
            Hesap yönetim <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] to-[#E114E5]">SİSTEMİ</span>
          </h2>
          <p className="max-w-2xl mx-auto">
            Hesap açabilir, giriş yapabilir ve hesabınızda ki cihazları görebilir onları çıkartabilirsiniz!
          </p>
          <div className="items-center justify-center gap-x-3 space-y-3 sm:flex sm:space-y-0">
            <Link href="/register"
               className="block py-2 px-4 text-white font-medium bg-indigo-600 duration-150 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg shadow-lg hover:shadow-none">
                Kayıt Ol

            </Link>
            <Link href="/login" className="block py-2 px-4 text-gray-700 hover:text-gray-500 font-medium duration-150 active:bg-gray-100 border rounded-lg">
                Giriş Yap

            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
