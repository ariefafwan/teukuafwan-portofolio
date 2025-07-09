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
import Select from "@/components/Select";
import { ButtonPagination } from "@/components/ButtonPagination";
import InputError from "@/components/InputError";
import { ChangeEvent, FormEvent } from "react";

interface ProjectForm {
  uuid: string;
  judul: string;
  gambar: File[];
  skill_uuid: any[];
  status: string;
  tahun: string;
  deskripsi: string;
  link: string;
}

interface AllData {
  current_page: number;
  data: any[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: any[] | string;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export default function MasterProjects() {
  const [modal, setModal] = useState<boolean>(false);
  const [projectForm, setProjectForm] = useState<ProjectForm>({
    uuid: "",
    judul: "",
    gambar: [],
    skill_uuid: [],
    status: "",
    tahun: "",
    deskripsi: "",
    link: "",
  });

  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string[] }>({});

  const [pilihanTahun, setPilihanTahun] = useState<number[]>([]);
  const [dataSkill, setDataSkill] = useState<any[]>([]);
  const [filterSkill, setFilterSkill] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [buttonPage, setButtonPage] = useState<number[]>([]);
  const [page, setPage] = useState<number>(1);
  const paginate: number = 10;
  const [filterTahun, setFilterTahun] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("");

  const [allData, setAllData] = useState<AllData>({
    current_page: 1,
    data: [],
    first_page_url: "",
    from: 0,
    last_page: 1,
    last_page_url: "",
    links: [],
    next_page_url: null,
    path: "",
    per_page: 10,
    prev_page_url: null,
    to: 0,
    total: 0,
  });

  const [loader, setLoader] = useState<boolean>(true);
  const [headerModal, setHeaderModal] = useState<string>("");
  const [reloadTable, setReloadTable] = useState<boolean>(true);

  useEffect(() => {
    const buttonCount = Math.min(5, allData.last_page);
    let first = allData.current_page - Math.floor(buttonCount / 2);
    first = Math.max(first, 1);
    first = Math.min(first, allData.last_page - buttonCount + 1);
    setButtonPage([...Array(buttonCount)].map((_, i) => i + first));
  }, [allData]);

  useEffect(() => {
    const createYear = (start: number, stop: number, step: number): number[] => Array.from({ length: (start - stop) / Math.abs(step) + 1 }, (_, i) => start + i * step);
    const years = createYear(new Date().getFullYear(), 2015, -1);
    setPilihanTahun(years);
  }, []);

  useEffect(() => {
    setLoader(true);

    AxiosInstance.get(`/project`, {
      params: {
        page,
        paginate,
        search,
        skill_uuid: filterSkill,
        tahun: filterTahun,
        status: filterStatus,
      },
    })
      .then((res) => {
        const data_project: any = res.data.data.project;
        setAllData({
          current_page: data_project.current_page,
          data: [...data_project.data],
          first_page_url: data_project.first_page_url,
          from: data_project.from,
          last_page: data_project.last_page,
          last_page_url: data_project.last_page_url,
          links: data_project.links,
          next_page_url: data_project.next_page_url,
          path: data_project.path,
          per_page: data_project.per_page,
          prev_page_url: data_project.prev_page_url,
          to: data_project.to,
          total: data_project.total,
        });
        setPage(data_project.current_page);
        if (res.data.data.skill.length > 0) {
          const skills: any[] = res.data.data.skill.map((skill: any) => ({
            value: skill.uuid,
            label: skill.nama,
          }));
          setDataSkill(skills);
        }

        setLoader(false);
        setReloadTable(false);
      })
      .catch((error) => {
        Swal.fire({
          title: "Error!",
          text: error.response?.data?.message ?? "Terjadi kesalahan",
          icon: "error",
        });
        setReloadTable(false);
        setLoader(false);
      });
  }, [reloadTable, page, search, filterSkill, filterTahun, filterStatus]);

  useEffect(() => {
    if (!modal) {
      setProjectForm({
        uuid: "",
        judul: "",
        gambar: [],
        skill_uuid: [],
        status: "",
        tahun: "",
        deskripsi: "",
        link: "",
      });
      setValidationErrors({});
    }
  }, [modal]);

  const handlerSubmit = (e: FormEvent<HTMLFormElement>): void => {
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

        // Prepare payload
        const payload = {
          ...projectForm,
          skill_uuid: projectForm.skill_uuid.map((s) => s.value),
        } as any;

        const request = projectForm.uuid === "" ? AxiosInstance.post(`/project/store`, payload) : AxiosInstance.post(`/project/update/${projectForm.uuid}`, payload);

        request
          .then(() => {
            setReloadTable(true);
            setModal(false);
            Swal.fire({
              title: "Success!",
              text: projectForm.uuid === "" ? "Data Berhasil Ditambahkan." : "Data Berhasil Diupdate.",
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

  const editData = (uuid: string): void => {
    AxiosInstance.get(`/project/edit/${uuid}`)
      .then((res) => {
        const data = res.data.data;
        setProjectForm({
          uuid: data.uuid,
          judul: data.judul,
          gambar: [],
          skill_uuid: data.data_skill.map((s: any) => ({ value: s.uuid, label: s.nama })),
          status: data.status,
          tahun: data.tahun,
          deskripsi: data.deskripsi,
          link: data.link,
        });
        setHeaderModal("Edit Data");
        setModal(true);
      })
      .catch((error) => {
        Swal.fire({
          title: "Error!",
          text: error.response?.data?.error ?? "Terjadi kesalahan",
          icon: "error",
        });
      });
  };

  const handleDelete = (uuid: string): void => {
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
        AxiosInstance.delete(`/project/delete/${uuid}`)
          .then(() => {
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
              text: error.response?.data?.error ?? "Terjadi kesalahan",
              icon: "error",
            });
          });
      }
    });
  };

  console.log(allData.data);

  return (
    <>
      <DashboardLayout title="Master Projects">
        <div className="w-full px-4 py-2 mt-12">
          <div className="relative overflow-x-auto shadow-xl sm:rounded-lg">
            <TableData
              head={["Judul", "Gambar", "Skill", "Tahun", "Status", "Link", "Aksi"]}
              label={"Data Projects"}
              filter={
                <>
                  <div className="relative">
                    <Select id="skill" onChange={(value: any) => setFilterSkill(value)} value={filterSkill} options={dataSkill} />
                  </div>
                  <div className="relative">
                    <select
                      value={filterTahun}
                      onChange={(e: ChangeEvent<HTMLSelectElement>) => setFilterTahun(e.target.value)}
                      className="h-full border block appearance-none w-30 text-ellipsis bg-white border-gray-300 text-gray-700 py-2 px-2 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    >
                      <option value="">Tahun</option>
                      {pilihanTahun.map((tahun, x) => {
                        return (
                          <option key={x} value={tahun}>
                            {tahun}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="relative">
                    <select
                      value={filterStatus}
                      onChange={(e: ChangeEvent<HTMLSelectElement>) => setFilterStatus(e.target.value)}
                      className="h-full border block appearance-none w-full bg-white border-gray-300 text-gray-700 py-2 px-2 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    >
                      <option value="">Status</option>
                      <option value="Aktif">Repository</option>
                      <option value="Nonaktif">Published</option>
                    </select>
                    <div className="pointer-events-none absolute top-3 right-0 flex items-center px-2 text-gray-700">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </>
              }
              inputsearch={search}
              changeSearch={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
              buttonModal={() => {
                setHeaderModal("Tambah Data");
                setModal(true);
              }}
            >
              {allData.data.length > 0 ? (
                loader == false ? (
                  allData.data.map((all, i) => {
                    return (
                      <tr key={i} className="bg-white border-b">
                        <th scope="row" className="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap">
                          {i + 1}
                        </th>
                        <td className="px-6 py-4 text-black">{all.judul}</td>
                        <td className="px-6 py-4 text-black">
                          <img className="w-10 h-10 rounded-full" src={`${process.env.NEXT_PUBLIC_STORAGE_BASE_URL}${all.data_gambar?.[0].gambar}`} alt="Project thumbnail" />
                        </td>
                        <td className="px-6 py-4 text-black">{all.data_skill.map((skill) => skill.nama).join(", ")}</td>
                        <td className="px-6 py-4 text-black">{all.tahun}</td>
                        <td className="px-6 py-4 text-black">{all.status}</td>
                        <td className="px-6 py-4 text-black">
                          <a href={all.link} target="_blank" className="text-blue-600">
                            Url
                          </a>
                        </td>
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
            <div className="p-5">
              <ButtonPagination
                from={allData.from}
                to={allData.to}
                total={allData.total}
                next_page_url={allData.next_page_url}
                prev_page_url={allData.prev_page_url}
                nextPage={() => setPage((prev) => prev + 1)}
                prevPage={() => setPage((prev) => Math.max(prev - 1, 1))}
              >
                {buttonPage.map((btn, i) => {
                  return (
                    <li key={i}>
                      <button
                        onClick={() => setPage(btn)}
                        className={
                          "flex items-center justify-center px-3 h-8 leading-tight border border-gray-300 hover:text-gray-700 " +
                          (page == btn ? "bg-teal-400 hover:bg-teal-600 text-gray-700" : "bg-white hover:bg-gray-100 text-gray-500")
                        }
                      >
                        {btn}
                      </button>
                    </li>
                  );
                })}
              </ButtonPagination>
            </div>
          </div>
        </div>
        <ModalPrimary header={headerModal} open={modal} submitAction={handlerSubmit} closeModal={() => setModal(false)}>
          <div className="w-full text-black">
            <label htmlFor="judul" className="block mb-2 text-sm font-medium text-gray-900">
              Judul
            </label>
            <input
              type="text"
              id="judul"
              value={projectForm.judul}
              onChange={(e) =>
                setProjectForm({
                  ...projectForm,
                  judul: e.target.value,
                })
              }
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              placeholder="Nama..."
              required
            />
            <InputError name="judul" errors={validationErrors} />
          </div>
          <div className="w-full text-black">
            <label htmlFor="skill_uuid" className="block mb-2 text-sm font-medium text-gray-900">
              Skill
            </label>
            <Select
              isMulti
              onChange={(value) =>
                setProjectForm({
                  ...projectForm,
                  skill_uuid: value,
                })
              }
              value={projectForm.skill_uuid}
              options={dataSkill}
            />
            <InputError name="skill_uuid" errors={validationErrors} />
          </div>
          <div className="w-full text-black grid grid-cols-2 gap-4">
            <div className="w-full text-black">
              <label htmlFor="gambar" className="block mb-2 text-sm font-medium text-gray-900">
                Gambar
              </label>
              <input
                type="file"
                id="gambar"
                multiple
                onChange={(e) =>
                  setProjectForm({
                    ...projectForm,
                    gambar: [...projectForm.gambar, e.target.files?.[0]],
                  })
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              />
              <InputError name="gambar" errors={validationErrors} />
            </div>
            <div className="w-full text-black">
              <label htmlFor="link" className="block mb-2 text-sm font-medium text-gray-900">
                Link
              </label>
              <input
                type="text"
                id="link"
                value={projectForm.link}
                onChange={(e) =>
                  setProjectForm({
                    ...projectForm,
                    link: e.target.value,
                  })
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="Link..."
                required
              />
              <InputError name="link" errors={validationErrors} />
            </div>
          </div>
          <div className="w-full text-black grid grid-cols-2 gap-4">
            <div className="w-full text-black">
              <label htmlFor="tahun" className="block mb-2 text-sm font-medium text-gray-900">
                Tahun
              </label>
              <select
                value={projectForm.tahun}
                id="tahun"
                onChange={(e) =>
                  setProjectForm({
                    ...projectForm,
                    tahun: e.target.value,
                  })
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              >
                <option value="">Pilih Tahun</option>
                {pilihanTahun.map((tahun) => {
                  return (
                    <option value={tahun} key={tahun}>
                      {tahun}
                    </option>
                  );
                })}
              </select>
              <InputError name="tahun" errors={validationErrors} />
            </div>
            <div className="w-full text-black">
              <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900">
                Status
              </label>
              <select
                value={projectForm.status}
                id="status"
                onChange={(e) =>
                  setProjectForm({
                    ...projectForm,
                    status: e.target.value,
                  })
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              >
                <option value="">Pilih Status</option>
                <option value="Repository">Repository</option>
                <option value="Publish">Publish</option>
              </select>
              <InputError name="status" errors={validationErrors} />
            </div>
          </div>
          <div className="w-full text-black">
            <label htmlFor="deskripsi" className="block mb-2 text-sm font-medium text-gray-900">
              Deskripsi
            </label>
            <textarea
              id="deskripsi"
              value={projectForm.deskripsi}
              onChange={(e) =>
                setProjectForm({
                  ...projectForm,
                  deskripsi: e.target.value,
                })
              }
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              rows={4}
              required
            />
            <InputError name="deskripsi" errors={validationErrors} />
          </div>
        </ModalPrimary>
      </DashboardLayout>
    </>
  );
}
