export const CardSkills = ({ data }) => {
  return (
    <>
      <div className="max-w-sm p-6 bg-gray-50 border border-gray-200 rounded-lg shadow-sm">
        <img className="w-12 h-12 rounded-full mb-2" src={process.env.NEXT_PUBLIC_STORAGE_BASE_URL + data.gambar} alt={data.nama} />

        <span>
          <h5 className="mb-2 text-xl font-semibold tracking-tight text-gray-500">{data.nama}</h5>
        </span>
        <p className="mb-3 font-normal text-gray-800">{data.deskripsi}</p>
      </div>
    </>
  );
};
