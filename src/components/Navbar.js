import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
    const [state, setState] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    const navigation = [
        { title: "İtem #1", path: "/" },
        { title: "İtem #2", path: "/" },
        { title: "İtem #3", path: "/" },
        { title: "İtem #4", path: "/" }
    ];

    useEffect(() => {
        const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
        setIsLoggedIn(loggedIn);

        document.onclick = (e) => {
            const target = e.target;
            if (!target.closest(".menu-btn")) setState(false);
        };

        return () => {
            document.onclick = null;
        };
    }, []);

    const handleLogout = async () => {
        try {
            const sessionId = localStorage.getItem('sessionId');
            const res = await fetch('/api/auth/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ sessionId }),
            });
    
            if (res.ok) {
                localStorage.setItem('isLoggedIn', 'false');
                localStorage.removeItem('sessionId');
                setIsLoggedIn(false);
                router.push('/');
            } else {
                console.error('Çıkış yapılamadı:', res.statusText);
            }
        } catch (error) {
            console.error('Çıkış işlemi sırasında bir hata oluştu:', error);
        }
    };



    return (
        <nav className={`bg-white pb-5 md:text-sm ${state ? "shadow-lg rounded-xl border mx-2 mt-2 md:shadow-none md:border-none md:mx-2 md:mt-0" : ""}`}>
            <div className="gap-x-14 items-center max-w-screen-xl mx-auto px-4 md:flex md:px-8">
                <div className="flex items-center justify-between py-5 md:block">
                    <Link href="/">
                        <Image
                            src="https://avatars.githubusercontent.com/u/112407129?s=96&v=4"
                            width={60}
                            height={50}
                            alt="BilalTM"
                            className="rounded-full"
                        />
                    </Link>
                    <div className="md:hidden">
                        <button className="menu-btn text-gray-500 hover:text-gray-800"
                            onClick={() => setState(!state)}
                        >
                            {
                                state ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                    </svg>
                                )
                            }
                        </button>
                    </div>
                </div>
                <div className={`flex-1 items-center mt-8 md:mt-0 md:flex ${state ? 'block' : 'hidden'} `}>
                    <ul className="justify-center items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
                        {navigation.map((item, idx) => (
                            <li key={idx} className="text-gray-700 hover:text-gray-900">
                                <Link href={item.path} className="block">
                                    {item.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className="flex-1 gap-x-6 items-center justify-end mt-6 space-y-6 md:flex md:space-y-0 md:mt-0">
                        {isLoggedIn ? (
                            <>
                                <Link href="/sessions" className="block text-gray-700 hover:text-gray-900">
                                    Hesap
                                </Link>
                                <button onClick={handleLogout} className="block text-gray-700 hover:text-gray-900">
                                    Çıkış Yap
                                </button>
                            </>
                        ) : (
                            <>
                                <Link href="/login" className="block text-gray-700 hover:text-gray-900">
                                    Giriş
                                </Link>
                                <Link href="/register" className="flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-gray-800 hover:bg-gray-700 active:bg-gray-900 rounded-full md:inline-flex">
                                    Kayıt Ol
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                        <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                                    </svg>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
