"use client";

import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { TableData } from "@/components/TableData";
import { ButtonEdit } from "@/components/ButtonEdit";
import { ButtonDelete } from "@/components/ButtonDelete";
import { ModalPrimary } from "@/components/ModalPrimary";
import { Loader } from "@/components/Loader";
import { useEffect, useState, FormEvent } from "react";
import AxiosInstance from "@/utils/axiosInstance";
import Swal from "sweetalert2";
import InputError from "@/components/InputError";

interface Skill {
  uuid: string;
  nama: string;
}

export default function Skills() {
  const [modal, setModal] = useState<boolean>(false);
  const [skillForm, setSkillForm] = useState<Skill>({
    uuid: "",
    nama: "",
  });

  const [loader, setLoader] = useState<boolean>(true);
  const [headerModal, setHeaderModal] = useState<string>("");
  const [data, setData] = useState<any[]>([]);
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string[] }>({});

  const fetchData = () => {
    setLoader(true);
    AxiosInstance.get(`/skill`)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((error) => {
        Swal.fire({
          title: "Error!",
          text: error?.response?.data?.message || "Terjadi kesalahan.",
          icon: "error",
        });
      })
      .finally(() => setLoader(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!modal) {
      setSkillForm({
        uuid: "",
        nama: "",
      });
      setValidationErrors({});
    }
  }, [modal]);

  const handlerSubmit = (e: FormEvent) => {
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

        const action = skillForm.uuid === "" ? AxiosInstance.post(`/skill/store`, skillForm) : AxiosInstance.post(`/skill/update/${skillForm.uuid}`, skillForm);

        action
          .then(() => {
            fetchData();
            setModal(false);
            Swal.fire({
              title: "Success!",
              text: skillForm.uuid === "" ? "Data Berhasil Ditambahkan." : "Data Berhasil Diupdate.",
              icon: "success",
            });
          })
          .catch((error) => {
            const resErr = error.response?.data;
            if (resErr?.errors) {
              setValidationErrors(resErr.errors as Record<string, string[]>);

              const flatMessage = (Object.values(resErr.errors) as string[][]).map((err) => err.join(", ")).join("\n");

              Swal.fire({
                title: "Validation Error",
                text: flatMessage,
                icon: "error",
              });
            } else {
              Swal.fire({
                title: "Error!",
                text: resErr?.message ?? "Terjadi kesalahan",
                icon: "error",
              });
            }
          });
      }
    });
  };

  const editData = (uuid: string) => {
    AxiosInstance.get<{ data: Skill }>(`/skill/show/${uuid}`)
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
          text: error?.response?.data?.error || "Terjadi kesalahan.",
          icon: "error",
        });
      });
  };

  const handleDelete = (uuid: string) => {
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
          .then(() => {
            fetchData();
            Swal.fire({
              title: "Success!",
              text: "Data Berhasil Dihapus.",
              icon: "success",
            });
          })
          .catch((error) => {
            Swal.fire({
              title: "Error!",
              text: error?.response?.data?.error || "Terjadi kesalahan.",
              icon: "error",
            });
          });
      }
    });
  };

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
                !loader ? (
                  data.map((item, i) => (
                    <tr key={item.uuid} className="bg-white border-b">
                      <th scope="row" className="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap">
                        {i + 1}
                      </th>
                      <td className="px-6 py-4 text-black">{item.nama}</td>
                      <td className="px-6 py-4 text-black">
                        <div>
                          <ButtonEdit click={() => editData(item.uuid)} />
                          <ButtonDelete click={() => handleDelete(item.uuid)} />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="bg-white border-b">
                    <td colSpan={9} className="text-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      <div className="flex w-full justify-center">
                        <Loader />
                      </div>
                    </td>
                  </tr>
                )
              ) : (
                <tr className="bg-white border-b">
                  <td colSpan={9} className="text-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {loader ? (
                      <div className="flex w-full justify-center">
                        <Loader />
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
            <InputError name="nama" errors={validationErrors} />
          </div>
        </ModalPrimary>
      </DashboardLayout>
    </>
  );
}
