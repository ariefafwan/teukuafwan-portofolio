"use client";

import AxiosInstance from "@/utils/axiosInstance";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Loader } from "@/components/Loader";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import fetchData from "@/lib/fetchData";
import { ModalPrimary } from "@/components/ModalPrimary";

export const getServerSideProps = async () => {
  try {
    const getProfile = await fetchData("/profile");
    return {
      props: {
        data: getProfile.data,
      },
    };
  } catch (error) {
    return {
      props: {
        error: error.message,
      },
    };
  }
};

export default function Profile({ data }, error) {
  const [modal, setModal] = useState(false);

  const [formProfile, setFormProfile] = useState({
    nama: data.nama,
    nama_panggilan: data.nama_panggilan,
    email: data.email,
    moto_profesional: data.moto_profesional,
    deskripsi: data.deskripsi,
    resume: null,
    gambar_profil: null,
    linkedin: data.linkedin,
    github: data.github,
    instagram: data.instagram,
    kaggle: data.kaggle,
  });

  const handlerSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Kamu Yakin?",
      text: "Data Akan Disimpan, Pastikan Data Sudah Benar",
      icon: "info",
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonText: "Ya!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Now Loading!",
          didOpen: () => {
            Swal.showLoading();
          },
        });
        AxiosInstance.post(`/profile/update`, formProfile)
          .then((res) => {
            setModal(false);
            Swal.fire({
              title: "Success!",
              text: "Data Berhasil Ditambahkan.",
              icon: "success",
            });
            window.location.reload();
          })
          .catch((error) => {
            Swal.fire({
              title: "Error!",
              text: error.response.data.message,
              icon: "error",
            });
          });
      }
    });
  };

  return (
    <DashboardLayout title="Profile">
      <div className="w-full px-4 py-8 mt-12">
        <div className="relative overflow-x-auto shadow-xl sm:rounded-lg">
          <div className="bg-white relative shadow rounded-lg w-5/6 md:w-5/6 lg:w-4/6 xl:w-3/6 mx-auto my-20 p-8">
            <div className="bg-transparent flex justify-center">
              <img
                src={process.env.NEXT_PUBLIC_STORAGE_BASE_URL + data.gambar_profil}
                alt=""
                className="bg-transparent rounded-full mx-auto absolute -top-20 w-24 h-24 shadow-md border-4 border-white transition duration-200 transform hover:scale-110"
              />
            </div>
            <div className="">
              <h1 className="font-bold text-center text-2xl text-gray-900">{formProfile.nama}</h1>
              <h6 className="text-center text-gray-400 font-semibold mb-2">{formProfile.moto_profesional}</h6>
              <div className="grid grid-cols-2 mt-1 gap-2">
                <div className="w-full">
                  <div className="w-full flex flex-col items-center overflow-hidden text-sm">
                    <div className="w-full text-black col-span-1">
                      <label htmlFor="nama_panggilan" className="block mb-2 text-sm font-medium text-gray-900">
                        Nama Panggilan
                      </label>
                      <input
                        type="text"
                        id="nama_panggilan"
                        value={formProfile.nama_panggilan}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        placeholder="Nama Panggilan..."
                        disabled
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full  mt-1">
                  <div className="w-full flex flex-col items-center overflow-hidden text-sm">
                    <div className="w-full text-black col-span-1">
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                        Email
                      </label>
                      <input
                        type="email"
                        value={formProfile.email}
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        placeholder="Email..."
                        disabled
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full">
                <div className="w-full flex flex-col items-center overflow-hidden text-sm">
                  <div className="w-full text-black col-span-1">
                    <label htmlFor="deskripsi" className="block mb-2 text-sm font-medium text-gray-900">
                      Deskripsi
                    </label>
                    <textarea
                      id="deskripsi"
                      rows={4}
                      className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="..."
                      value={formProfile.deskripsi}
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center mt-5 w-full">
              <div className="inline-flex justify-center items-center w-full">
                <button
                  type="button"
                  onClick={() => setModal(true)}
                  required
                  className="inline-flex justify-center items-center w-full text-white bg-green-700 hover:bg-green-800 font-medium rounded-md text-sm px-5 py-2.5 text-center"
                >
                  Atur Profile &nbsp;{" "}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m15 11.25 1.5 1.5.75-.75V8.758l2.276-.61a3 3 0 1 0-3.675-3.675l-.61 2.277H12l-.75.75 1.5 1.5M15 11.25l-8.47 8.47c-.34.34-.8.53-1.28.53s-.94.19-1.28.53l-.97.97-.75-.75.97-.97c.34-.34.53-.8.53-1.28s.19-.94.53-1.28L12.75 9M15 11.25 12.75 9"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalPrimary header={"Editar Profile"} open={modal} submitAction={handlerSubmit} closeModal={() => setModal(false)}>
        <div className="w-full text-black">
          <label htmlFor="nama" className="block mb-2 text-sm font-medium text-gray-900">
            Nama
          </label>
          <input
            type="text"
            id="nama"
            value={formProfile.nama}
            onChange={(e) =>
              setFormProfile({
                ...formProfile,
                nama: e.target.value,
              })
            }
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            placeholder="Nama..."
            required
          />
        </div>
        <div className="w-full text-black grid grid-cols-2 gap-2">
          <div className="w-full text-black">
            <label htmlFor="nama_panggilan" className="block mb-2 text-sm font-medium text-gray-900">
              Nama Panggilan
            </label>
            <input
              type="text"
              id="nama_panggilan"
              value={formProfile.nama_panggilan}
              onChange={(e) =>
                setFormProfile({
                  ...formProfile,
                  nama_panggilan: e.target.value,
                })
              }
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              placeholder="Nama Panggilan..."
              required
            />
          </div>
          <div className="w-full text-black">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formProfile.email}
              onChange={(e) =>
                setFormProfile({
                  ...formProfile,
                  email: e.target.value,
                })
              }
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              placeholder="Email..."
            />
          </div>
        </div>
        <div className="w-full text-black grid grid-cols-2 gap-2">
          <div className="w-full text-black">
            <label htmlFor="gambar_profil" className="block mb-2 text-sm font-medium text-gray-900">
              Gambar Profil
            </label>
            <input
              type="file"
              id="gambar_profil"
              onChange={(e) =>
                setFormProfile({
                  ...formProfile,
                  gambar_profil: e.target.files[0],
                })
              }
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            />
          </div>
          <div className="w-full text-black">
            <label htmlFor="resume" className="block mb-2 text-sm font-medium text-gray-900">
              Resume
            </label>
            <input
              type="file"
              id="resume"
              onChange={(e) =>
                setFormProfile({
                  ...formProfile,
                  resume: e.target.files[0],
                })
              }
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            />
          </div>
        </div>
        <div className="w-full text-black grid grid-cols-2 gap-2">
          <div className="w-full text-black">
            <label htmlFor="linkedin" className="block mb-2 text-sm font-medium text-gray-900">
              Linkedin
            </label>
            <input
              type="text"
              id="linkedin"
              value={formProfile.linkedin}
              onChange={(e) =>
                setFormProfile({
                  ...formProfile,
                  linkedin: e.target.value,
                })
              }
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              placeholder="Linkedin..."
              required
            />
          </div>
          <div className="w-full text-black">
            <label htmlFor="kaggle" className="block mb-2 text-sm font-medium text-gray-900">
              Kaggle
            </label>
            <input
              type="text"
              id="kaggle"
              value={formProfile.kaggle}
              onChange={(e) =>
                setFormProfile({
                  ...formProfile,
                  kaggle: e.target.value,
                })
              }
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              placeholder="Kaggle..."
              required
            />
          </div>
        </div>
        <div className="w-full text-black grid grid-cols-2 gap-2">
          <div className="w-full text-black">
            <label htmlFor="github" className="block mb-2 text-sm font-medium text-gray-900">
              Github
            </label>
            <input
              type="text"
              id="github"
              value={formProfile.github}
              onChange={(e) =>
                setFormProfile({
                  ...formProfile,
                  github: e.target.value,
                })
              }
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              placeholder="Github..."
              required
            />
          </div>
          <div className="w-full text-black">
            <label htmlFor="instagram" className="block mb-2 text-sm font-medium text-gray-900">
              Instagram
            </label>
            <input
              type="text"
              id="instagram"
              value={formProfile.instagram}
              onChange={(e) =>
                setFormProfile({
                  ...formProfile,
                  instagram: e.target.value,
                })
              }
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              placeholder="Instagram..."
              required
            />
          </div>
        </div>
        <div className="w-full text-black">
          <label htmlFor="deskripsi" className="block mb-2 text-sm font-medium text-gray-900">
            Deskripsi
          </label>
          <textarea
            type="text"
            id="deskripsi"
            rows={6}
            value={formProfile.deskripsi}
            onChange={(e) =>
              setFormProfile({
                ...formProfile,
                deskripsi: e.target.value,
              })
            }
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            placeholder="Deskripsi..."
          />
        </div>
      </ModalPrimary>
    </DashboardLayout>
  );
}
