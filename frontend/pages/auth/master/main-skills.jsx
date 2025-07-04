"use client";

import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { TableData } from "@/components/TableData";
import { ButtonEdit } from "@/components/ButtonEdit";
import { ButtonDelete } from "@/components/ButtonDelete";
import { ModalPrimary } from "@/components/ModalPrimary";
import { Loader } from "@/components/Loader";
import { useEffect, useState } from "react";
import AxiosInstance from "@/utils/axiosInstance";
import Swal from "sweetalert2";

export default function MainSKills() {
  const [modal, setModal] = useState(false);
  const [mainSkillForm, setMainSkillForm] = useState({
    uuid: "",
    gambar: "",
    nama: "",
    deskripsi: "",
  });

  const [loader, setLoader] = useState(true);
  const [headerModal, setHeaderModal] = useState("");

  const [data, setData] = useState([]);

  useEffect(() => {
    AxiosInstance.get(`/main-skill`)
      .then((res) => {
        setData([...res.data.data]);
        setLoader(false);
      })
      .catch((error) => {
        Swal.fire({
          title: "Error!",
          text: error.response.data.message,
          icon: "error",
        });
        setLoader(false);
      });
  }, [loader]);

  useEffect(() => {
    if (modal == false) {
      setMainSkillForm({
        uuid: "",
        nama: "",
      });
    }
  }, [modal, setModal]);

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
        if (mainSkillForm.uuid == "") {
          AxiosInstance.post(`/main-skill/store`, mainSkillForm)
            .then((res) => {
              setLoader(true);
              setModal(false);
              Swal.fire({
                title: "Success!",
                text: "Data Berhasil Ditambahkan.",
                icon: "success",
              });
            })
            .catch((error) => {
              Swal.fire({
                title: "Error!",
                text: error.response.data.message,
                icon: "error",
              });
            });
        } else {
          AxiosInstance.post(`/main-skill/update/${mainSkillForm.uuid}`, mainSkillForm)
            .then((res) => {
              setLoader(true);
              setModal(false);
              Swal.fire({
                title: "Success!",
                text: "Data Berhasil Diupdate.",
                icon: "success",
              });
            })
            .catch((error) => {
              Swal.fire({
                title: "Error!",
                text: error.response.data.error,
                icon: "error",
              });
            });
        }
      }
    });
  };

  const editData = (uuid) => {
    AxiosInstance.get(`/main-skill/show/${uuid}`)
      .then((res) => {
        setMainSkillForm({
          uuid: res.data.data.uuid,
          nama: res.data.data.nama,
          deskripsi: res.data.data.deskripsi,
        });
        setHeaderModal("Edit Data");
        setModal(true);
      })
      .catch((error) => {
        Swal.fire({
          title: "Error!",
          text: error.response.data.error,
          icon: "error",
        });
      });
  };

  const handleDelete = (uuid) => {
    Swal.fire({
      title: "Kamu Yakin?",
      text: "Data Akan Dihapus!",
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
        AxiosInstance.delete(`/main-skill/${uuid}`)
          .then((res) => {
            setReloadTable(true);
            Swal.fire({
              title: "Success!",
              text: "Data Berhasil Dihapus.",
              icon: "success",
            });
          })
          .catch((error) => {
            Swal.fire({
              title: "Error!",
              text: error.response.data.error,
              icon: "error",
            });
          });
      }
    });
  };

  useEffect(() => {
    if (modal == false) {
      setMainSkillForm({
        uuid: "",
        gambar: "",
        nama: "",
        deskripsi: "",
      });
    }
  }, [modal, setModal]);

  return (
    <>
      <DashboardLayout title="Master Main Skill">
        <div className="w-full px-4 py-2 mt-12">
          <div className="relative overflow-x-auto shadow-xl sm:rounded-lg">
            <TableData
              head={["Gambar", "Nama", "Deskripsi", "Aksi"]}
              label={"Data Main Skill"}
              filter={false}
              inputsearch={false}
              changeSearch={false}
              buttonModal={() => {
                setHeaderModal("Tambah Data");
                setModal(true);
              }}
            >
              {data.length > 0 ? (
                loader == false ? (
                  data.map((all, i) => {
                    return (
                      <tr key={i} className="bg-white border-b">
                        <th scope="row" className="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap">
                          {i + 1}
                        </th>
                        <td className="px-6 py-4 text-black">
                          <img class="w-10 h-10 rounded-full" src={process.env.NEXT_PUBLIC_STORAGE_BASE_URL + all.gambar} alt="Rounded avatar"></img>
                        </td>
                        <td className="px-6 py-4 text-black">{all.nama}</td>
                        <td className="px-6 py-4 text-black">{all.deskripsi}</td>
                        <td className="px-6 py-4 text-black">
                          <div>
                            <ButtonEdit click={() => editData(all.uuid)}></ButtonEdit>
                            <ButtonDelete click={() => handleDelete(all.uuid)}></ButtonDelete>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr className="bg-white border-b">
                    <td colSpan={9} className="text-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      <div className="flex w-full justify-center">
                        <Loader></Loader>
                      </div>
                    </td>
                  </tr>
                )
              ) : (
                <tr className="bg-white border-b">
                  <td colSpan={9} className="text-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {loader == true ? (
                      <div className="flex w-full justify-center">
                        <Loader></Loader>
                      </div>
                    ) : (
                      "Belum Ada Data"
                    )}
                  </td>
                </tr>
              )}
            </TableData>
          </div>
        </div>
        <ModalPrimary header={headerModal} open={modal} submitAction={handlerSubmit} closeModal={() => setModal(false)}>
          <div className="w-full text-black">
            <label htmlFor="nama" className="block mb-2 text-sm font-medium text-gray-900">
              Nama
            </label>
            <input
              type="text"
              id="nama"
              value={mainSkillForm.nama}
              onChange={(e) =>
                setMainSkillForm({
                  ...mainSkillForm,
                  nama: e.target.value,
                })
              }
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              placeholder="Nama..."
              required
            />
          </div>
          <div className="w-full text-black">
            <label htmlFor="gambar" className="block mb-2 text-sm font-medium text-gray-900">
              Gambar
            </label>
            <input
              type="file"
              id="gambar"
              onChange={(e) =>
                setMainSkillForm({
                  ...mainSkillForm,
                  gambar: e.target.files[0],
                })
              }
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            />
          </div>
          <div className="w-full text-black">
            <label htmlFor="deskripsi" className="block mb-2 text-sm font-medium text-gray-900">
              Deskripsi
            </label>
            <textarea
              type="text"
              id="deskripsi"
              value={mainSkillForm.deskripsi}
              onChange={(e) =>
                setMainSkillForm({
                  ...mainSkillForm,
                  deskripsi: e.target.value,
                })
              }
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              rows={4}
              required
            />
          </div>
        </ModalPrimary>
      </DashboardLayout>
    </>
  );
}
