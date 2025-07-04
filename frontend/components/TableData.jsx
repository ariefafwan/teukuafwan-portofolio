"use client";

import { ButtonPrimary } from "./ButtonPrimary";

export const TableData = ({ children, buttonModal, inputsearch, changeSearch, head, label, filter }) => {
  return (
    <>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <caption className="p-5 font-semibold text-left rtl:text-right text-gray-900 bg-white">
          <p className={(changeSearch != false && buttonModal != false ? "mb-4" : "") + " text-xl"}>{label}</p>
          <div
            className={
              "cursor-pointer flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 bg-white" + (changeSearch != false && buttonModal != false ? " pb-4" : "")
            }
          >
            {buttonModal !== false ? <ButtonPrimary eventFun={buttonModal}>Tambah Data</ButtonPrimary> : ""}
            <div className={(buttonModal !== false ? "" : "w-full") + " flex justify-end h-full"}>
              {filter !== false ? filter : ""}
              {changeSearch == false ? (
                ""
              ) : (
                <>
                  <div className="relative">
                    <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="table-search-users"
                      value={inputsearch}
                      onChange={changeSearch}
                      className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 w-56 bg-gray-50 focus:outline-none"
                      placeholder="Cari Data..."
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </caption>
        <thead className="text-xs text-black uppercase bg-teal-500">
          <tr>
            <th scope="col" className="px-6 py-3">
              No.
            </th>
            {head.map((data, i) => {
              return (
                <th key={i} scope="col" className="px-6 py-3">
                  {data}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </>
  );
};
