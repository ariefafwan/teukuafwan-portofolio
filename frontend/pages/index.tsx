import Link from "next/link";
import fetchData from "@/lib/fetchData";
import { CardSkills } from "../components/CardSkills";
import { CardExperience } from "../components/CardExperience";
import { CardProjects } from "../components/CardProjects";
import { DefaultLayout } from "../components/layouts/DefaultLayout";

export const getServerSideProps = async () => {
  try {
    const getHome = await fetchData("/home");

    return {
      props: {
        data: getHome.data,
      },
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return {
      props: { error: message },
    };
  }
};

export default function Home(data: any) {
  const { profile, educations, skills, main_skills, projects } = data.data;
  const projectData: any[] = projects.data;

  function formatMonthYear(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "long",
      year: "numeric",
    });
  }

  return (
    <DefaultLayout profile={profile} title="Home" index={true}>
      <div data-aos="fade-up" className="mx-auto my-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8 ">
        <div className="w-full mx-auto">
          <div className="grid gap-4 sm:grid-cols-2 place-content-center lg:grid-cols-3">
            {main_skills.map((main_skill: any) => (
              <CardSkills key={main_skill.uuid} data={main_skill} />
            ))}
          </div>
        </div>
      </div>
      <div className="mx-auto my-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8 ">
        <header>
          <h2 className="text-xl max-lg:text-center font-bold text-gray-500 sm:text-3xl">Education</h2>
          <p className="my-4 max-lg:text-sm max-lg:text-center max-lg:max-w-full text-gray-500">My academic journey and continuing education</p>
        </header>

        <ol className="relative border-s border-blue-400">
          {educations.map((education: any) => (
            <li key={education.uuid} className="mb-10 ms-4">
              <div className="absolute w-3.5 h-3.5 bg-blue-600 rounded-full mt-1.5 -start-1.5" />
              <time className="mb-1 text-sm font-normal leading-none text-gray-400">
                {formatMonthYear(education.masuk)} {education.lulus ? `- ${formatMonthYear(education.lulus)}` : ""}
              </time>
              <h3 className="text-lg font-semibold text-gray-900">{education.nama}</h3>
              <p className="text-base font-normal text-gray-500">
                {education.gelar} - Major in {education.jurusan} {education.nilai_kelulusan ? `- GPA: ${education.nilai_kelulusan}` : ""}
              </p>
            </li>
          ))}
        </ol>
      </div>
      <div data-aos="fade-up" className="mx-auto my-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8 ">
        <header>
          <h2 className="text-xl max-lg:text-center font-bold text-gray-500 sm:text-3xl">Experience</h2>
          <div className="grid gap-4 sm:grid-cols-2 place-content-center my-6 lg:grid-cols-3">
            <CardExperience></CardExperience>
          </div>
        </header>
      </div>
      <div data-aos="fade-up" className="mx-auto my-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8 ">
        <header>
          <h2 className="text-xl max-lg:text-center font-bold text-gray-500 sm:text-3xl">Projects</h2>
          <form className="max-w-md max-lg:max-w-full my-4 max-lg:grid max-lg:place-content-center">
            <div className="flex">
              <details className="group relative shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100">
                <summary className="flex items-center gap-2 text-gray-700 transition-colors hover:border-gray-400 hover:text-gray-900 [&::-webkit-details-marker]:hidden">
                  <span className="text-sm font-medium"> Categories </span>
                  <span className="transition-transform group-open:-rotate-180">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </summary>
                <div className="z-auto w-64 divide-y divide-gray-300 rounded border border-gray-300 bg-white shadow-sm group-open:absolute group-open:start-0 group-open:top-12">
                  <div className="flex items-center justify-between px-3 py-2">
                    <span className="text-sm text-gray-700"> Selected</span>
                    <button type="button" className="text-sm text-gray-700 underline transition-colors hover:text-gray-900">
                      Reset
                    </button>
                  </div>
                  <fieldset className="p-3">
                    <legend className="sr-only">Checkboxes</legend>
                    <div className="flex flex-col items-start gap-3">
                      {skills.map((skill: any) => (
                        <label key={skill.uuid} htmlFor={skill.nama} className="inline-flex items-center gap-3">
                          <input type="checkbox" value={skill.nama} className="size-5 rounded border-gray-300 shadow-sm" id={skill.name} />
                          <span className="text-sm font-medium text-gray-700"> {skill.nama} </span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                </div>
              </details>
              <div className="relative w-full ">
                <input
                  type="search"
                  id="search-dropdown"
                  className="block p-2.5 w-full z-20 hover:bg-gray-200 text-sm text-gray-900 bg-gray-100 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search Project..."
                  required
                />
              </div>
            </div>
          </form>
          <div className="grid gap-4 sm:grid-cols-2 my-6 lg:grid-cols-3">
            {projectData.map((data: any) => (
              <CardProjects key={data.uuid} main_data={data} />
            ))}
          </div>
          <div className="w-full mx-auto my-auto inline-flex items-center">
            <Link
              type="button"
              href="/projects"
              className="text-white mx-auto bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
            >
              See More
              <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 5h12m0 0L9 1m4 4L9 9" />
              </svg>
            </Link>
          </div>
        </header>
      </div>
    </DefaultLayout>
  );
}
