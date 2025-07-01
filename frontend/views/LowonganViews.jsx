"use client";

import { useState } from "react";
import { CardLowongan } from "@/components/CardLowongan";
import { useRouter } from "next/router";

export const LowonganViews = ({ data }) => {
    const router = useRouter();
    const kontenLowongan = data.konten.filter(
        (data) => data.nama == "Lowongan Pekerjaan"
    )[0].konten;
    const dataProgramStudi = data.filterData.program_studi;
    const dataBidangUsaha = data.filterData.bidang_usaha;
    const dataLowongan = data.dataLowongan;

    const [ordering, setOrdering] = useState("");
    const [filterProgramStudi, setFilterProgramStudi] = useState([]);
    const [filterBidangUsaha, setFilterBidangUsaha] = useState("");
    const [filterTanggalDari, setFilterTanggalDari] = useState("");
    const [filterTanggalKe, setFilterTanggalKe] = useState("");

    const aturFilterProdi = (e, id) => {
        if (e.target.checked == true) {
            setFilterProgramStudi([...filterProgramStudi, id]);
        } else {
            setFilterProgramStudi(
                filterProgramStudi.filter((data) => data != id)
            );
        }
    };

    const handleFilter = () => {
        const params = new URLSearchParams();
        if (ordering) params.append("ordering", ordering);
        if (filterTanggalDari) params.append("daritanggal", filterTanggalDari);
        if (filterTanggalKe) params.append("ketanggal", filterTanggalKe);
        if (filterBidangUsaha) params.append("bidang_usaha", filterBidangUsaha);
        if (filterProgramStudi.length > 0)
            params.append("prodi", filterProgramStudi.join(","));

        router.push(`/lowongan?${params.toString()}`);
    };

    return (
        <section className="bg-white mx-auto max-w-screen-xl px-8 pb-16 pt-24 lg:py-36">
            <div className="w-full">
                <header>
                    <h2 className="text-xl max-lg:text-center font-bold text-gray-900 sm:text-3xl">
                        Lowongan Pekerjaan
                    </h2>

                    <p className="mt-4 max-lg:text-sm max-lg:text-center max-lg:max-w-full max-w-md text-gray-500">
                        {kontenLowongan !== "" ? kontenLowongan : ""}
                    </p>
                </header>

                <div className="mt-8 block lg:hidden">
                    <button className="flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 text-gray-900 transition hover:border-gray-600">
                        <span className="text-sm font-medium">
                            {" "}
                            Filters & Sorting{" "}
                        </span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-4 rtl:rotate-180"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M8.25 4.5l7.5 7.5-7.5 7.5"
                            />
                        </svg>
                    </button>
                </div>

                <div className="mt-4 lg:mt-8 lg:grid lg:grid-cols-4 lg:items-start lg:gap-8">
                    <div className="hidden space-y-4 lg:block">
                        <div className="grid grid-cols-4 gap-2">
                            <div>
                                <label
                                    htmlFor="SortBy"
                                    className="block text-xs font-medium text-gray-700"
                                >
                                    {" "}
                                    Sort By{" "}
                                </label>

                                <select
                                    id="SortBy"
                                    value={ordering}
                                    onChange={(e) =>
                                        setOrdering(e.target.value)
                                    }
                                    className="mt-1 rounded border-gray-300 text-sm"
                                >
                                    <option value="">A-Z</option>
                                    <option value="Z-A">Z-A</option>
                                </select>
                            </div>
                            <div className="w-full flex justify-end p-4 col-span-3">
                                <button
                                    type="button"
                                    onClick={handleFilter}
                                    className="inline-flex hover:cursor-pointer items-center text-sm text-gray-900"
                                >
                                    <svg
                                        className="w-6 h-6 text-gray-800"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeWidth="2"
                                            d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                                        />
                                    </svg>
                                    &nbsp;Terapkan Filter
                                </button>
                            </div>
                        </div>

                        <div>
                            <p className="block text-xs font-medium text-gray-700">
                                Filters
                            </p>

                            <div className="mt-1 space-y-2">
                                <details className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
                                    <summary className="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition">
                                        <span className="text-sm font-medium">
                                            Program Studi
                                        </span>
                                        <span className="transition group-open:-rotate-180">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className="h-4 w-4"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                                />
                                            </svg>
                                        </span>
                                    </summary>

                                    <div className="border-t border-gray-200 bg-white">
                                        <header className="flex items-center justify-between p-4">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setFilterProgramStudi([]);
                                                }}
                                                className="text-sm text-gray-900 underline underline-offset-4"
                                            >
                                                Reset
                                            </button>
                                        </header>
                                        <ul className="space-y-1 border-t border-gray-200 p-4">
                                            {dataProgramStudi.map((data) => (
                                                <li key={data.id}>
                                                    <label
                                                        htmlFor={data.id}
                                                        className="inline-flex items-center gap-2"
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            id={data.id}
                                                            onChange={(e) =>
                                                                aturFilterProdi(
                                                                    e,
                                                                    data.id
                                                                )
                                                            }
                                                            value={filterProgramStudi.includes(
                                                                data.id
                                                            )}
                                                            checked={filterProgramStudi.includes(
                                                                data.id
                                                            )}
                                                            className="size-5 rounded border-gray-300"
                                                        />
                                                        <span className="text-sm font-medium text-gray-700">
                                                            {data.nama}
                                                        </span>
                                                    </label>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </details>

                                <details className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
                                    <summary className="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition">
                                        <span className="text-sm font-medium">
                                            Bidang Usaha
                                        </span>

                                        <span className="transition group-open:-rotate-180">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className="h-4 w-4"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                                />
                                            </svg>
                                        </span>
                                    </summary>

                                    <div className="border-t border-gray-200 bg-white">
                                        <header className="flex items-center justify-between p-4">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setFilterBidangUsaha("");
                                                }}
                                                className="text-sm text-gray-900 underline underline-offset-4"
                                            >
                                                Reset
                                            </button>
                                        </header>

                                        <div className="border-t border-gray-200 bg-white">
                                            <ul className="space-y-1 border-t border-gray-200 p-4">
                                                {dataBidangUsaha.map(
                                                    (data, i) => (
                                                        <li
                                                            key={i}
                                                            className="mb-3"
                                                        >
                                                            <label
                                                                htmlFor={
                                                                    data.bidang_usaha
                                                                }
                                                                className="inline-flex text-xs items-center gap-2"
                                                            >
                                                                <input
                                                                    type="radio"
                                                                    id={
                                                                        data.bidang_usaha
                                                                    }
                                                                    onChange={() => {
                                                                        setFilterBidangUsaha(
                                                                            data.bidang_usaha
                                                                        );
                                                                    }}
                                                                    checked={
                                                                        filterBidangUsaha ===
                                                                        data.bidang_usaha
                                                                    }
                                                                    name="filter_bidang_usaha"
                                                                    className="rounded border-gray-300"
                                                                />
                                                                <span className="text-xs font-medium text-gray-700">
                                                                    {
                                                                        data.bidang_usaha
                                                                    }
                                                                </span>
                                                            </label>
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                </details>
                                <details className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
                                    <summary className="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition">
                                        <span className="text-sm font-medium">
                                            Periode
                                        </span>
                                        <span className="transition group-open:-rotate-180">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className="h-4 w-4"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                                />
                                            </svg>
                                        </span>
                                    </summary>

                                    <div className="border-t border-gray-200 bg-white w-full">
                                        <header className="flex items-center justify-between p-4">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setFilterTanggalDari("");
                                                    setFilterTanggalKe("");
                                                }}
                                                className="text-sm text-gray-900 underline underline-offset-4"
                                            >
                                                Reset
                                            </button>
                                        </header>
                                        <div className="space-y-1 border-t border-gray-200 p-4">
                                            <div className="block w-full text-xs">
                                                <p className="m-auto text-xs font-semibold">
                                                    Dari
                                                </p>
                                                <div className="relative">
                                                    <input
                                                        type="date"
                                                        id="tanggal"
                                                        value={
                                                            filterTanggalDari
                                                        }
                                                        onChange={(e) =>
                                                            setFilterTanggalDari(
                                                                e.target.value
                                                            )
                                                        }
                                                        className="h-full border block appearance-none w-full bg-white border-gray-300 text-black py-2 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                        placeholder="Tanggal.."
                                                    />
                                                </div>
                                                <p className="m-auto text-xs font-semibold">
                                                    Ke
                                                </p>
                                                <div className="relative">
                                                    <input
                                                        type="date"
                                                        id="tanggal"
                                                        value={filterTanggalKe}
                                                        onChange={(e) =>
                                                            setFilterTanggalKe(
                                                                e.target.value
                                                            )
                                                        }
                                                        className="h-full border block appearance-none w-full bg-white border-gray-300 text-black py-2 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                        placeholder="Tanggal.."
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </details>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-3">
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {dataLowongan.data.length > 0 ? (
                                dataLowongan.data.map((data, i) => {
                                    return (
                                        <CardLowongan
                                            data={data}
                                            key={i}
                                        ></CardLowongan>
                                    );
                                })
                            ) : (
                                <div className="flex justify-center w-full h-full col-span-3">
                                    <p className="text-center text-xl text-gray-500 font-normal">
                                        Belum ada lowongan tersedia
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
