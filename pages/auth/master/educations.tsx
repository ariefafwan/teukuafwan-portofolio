"use client";

import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { TableData } from "@/components/TableData";
import { ButtonEdit } from "@/components/ButtonEdit";
import { ButtonDelete } from "@/components/ButtonDelete";
// import { ButtonPagination } from "@/components/ButtonPagination";
import { ModalPrimary } from "@/components/ModalPrimary";
import { Loader } from "@/components/Loader";
import { useEffect, useState, FormEvent, ChangeEvent } from "react";
import AxiosInstance from "@/utils/axiosInstance";
import Swal from "sweetalert2";
import InputError from "@/components/InputError";

interface EducationForm {
  uuid: string;
  tipe: string;
  nama: string;
  jurusan: string;
  masuk: string;
  lulus: string;
  nilai_kelulusan: string;
  gelar: string;
}

export default function Educations() {
  const [modalEdu, setModalEdu] = useState<boolean>(false);
  const [eduForm, setEduForm] = useState<EducationForm>({
    uuid: "",
    tipe: "",
    nama: "",
    jurusan: "",
    masuk: "",
    lulus: "",
    nilai_kelulusan: "",
    gelar: "",
  });

  const [loader, setLoader] = useState<boolean>(true);
  const [headerModal, setHeaderModal] = useState<string>("");
  const [data, setData] = useState<any[]>([]);
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string[] }>({});

  const fetchData = () => {
    setLoader(true);
    AxiosInstance.get(`/education`)
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
    if (!modalEdu) {
      setEduForm({
        uuid: "",
        tipe: "",
        nama: "",
        jurusan: "",
        masuk: "",
        lulus: "",
        nilai_kelulusan: "",
        gelar: "",
      });
      setValidationErrors({});
    }
  }, [modalEdu]);

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

        const action = eduForm.uuid === "" ? AxiosInstance.post(`/education/store`, eduForm) : AxiosInstance.post(`/education/update/${eduForm.uuid}`, eduForm);

        action
          .then(() => {
            fetchData();
            setModalEdu(false);
            Swal.fire({
              title: "Success!",
              text: eduForm.uuid === "" ? "Data Berhasil Ditambahkan." : "Data Berhasil Diupdate.",
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
    AxiosInstance.get(`/education/show/${uuid}`)
      .then((res) => {
        setEduForm({ ...res.data.data });
        setHeaderModal("Edit Data");
        setModalEdu(true);
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
        AxiosInstance.delete(`/education/delete/${uuid}`)
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

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value, files } = e.target as HTMLInputElement;
    if (files) {
      setEduForm((prev) => ({ ...prev, [id]: files[0] }));
    } else {
      setEduForm((prev) => ({ ...prev, [id]: value }));
    }
  };

  return (
    <>
      <DashboardLayout title="Master Education">
        <div className="w-full px-4 py-2 mt-12">
          <div className="relative overflow-x-auto shadow-xl sm:rounded-lg">
            <TableData
              head={["Nama", "Tipe", "Jurusan", "Tahun Masuk", "Tahun Lulus", "Nilai", "Gelar", "Aksi"]}
              label={"Data Education"}
              filter={false}
              inputsearch={false}
              changeSearch={false}
              buttonModal={() => {
                setHeaderModal("Tambah Data");
                setModalEdu(true);
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
                        <td className="px-6 py-4 text-black">{all.tipe}</td>
                        <td className="px-6 py-4 text-black">{all.jurusan}</td>
                        <td className="px-6 py-4 text-black">{new Date(all.masuk).toLocaleDateString("id-ID", { year: "numeric", month: "long" })}</td>
                        <td className="px-6 py-4 text-black">{all.lulus}</td>
                        <td className="px-6 py-4 text-black">{all.nilai_kelulusan}</td>
                        <td className="px-6 py-4 text-black">{all.gelar}</td>
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
        <ModalPrimary header={headerModal} open={modalEdu} submitAction={handlerSubmit} closeModal={() => setModalEdu(false)}>
          <div className="w-full text-black">
            <label htmlFor="tipe" className="block mb-2 text-sm font-medium text-gray-900">
              Tipe
            </label>
            <select
              value={eduForm.tipe}
              id="tipe"
              onChange={(e) => setEduForm({ ...eduForm, tipe: e.target.value })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              required
            >
              <option value="">Tipe</option>
              <option value="Sekolah">Sekolah</option>
              <option value="Sarjana">Sarjana</option>
              <option value="Master">Master</option>
              <option value="Doktor">Doktor</option>
            </select>
            <InputError name="tipe" errors={validationErrors} />
          </div>
          <div className="w-full text-black">
            <label htmlFor="nama" className="block mb-2 text-sm font-medium text-gray-900">
              Nama Sekolah
            </label>
            <input
              type="text"
              id="nama"
              value={eduForm.nama}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              placeholder="Nama..."
              required
            />
            <InputError name="nama" errors={validationErrors} />
          </div>
          <div className="w-full text-black">
            <label htmlFor="jurusan" className="block mb-2 text-sm font-medium text-gray-900">
              Jurusan
            </label>
            <input
              type="text"
              id="jurusan"
              value={eduForm.jurusan}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              placeholder="Jurusan..."
              required
            />
            <InputError name="jurusan" errors={validationErrors} />
          </div>
          <div className="w-full text-black">
            <label htmlFor="masuk" className="block mb-2 text-sm font-medium text-gray-900">
              Tahun Masuk
            </label>
            <input
              type="date"
              id="masuk"
              value={eduForm.masuk}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              placeholder="Tahun Masuk..."
              required
            />
            <InputError name="masuk" errors={validationErrors} />
          </div>
          <div className="w-full text-black">
            <label htmlFor="lulus" className="block mb-2 text-sm font-medium text-gray-900">
              Tahun Lulus
            </label>
            <input
              type="date"
              id="lulus"
              value={eduForm.lulus}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              placeholder="Tahun Lulus..."
            />
            <InputError name="lulus" errors={validationErrors} />
          </div>
          <div className="w-full text-black">
            <label htmlFor="nilai_kelulusan" className="block mb-2 text-sm font-medium text-gray-900">
              Nilai Kelulusan
            </label>
            <input
              type="number"
              step="any"
              id="nilai_kelulusan"
              value={eduForm.nilai_kelulusan}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            />
            <InputError name="nilai_kelulusan" errors={validationErrors} />
          </div>
          <div className="w-full text-black">
            <label htmlFor="gelar" className="block mb-2 text-sm font-medium text-gray-900">
              Gelar
            </label>
            <input
              type="text"
              id="gelar"
              value={eduForm.gelar}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              placeholder="Gelar..."
            />
            <InputError name="gelar" errors={validationErrors} />
          </div>
        </ModalPrimary>
      </DashboardLayout>
    </>
  );
}
