"use client";

import { useState, useEffect, use } from "react";
import { SideBar } from "@/components/SideBar";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Head from "next/head";

export const DashboardLayout = ({ children: children, title }) => {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [user, setUser] = useState({
    email: "",
    nama: "",
  });

  useEffect(() => {
    if (Cookies.get("auth") !== undefined) {
      let profile = JSON.parse(Cookies.get("auth"));
      setUser({
        email: profile.email,
        nama: profile.nama,
      });
    }
  }, []);

  return (
    <>
      <Head>
        <title>Teuku M Arief Afwan - {title}</title>
        <meta charSet="UTF-8" />
      </Head>
      <div className="relative w-full h-full">
        <nav className="fixed top-0 z-30 w-full bg-white border-b border-gray-200">
          <div className="px-3 py-3 lg:px-5 lg:pl-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-start rtl:justify-end">
                {/* button openside */}
                <button
                  data-drawer-target="logo-sidebar"
                  data-drawer-toggle="logo-sidebar"
                  aria-controls="logo-sidebar"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  type="button"
                  className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                >
                  <span className="sr-only">Open sidebar</span>
                  <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path
                      clipRule="evenodd"
                      fillRule="evenodd"
                      d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                    />
                  </svg>
                </button>
                <Link href={"/"} className="sm:flex ms-2 space-x-4 md:me-24 hidden">
                  <img className="w-10 h-10 rounded-full bg-none" src={"/progrity_mentor.png"} alt="Teuku Afwan" />
                  <span className="self-center text-xl font-semibold whitespace-nowrap">Portofolio</span>
                </Link>
              </div>
              <div className="flex items-center">
                <div className="flex items-center ms-3">
                  <div>
                    <button
                      className="inline-flex rounded-sm cursor-pointer w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      type="button"
                      onClick={() => {
                        Cookies.remove("token");
                        router.push("/");
                      }}
                      id="menu-item-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 my-auto">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                        />
                      </svg>
                      &nbsp;<span>Sign Out</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <SideBar sideNav={sidebarOpen}></SideBar>
        <div className="p-4 sm:ml-72">{children}</div>
      </div>
    </>
  );
};
