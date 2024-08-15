import Link from 'next/link';

export default function Footer() {
  const footerNavs = [
    {
      href: 'javascript:void(0)',
      name: 'İtem #1'
    },
    {
      href: 'javascript:void(0)',
      name: 'İtem #2'
    },
    {
      href: 'javascript:void(0)',
      name: 'İtem #3'
    },
    {
      href: 'javascript:void(0)',
      name: 'İtem #4'
    },
    {
      href: 'javascript:void(0)',
      name: 'İtem #5'
    },
    {
      href: 'javascript:void(0)',
      name: 'İtem #6'
    }
  ];

  return (
    <footer className="text-gray-500 bg-white px-4 py-5 max-w-screen-xl mx-auto md:px-8">
      <div className="max-w-lg sm:mx-auto sm:text-center">
        <p className="leading-relaxed mt-2 text-[15px]">
          Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
        </p>
      </div>
      <ul className="items-center justify-center mt-8 space-y-5 sm:flex sm:space-x-4 sm:space-y-0">
        {
          footerNavs.map((item, idx) => (
            <li key={idx} className="hover:text-gray-800">
              <Link href={item.href}>
              {item.name}
              </Link>
            </li>
          ))
        }
      </ul>
      <div className="mt-8 items-center justify-between sm:flex">
        <div className="mt-4 sm:mt-0">
          &copy; 2024 BilalTM Tüm hakları saklıdır.
        </div>
      </div>
    </footer>
  );
}
