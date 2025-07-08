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

export default function Skills() {
  const [modal, setModal] = useState(false);
  const [skillForm, setSkillForm] = useState({
    uuid: "",
    nama: "",
  });

  const [loader, setLoader] = useState(true);
  const [headerModal, setHeaderModal] = useState("");

  const [data, setData] = useState([]);

  useEffect(() => {
    AxiosInstance.get(`/skill`)
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
      setSkillForm({
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
        if (skillForm.uuid == "") {
          AxiosInstance.post(`/skill/store`, skillForm)
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
          AxiosInstance.post(`/skill/update/${skillForm.uuid}`, skillForm)
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
    AxiosInstance.get(`/skill/show/${uuid}`)
      .then((res) => {
        setSkillForm({
          uuid: res.data.data.uuid,
          nama: res.data.data.nama,
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
        AxiosInstance.delete(`/skill/delete/${uuid}`)
          .then((res) => {
            setLoader(true);
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
      setSkillForm({
        uuid: "",
        nama: "",
      });
    }
  }, [modal, setModal]);

  return (
    <>
      <DashboardLayout title="Master Skill">
        <div className="w-full px-4 py-2 mt-12">
          <div className="relative overflow-x-auto shadow-xl sm:rounded-lg">
            <TableData
              head={["Nama", "Aksi"]}
              label={"Data Skill"}
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
                        <td className="px-6 py-4 text-black">{all.nama}</td>
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
              value={skillForm.nama}
              onChange={(e) =>
                setSkillForm({
                  ...skillForm,
                  nama: e.target.value,
                })
              }
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              placeholder="Nama..."
              required
            />
          </div>
        </ModalPrimary>
      </DashboardLayout>
    </>
  );
}
