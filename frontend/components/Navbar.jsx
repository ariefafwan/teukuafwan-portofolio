import Link from "next/link";

export default function Navbar({ index, profile }) {
  console.log(profile);

  return (
    <>
      {index ? (
        <>
          <div className="mx-auto max-w-screen-xl px-4 pt-14 py-8 sm:px-6 lg:px-8 ">
            <div className="w-full mx-auto my-auto">
              <div className="w-full flex flex-col items-center pb-10 pt-4">
                <div data-aos="zoom-in">
                  <img
                    className="w-64 h-64 mb-6 rounded-full bg-none transition-all duration-1000 hover:scale-120 transform"
                    src={process.env.NEXT_PUBLIC_STORAGE_BASE_URL + profile.gambar_profil}
                    alt="Teuku Afwan"
                  />
                </div>
                <h5 className="mb-1 text-3xl font-bold text-gray-500">{profile.nama_panggilan}</h5>
                <span className="text-sm text-gray-500">{profile.moto_profesional}</span>
                <p className="mt-4 sm:px-24 text-center text-gray-700">{profile.deskripsi}</p>
                <div className="flex mt-4 md:mt-6 space-x-3">
                  <a
                    href="#contact"
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                  >
                    Contact Me &nbsp;
                    <svg className="w-5 h-5 rotate-45" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                      <path
                        fillRule="evenodd"
                        d="M12 2a1 1 0 0 1 .932.638l7 18a1 1 0 0 1-1.326 1.281L13 19.517V13a1 1 0 1 0-2 0v6.517l-5.606 2.402a1 1 0 0 1-1.326-1.281l7-18A1 1 0 0 1 12 2Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                  <Link
                    href={process.env.NEXT_PUBLIC_STORAGE_BASE_URL + profile.resume}
                    target="_blank"
                    download
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-gray-500 rounded-lg hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-blue-300"
                  >
                    My Resume &nbsp;
                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M13 11.15V4a1 1 0 1 0-2 0v7.15L8.78 8.374a1 1 0 1 0-1.56 1.25l4 5a1 1 0 0 0 1.56 0l4-5a1 1 0 1 0-1.56-1.25L13 11.15Z" clipRule="evenodd" />
                      <path
                        fillRule="evenodd"
                        d="M9.657 15.874 7.358 13H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-2.358l-2.3 2.874a3 3 0 0 1-4.685 0ZM17 16a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H17Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <header className="bg-gray-100">
          <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-4 pt-8 px-4 sm:px-6 lg:px-8">
            <Link className="block text-teal-600" href="/">
              <span className="sr-only">Home</span>
              <img className="w-16 h-16 rounded-full bg-none" src={process.env.NEXT_PUBLIC_STORAGE_BASE_URL + profile.gambar_profil} alt="Teuku Afwan" />
            </Link>
            <div className="flex flex-1 items-center justify-end md:justify-between">
              <div className="flex items-center gap-4">
                <div className="sm:flex sm:gap-4">
                  <Link
                    href={process.env.NEXT_PUBLIC_STORAGE_BASE_URL + profile.resume}
                    download
                    target="_blank"
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-gray-500 rounded-lg hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-blue-300"
                  >
                    My Resume &nbsp;
                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M13 11.15V4a1 1 0 1 0-2 0v7.15L8.78 8.374a1 1 0 1 0-1.56 1.25l4 5a1 1 0 0 0 1.56 0l4-5a1 1 0 1 0-1.56-1.25L13 11.15Z" clipRule="evenodd" />
                      <path
                        fillRule="evenodd"
                        d="M9.657 15.874 7.358 13H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-2.358l-2.3 2.874a3 3 0 0 1-4.685 0ZM17 16a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H17Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </header>
      )}
    </>
  );
}
