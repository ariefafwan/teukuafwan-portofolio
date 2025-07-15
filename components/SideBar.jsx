"use client";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";

export const SideBar = ({ sideNav }) => {
  const location = useRouter();

  const [menuMaster, setMenuMaster] = useState(false);

  useEffect(() => {
    setMenuMaster(false);
    if (location.pathname == "/auth/master/skills" || location.pathname == "/auth/master/main-skills" || location.pathname == "/auth/master/educations") {
      setMenuMaster((menuMaster) => !menuMaster);
    }
  }, [location]);

  return (
    <>
      <aside className={(sideNav ? "" : "hidden ") + "sm:block fixed top-16 sm:top-17 left-0 z-30 w-72 h-screen transition-all ease-in-out delay-150 duration-100 shadow-2xl sm:translate-x-0"}>
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white">
          <div>
            <Link href={"/"} className="sm:hidden ms-2 space-x-4 md:me-24 flex">
              <img className="w-10 h-10 rounded-full bg-none" src={"/progrity_mentor.png"} alt="Teuku Afwan" />
              <span className="self-center text-xl font-semibold whitespace-nowrap">Portofolio</span>
            </Link>
          </div>
          <ul className="space-y-2 px-2 font-medium pt-8">
            <li>
              <Link href={"/auth/profile"} className={(location.pathname == "/auth/profile" ? "bg-blue-400" : "") + " flex items-center p-2 text-black rounded-lg hover:bg-blue-400"}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5 text-black transition duration-75 group-hover:text-black"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12a7.5 7.5 0 0 0 15 0m-15 0a7.5 7.5 0 1 1 15 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077 1.41-.513m14.095-5.13 1.41-.513M5.106 17.785l1.15-.964m11.49-9.642 1.149-.964M7.501 19.795l.75-1.3m7.5-12.99.75-1.3m-6.063 16.658.26-1.477m2.605-14.772.26-1.477m0 17.726-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205 12 12m6.894 5.785-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495"
                  />
                </svg>
                <span className="ms-3">Profile</span>
              </Link>
            </li>
            <li>
              <button
                type="button"
                onClick={() => setMenuMaster((menuMaster) => !menuMaster)}
                className="flex items-center w-full p-2 text-base text-black transition duration-75 rounded-lg group hover:bg-blue-400"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5 text-black transition duration-75 group-hover:text-black"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
                  />
                </svg>
                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Master</span>
                <svg className={(menuMaster ? "rotate-180" : "") + " w-3 h-3 transition duration-75"} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 4 4 4-4" />
                </svg>
              </button>
              <ul className={(menuMaster ? "" : "hidden") + " py-2 space-y-2"}>
                <li>
                  <Link
                    href={"/auth/master/skills"}
                    className={
                      (location.pathname == "/auth/master/skills" ? "bg-blue-400" : "") +
                      " flex items-center text-sm w-full p-2 text-black transition duration-75 rounded-lg pl-11 group hover:bg-blue-400"
                    }
                  >
                    Skills
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/auth/master/main-skills"}
                    className={
                      (location.pathname == "/auth/master/main-skills" ? "bg-blue-400" : "") +
                      " flex items-center text-sm w-full p-2 text-black transition duration-75 rounded-lg pl-11 group hover:bg-blue-400"
                    }
                  >
                    Main Skill
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/auth/master/educations"}
                    className={
                      (location.pathname == "/auth/master/educations" ? "bg-blue-400" : "") +
                      " flex items-center text-sm w-full p-2 text-black transition duration-75 rounded-lg pl-11 group hover:bg-blue-400"
                    }
                  >
                    Educations
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link href={"/auth/projects"} className={(location.pathname == "/auth/projects" ? "bg-blue-400" : "") + " flex items-center p-2 text-black rounded-lg hover:bg-blue-400"}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5 text-black transition duration-75 group-hover:text-black"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12a7.5 7.5 0 0 0 15 0m-15 0a7.5 7.5 0 1 1 15 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077 1.41-.513m14.095-5.13 1.41-.513M5.106 17.785l1.15-.964m11.49-9.642 1.149-.964M7.501 19.795l.75-1.3m7.5-12.99.75-1.3m-6.063 16.658.26-1.477m2.605-14.772.26-1.477m0 17.726-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205 12 12m6.894 5.785-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495"
                  />
                </svg>
                <span className="ms-3">Projects</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};
