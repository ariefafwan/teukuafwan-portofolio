"use client";

import { useState, useEffect, use } from "react";
import { SideBar } from "@/components/SideBar";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Head from "next/head";

export const DashboardLayout = ({ children: children, title }) => {
    const router = useRouter();
    const [dropdownNavbar, setDropdownNavbar] = useState(false);

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
                <title>Admin Tracer Study - {title}</title>
                <meta charSet="UTF-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin=""
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
                    rel="stylesheet"
                />
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
                                    type="button"
                                    className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                                >
                                    <span className="sr-only">
                                        Open sidebar
                                    </span>
                                    <svg
                                        className="w-6 h-6"
                                        aria-hidden="true"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            clipRule="evenodd"
                                            fillRule="evenodd"
                                            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                                        />
                                    </svg>
                                </button>
                                <Link
                                    href={"/"}
                                    className="flex ms-2 md:me-24 sm:hidden"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="h-8 me-3"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z"
                                        />
                                    </svg>
                                    <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap">
                                        Tracer Study
                                    </span>
                                </Link>
                            </div>
                            <div className="flex items-center">
                                <div className="flex items-center ms-3">
                                    <div>
                                        <button
                                            type="button"
                                            aria-expanded="false"
                                            onClick={() =>
                                                setDropdownNavbar(
                                                    !dropdownNavbar
                                                )
                                            }
                                            data-dropdown-toggle="dropdown-user"
                                        >
                                            <img
                                                id="dropdown-navigater-button"
                                                className="w-8 h-8 rounded-full"
                                                src={"/profil_img.jpg"}
                                                alt="user photo"
                                            />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* dropdown */}
                    <div
                        className={
                            (dropdownNavbar == true ? "absolute" : "hidden") +
                            " top-10 right-5 z-50 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                        }
                    >
                        <div className="py-1" role="none">
                            <div className="px-4 py-3" role="none">
                                <p
                                    className="text-sm text-gray-900"
                                    role="none"
                                >
                                    {user.nama}
                                </p>
                                <p
                                    className="text-sm font-medium text-gray-900 truncate"
                                    role="none"
                                >
                                    {user.email}
                                </p>
                            </div>
                            <button
                                className="inline-flex border-t-2 border-gray-300 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                type="button"
                                onClick={() => {
                                    Cookies.remove("token");
                                    router.push("/");
                                }}
                                id="menu-item-2"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="size-5 my-auto"
                                >
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
                </nav>
                <SideBar></SideBar>
                <div className="p-4 sm:ml-72">{children}</div>
            </div>
        </>
    );
};
