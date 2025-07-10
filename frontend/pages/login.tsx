import Head from "next/head";
import { useState, useEffect, FormEvent } from "react";
import AxiosInstance from "@/utils/axiosInstance";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

interface LoginForm {
  email: string;
  password: string;
}

interface LoginPageProps {
  error?: string;
}

export default function LoginPage({ error }: LoginPageProps) {
  const [formLogin, setFormLogin] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const [errMsg, setErrMsg] = useState<string | null>(null);

  useEffect(() => {
    if (error) setErrMsg(error);
  }, [error]);

  const handlerLogin = async (e: FormEvent) => {
    e.preventDefault();
    Swal.fire({
      title: "Loading!",
      didOpen: () => {
        Swal.showLoading();
      },
    });
    setErrMsg(null);

    try {
      const res = await AxiosInstance.post("/login", formLogin);
      const { accessToken, user } = res.data.data;

      Cookies.set("token", accessToken, { expires: 1 });
      Cookies.set("auth", JSON.stringify(user), { expires: 1 });

      window.location.href = "/auth/profile";
    } catch (err: any) {
      Swal.close();

      const errorMessage = err?.response?.data?.message || "Login gagal. Silakan coba lagi.";
      Swal.fire({
        title: "Error!",
        text: errorMessage,
        icon: "error",
      });

      setErrMsg(errorMessage);
    }
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <section className="bg-gray-100">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-gray-200 rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">Sign in</h1>
              {errMsg && <div className="text-red-600 text-sm border border-red-400 p-2 rounded">{errMsg}</div>}
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
                    onChange={(e) => setFormLogin({ ...formLogin, email: e.target.value })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
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
                    placeholder="••••••••"
                    value={formLogin.password}
                    onChange={(e) => setFormLogin({ ...formLogin, password: e.target.value })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
                    required
                  />
                </div>
                <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
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
