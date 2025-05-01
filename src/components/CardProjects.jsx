import { Link } from "react-router-dom";

export const CardProjects = ({ main_data }) => {
  return (
    <>
      <article key={main_data.id} className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-xs">
        <img
          alt={main_data.nama_project}
          src={main_data.galeri_project[0] || "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1770&q=80"}
          className="h-56 w-full object-cover"
        />

        <div className="p-4 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900">
            {main_data.nama_project} ({main_data.tahun_project})
          </h3>

          <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">{main_data.deskripsi_project}</p>

          <Link to={`/projects/detail/${main_data.id}`} className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600">
            Selengkapnya
            <span aria-hidden="true" className="block transition-all group-hover:ms-0.5 rtl:rotate-180">
              &rarr;
            </span>
          </Link>
        </div>
      </article>
    </>
  );
};
