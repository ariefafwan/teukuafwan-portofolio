import fetchData from "@/lib/fetchData";
import { DefaultLayout } from "@/components/layouts/DefaultLayout";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

export const getServerSideProps = async (context: any) => {
  const { slug } = context.params;

  try {
    const getProject = await fetchData(`/projects/${slug}`);

    return {
      props: {
        data: getProject.data,
      },
    };
  } catch (error: any) {
    return {
      props: {
        error: error.message || "Unknown error",
      },
    };
  }
};

export default function ProjectDetail({ data }: { data: any }) {
  const ProjectData: any = data.project;
  const OtherProject: any[] = data.other_projects;
  const profile: any = data.profile;

  return (
    <>
      <DefaultLayout title={ProjectData.judul} profile={profile} index={false}>
        <></>
        <div className="mx-auto max-w-screen-xl px-4 pt-8 sm:px-6 lg:px-8">
          <div className="space-y-4 md:space-y-8">
            <img data-aos="zoom-in" src={process.env.NEXT_PUBLIC_STORAGE_BASE_URL + ProjectData.data_gambar?.[0].gambar} className="rounded-xl w-full h-80 lg:h-100 object-cover" alt="teuku afwan" />
            <div className="w-full grid gap-4 lg:grid-cols-3 grid-cols-1">
              <div className="col-span-2">
                <h2 data-aos="fade-right" className="text-2xl font-semibold text-gray-900 sm:text-3xl">
                  {ProjectData.judul}
                </h2>
                <div data-aos="fade-right" className="mt-2 flex flex-wrap items-center gap-4 text-sm text-gray-500">
                  <span>📅 {ProjectData.tahun}</span>
                  {ProjectData.link && (
                    <a href={ProjectData.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-1 hover:cursor-pointer">
                      🔗 {ProjectData.status == "Repository" ? "Repository" : "Visit"} Project
                    </a>
                  )}
                </div>
                <div data-aos="fade-right" className="my-2">
                  {ProjectData.data_skill.map((skill: any, i: number) => (
                    <span key={i} className="bg-blue-300 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full">
                      {skill.nama}
                    </span>
                  ))}
                </div>
                <p data-aos="fade-up" className="mt-6 my-4 text-gray-700">
                  {ProjectData.deskripsi}
                </p>
                <div data-aos="fade-right" className="my-4">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800 border-b-4 border-blue-900 w-fit">Galeri Project</h3>
                  <Splide
                    options={{
                      type: "loop",
                      perPage: 2,
                      gap: "1rem",
                      autoplay: true,
                      pauseOnHover: true,
                      breakpoints: {
                        640: { perPage: 1 },
                        1024: { perPage: 2 },
                      },
                    }}
                    aria-label="Project Gallery"
                    className="my-6"
                  >
                    {ProjectData.data_gambar.map((item: any, i: number) => (
                      <SplideSlide key={i}>
                        <img src={process.env.NEXT_PUBLIC_STORAGE_BASE_URL + item.gambar} alt={`Gallery ${i}`} className="rounded-lg object-cover w-full h-64" />
                      </SplideSlide>
                    ))}
                  </Splide>
                </div>
              </div>
              <div data-aos="fade-right">
                <h2 className="text-xl font-semibold w-fit mb-4 text-gray-900 sm:text-xl ">
                  <span className=" border-blue-900 border-b-4">Other</span> Related Project
                </h2>
                <div className="grid place-content-center lg:grid-cols-1 sm:grid-cols-2 gap-2">
                  {OtherProject.slice(0, 2).map((item: any, i: number) => (
                    <a href={`/projects/${item.slug}`} key={i}>
                      <article className="flex max-w-full flex-col items-start justify-between shadow-xl pt-5 p-4 rounded-2xl">
                        <div className="flex items-center gap-x-4 text-xs">
                          <span className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">{item.tahun_project}</span>
                        </div>
                        <div className="group relative">
                          <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                            <span className="absolute inset-0" />
                            {item.judul}
                          </h3>
                          <p className="mt-5 line-clamp-3 text-sm/6 text-gray-600">{item.deskripsi}</p>
                        </div>
                      </article>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </DefaultLayout>
    </>
  );
}
