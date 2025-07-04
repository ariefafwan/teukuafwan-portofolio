"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import AxiosInstance from "@/utils/axiosInstance";
import Cookies from "js-cookie";
import Head from "next/head";

export default function LoginPage() {
  let navigate = useRouter();

  const [formLogin, setFormLogin] = useState({
    email: "",
    password: "",
  });

  const handlerLogin = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Now Loading!",
      didOpen: () => {
        Swal.showLoading();
      },
    });
    AxiosInstance.post(`/login`, formLogin)
      .then((res) => {
        Swal.close();
        let { accessToken, user } = res.data.data;
        Cookies.set("token", accessToken, { expires: 1 });
        Cookies.set("auth", JSON.stringify(user), { expires: 1 });
        navigate.push("/auth/profile");
      })
      .catch((error) => {
        Swal.fire({
          title: "Error!",
          text: error.response.data.error,
          icon: "error",
        });
      });
  };

  return (
    <>
      <Head>
        <title>Auth - Login</title>
      </Head>
      <section className="bg-gray-100">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-gray-200 rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">Sign in</h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handlerLogin}>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                    Your email
                  </label>
                  <input
                    type="text"
                    id="email"
                    placeholder="Email..."
                    value={formLogin.email}
                    onChange={(e) =>
                      setFormLogin({
                        ...formLogin,
                        email: e.target.value,
                      })
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={formLogin.password}
                    onChange={(e) =>
                      setFormLogin({
                        ...formLogin,
                        password: e.target.value,
                      })
                    }
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full cursor-pointer text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Sign in
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
