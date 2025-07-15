export const CardProjects = ({ main_data }) => {
  return (
    <>
      <article key={main_data.uuid} className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-xs transition-all duration-300 hover:scale-104 transform">
        <img alt={main_data.judul} src={process.env.NEXT_PUBLIC_STORAGE_BASE_URL + main_data.data_gambar?.[0].gambar} className="h-56 w-full object-cover" />

        <div className="p-4 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900">
            {main_data.judul} | ({main_data.tahun})
          </h3>
          <div className="my-2">
            {main_data.data_skill.map((skill, i) => (
              <span key={i} className="bg-blue-300 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full">
                {skill.nama}
              </span>
            ))}
          </div>
          <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500 line-clamp-3">{main_data.deskripsi}</p>
          <a href={`/projects/${main_data.slug}`} className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600">
            Selengkapnya
            <span aria-hidden="true" className="block transition-all group-hover:ms-0.5 rtl:rotate-180">
              &rarr;
            </span>
          </a>
        </div>
      </article>
    </>
  );
};
