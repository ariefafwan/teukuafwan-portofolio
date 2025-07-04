"use client";

import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { TableData } from "@/components/TableData";
import { ButtonEdit } from "@/components/ButtonEdit";
import { ButtonDelete } from "@/components/ButtonDelete";
import { ButtonPagination } from "@/components/ButtonPagination";
import { ModalPrimary } from "@/components/ModalPrimary";
import { Loader } from "@/components/Loader";
import { useEffect, useState } from "react";
import AxiosInstance from "@/utils/axiosInstance";
import Swal from "sweetalert2";

export default function Educations() {
  const [modalEdu, setModalEdu] = useState(false);
  const [eduForm, setEduForm] = useState({
    uuid: "",
    tipe: "",
    nama: "",
    jurusan: "",
    tahun_masuk: "",
    tahun_lulus: "",
    nilai_kelulusan: "",
    gelar: "",
  });

  const [pilihanTahun, setPilihanTahun] = useState([]);

  useEffect(() => {
    const createYear = (start, stop, step) => Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);
    createYear(new Date().getFullYear(), 2015, -1).map((year) => {
      setPilihanTahun((prev) => [...prev, year]);
    });
  }, []);

  const [loader, setLoader] = useState(true);
  const [headerModal, setHeaderModal] = useState("");

  const [data, setData] = useState([]);

  useEffect(() => {
    AxiosInstance.get(`/education`)
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
    if (modalEdu == false) {
      setEduForm({
        uuid: "",
        tipe: "",
        nama: "",
        jurusan: "",
        tahun_masuk: "",
        tahun_lulus: "",
        nilai_kelulusan: "",
        gelar: "",
      });
    }
  }, [modalEdu, setModalEdu]);

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
        if (eduForm.uuid == "") {
          AxiosInstance.post(`/education/store`, eduForm)
            .then((res) => {
              setLoader(true);
              setModalEdu(false);
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
          AxiosInstance.post(`/education/update/${eduForm.uuid}`, eduForm)
            .then((res) => {
              setLoader(true);
              setModalEdu(false);
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
    AxiosInstance.get(`/education/show/${uuid}`)
      .then((res) => {
        setEduForm({
          uuid: res.data.data.uuid,
          tipe: res.data.data.tipe,
          nama: res.data.data.nama,
          jurusan: res.data.data.jurusan,
          tahun_masuk: res.data.data.tahun_masuk,
          tahun_lulus: res.data.data.tahun_lulus,
          nilai_kelulusan: res.data.data.nilai_kelulusan,
          gelar: res.data.data.gelar,
        });
        setHeaderModal("Edit Data");
        setModalEdu(true);
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
        AxiosInstance.delete(`/education/${uuid}`)
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
    if (modalEdu == false) {
      setEduForm({
        uuid: "",
        tipe: "",
        nama: "",
        jurusan: "",
        tahun_masuk: "",
        tahun_lulus: "",
        nilai_kelulusan: "",
        gelar: "",
      });
    }
  }, [modalEdu, setModalEdu]);

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
                        <td className="px-6 py-4 text-black">{all.tahun_masuk}</td>
                        <td className="px-6 py-4 text-black">{all.tahun_lulus}</td>
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
              onChange={(e) =>
                setEduForm({
                  ...eduForm,
                  tipe: e.target.value,
                })
              }
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              required
            >
              <option value="">Tipe</option>
              <option value="Sekolah">Sekolah</option>
              <option value="Sarjana">Sarjana</option>
              <option value="Master">Master</option>
              <option value="Doktor">Doktor</option>
            </select>
          </div>
          <div className="w-full text-black">
            <label htmlFor="nama" className="block mb-2 text-sm font-medium text-gray-900">
              Nama Sekolah
            </label>
            <input
              type="text"
              id="nama"
              value={eduForm.nama}
              onChange={(e) =>
                setEduForm({
                  ...eduForm,
                  nama: e.target.value,
                })
              }
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              placeholder="Nama..."
              required
            />
          </div>
          <div className="w-full text-black">
            <label htmlFor="jurusan" className="block mb-2 text-sm font-medium text-gray-900">
              Jurusan
            </label>
            <input
              type="text"
              id="jurusan"
              value={eduForm.jurusan}
              onChange={(e) =>
                setEduForm({
                  ...eduForm,
                  jurusan: e.target.value,
                })
              }
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              placeholder="Jurusan..."
              required
            />
          </div>
          <div className="w-full text-black">
            <label htmlFor="tahun_masuk" className="block mb-2 text-sm font-medium text-gray-900">
              Tahun Masuk
            </label>
            <select
              value={eduForm.tahun_masuk}
              id="tahun_masuk"
              onChange={(e) =>
                setEduForm({
                  ...eduForm,
                  tahun_masuk: e.target.value,
                })
              }
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              required
            >
              {pilihanTahun.map((tahun) => {
                return (
                  <option value={tahun} key={tahun}>
                    {tahun}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="w-full text-black">
            <label htmlFor="tahun_lulus" className="block mb-2 text-sm font-medium text-gray-900">
              Tahun Lulus
            </label>
            <select
              value={eduForm.tahun_lulus}
              id="tahun_lulus"
              onChange={(e) =>
                setEduForm({
                  ...eduForm,
                  tahun_lulus: e.target.value,
                })
              }
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            >
              <option value="">Belum Lulus</option>
              {pilihanTahun.map((tahun) => {
                return (
                  <option value={tahun} key={tahun}>
                    {tahun}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="w-full text-black">
            <label htmlFor="nilai_kelulusan" className="block mb-2 text-sm font-medium text-gray-900">
              Nilai Kelulusan
            </label>
            <input
              type="decimal"
              id="nilai_kelulusan"
              value={eduForm.nilai_kelulusan}
              onChange={(e) =>
                setEduForm({
                  ...eduForm,
                  nilai_kelulusan: e.target.value,
                })
              }
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            />
          </div>
          <div className="w-full text-black">
            <label htmlFor="gelar" className="block mb-2 text-sm font-medium text-gray-900">
              Gelar
            </label>
            <input
              type="text"
              id="gelar"
              value={eduForm.gelar}
              onChange={(e) =>
                setEduForm({
                  ...eduForm,
                  gelar: e.target.value,
                })
              }
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              placeholder="Gelar..."
            />
          </div>
        </ModalPrimary>
      </DashboardLayout>
    </>
  );
}
