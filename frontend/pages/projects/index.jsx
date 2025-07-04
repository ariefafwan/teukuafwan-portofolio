import Link from "next/link";
import { CardProjects } from "@/components/CardProjects";
import fetchData from "@/lib/fetchData";
import { DefaultLayout } from "../../components/layouts/DefaultLayout";

export const getServerSideProps = async () => {
  try {
    const getProject = await fetchData("/projects");
    return {
      props: {
        data: getProject.data,
      },
    };
  } catch (error) {
    return {
      props: {
        error: error.message,
      },
    };
  }
};

export default function ProjectPage(data, error) {
  const profile = data.data.profile;
  const skills = data.data.skills;
  const projects = data.data.projects;

  return (
    <DefaultLayout profile={profile} title="Projects" index={false}>
      <div className="mx-auto my-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8 ">
        <header>
          <h2 className="text-xl w-full text-center font-bold text-gray-500 sm:text-3xl">All Projects</h2>
          <form className="max-w-md max-lg:max-w-full my-4 max-lg:grid max-lg:place-content-center">
            <div className="flex">
              <details className="group relative shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100">
                <summary className="flex items-center gap-2 text-gray-700 transition-colors hover:border-gray-400 hover:text-gray-900 [&::-webkit-details-marker]:hidden">
                  <span className="text-sm font-medium"> Filters </span>
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
                    {skills.length > 0 ?? (
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm text-gray-700 border-b-2"> Skills</span>
                      </div>
                    )}
                    <legend className="sr-only">Checkboxes</legend>
                    <div className="flex flex-col items-start gap-3">
                      {skills.length > 0 ??
                        skills.map((skill, i) => {
                          return (
                            <label key={i} htmlFor={skill.id} className="inline-flex items-center gap-3">
                              <input type="checkbox" value={skill.id} className="size-5 rounded border-gray-300 shadow-sm" id={skill.id} />
                              <span className="text-sm font-medium text-gray-700"> {skill.nama} </span>
                            </label>
                          );
                        })}
                    </div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-gray-700 border-b-2"> Sort By</span>
                    </div>
                    <div className="flex flex-col items-start gap-3">
                      <label htmlFor="Oldest" className="inline-flex items-center gap-3">
                        <input type="checkbox" value="ASC" className="size-5 rounded border-gray-300 shadow-sm" id="Oldest" />
                        <span className="text-sm font-medium text-gray-700"> Oldest </span>
                      </label>
                      <label htmlFor="Newest" className="inline-flex items-center gap-3">
                        <input type="checkbox" value="DESC" className="size-5 rounded border-gray-300 shadow-sm" id="Newest" />
                        <span className="text-sm font-medium text-gray-700"> Newest </span>
                      </label>
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
          <div className="grid gap-4 sm:grid-cols-2 my-6 lg:grid-cols-3">{projects.length > 0 ?? projects.map((project, i) => <CardProjects key={i} main_data={project} />)}</div>
        </header>
      </div>
    </DefaultLayout>
  );
}
