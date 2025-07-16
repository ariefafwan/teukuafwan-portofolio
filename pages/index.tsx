import fetchData from "@/lib/fetchData";
import { CardSkills } from "../components/CardSkills";
import { CardExperience } from "../components/CardExperience";
import { DefaultLayout } from "../components/layouts/DefaultLayout";
// import { useRouter } from "next/router";
import { useState, useCallback, useMemo } from "react";
import { ChangeEvent, FormEvent } from "react";
import dynamic from "next/dynamic";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import React from "react";

const CardProjects = dynamic(() => import("../components/CardProjects").then((mod) => ({ default: mod.CardProjects })), {
  loading: () => <div className="animate-pulse bg-gray-200 h-48 rounded-lg"></div>,
});

const MemoizedCardSkills = React.memo(CardSkills);
const MemoizedCardProjects = React.memo(CardProjects);

export const getServerSideProps = async (context: any) => {
  const { skill = "", search = "", order = "" } = context.query;

  const qs = new URLSearchParams();
  if (skill) qs.append("skill", skill);
  if (search) qs.append("search", search);
  if (order) qs.append("order", order);

  try {
    const getHome = await fetchData(`/home?${qs}`);
    return {
      props: {
        data: getHome.data,
        filterSearch: search,
        filterSkill: skill.split(",").filter(Boolean),
        filterOrder: order,
      },
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return {
      props: { error: message },
    };
  }
};

export default function Home({ data, filterSearch, filterSkill, filterOrder }: any) {
  const { profile, educations, skills, main_skills, projects } = data;
  const projectData: any[] = projects.data;

  // const router = useRouter();
  const [localSkill, setLocalSkill] = useState<string[]>(filterSkill || []);
  const [localSearch, setLocalSearch] = useState<string>(filterSearch || "");
  const [localOrder, setLocalOrder] = useState<string>(filterOrder || "");

  const formatMonthYear = useCallback((dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "long",
      year: "numeric",
    });
  }, []);

  const aturFilterSkill = useCallback((e: ChangeEvent<HTMLInputElement>, uuid: string) => {
    setLocalSkill((prev) => (e.target.checked ? [...prev, uuid] : prev.filter((id) => id !== uuid)));
  }, []);

  // const handleFilter = (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const params = new URLSearchParams();
  //   if (localSearch) params.append("search", localSearch);
  //   if (localOrder) params.append("order", localOrder);
  //   if (localSkill.length > 0) params.append("skill", localSkill.join(","));
  //   window.location.href = "/?" + params.toString();
  // };

  // const resetFilter = () => {
  //   window.location.href = "/";
  // };

  const handleFilter = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const params = new URLSearchParams();
      if (localSearch) params.append("search", localSearch);
      if (localOrder) params.append("order", localOrder);
      if (localSkill.length > 0) params.append("skill", localSkill.join(","));

      window.location.href = "/?" + params.toString();
    },
    [localSearch, localOrder, localSkill]
  );

  const resetFilter = useCallback(() => {
    setLocalSkill([]);
    setLocalSearch("");
    setLocalOrder("");
    window.location.href = "/";
  }, []);

  const renderEducations = useMemo(
    () => (
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
    ),
    [educations, formatMonthYear]
  );

  const renderSkillFilters = useMemo(
    () => (
      <div className="flex flex-col items-start gap-3">
        {skills.map((skill: any) => (
          <label key={skill.uuid} htmlFor={skill.uuid} className="inline-flex items-center gap-3">
            <input
              type="checkbox"
              id={skill.uuid}
              onChange={(e) => aturFilterSkill(e, skill.uuid)}
              checked={localSkill.includes(skill.uuid)}
              className="size-5 rounded border-gray-300 hover:cursor-pointer"
            />
            <span className="text-sm font-medium text-gray-700">{skill.nama}</span>
          </label>
        ))}
      </div>
    ),
    [skills, localSkill, aturFilterSkill]
  );

  const splideOptions = useMemo(
    () => ({
      type: "loop" as const,
      perPage: 3,
      gap: "1rem",
      breakpoints: {
        1024: { perPage: 2 },
        640: { perPage: 1 },
      },
      pagination: false,
      arrows: true,
    }),
    []
  );

  return (
    <DefaultLayout profile={profile} title="Home" index={true}>
      <div data-aos="fade-up" className="mx-auto my-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8 ">
        <div className="w-full mx-auto">
          <div className="grid gap-4 sm:grid-cols-2 place-content-center lg:grid-cols-3">
            {main_skills.map((main_skill: any) => (
              <MemoizedCardSkills key={main_skill.uuid} data={main_skill} />
            ))}
          </div>
        </div>
      </div>
      <div className="mx-auto my-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8 ">
        <header>
          <h2 className="text-xl max-lg:text-center font-bold text-gray-500 sm:text-3xl">Education</h2>
          <p className="my-4 max-lg:text-sm max-lg:text-center max-lg:max-w-full text-gray-500">My academic journey and continuing education</p>
        </header>
        <ol className="relative border-s border-blue-400">{renderEducations}</ol>
      </div>
      <div data-aos="fade-up" className="mx-auto my-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8 ">
        <header>
          <h2 className="text-xl max-lg:text-center font-bold text-gray-500 sm:text-3xl">Experience</h2>
          <div className="grid gap-4 sm:grid-cols-2 place-content-center my-6 lg:grid-cols-3">
            <CardExperience></CardExperience>
          </div>
        </header>
      </div>
      <div data-aos="fade-up" className="mx-auto my-auto max-w-screen-xl px-4 pt-8 sm:px-6 lg:px-8 ">
        <header>
          <h2 className="text-xl max-lg:text-center font-bold text-gray-500 sm:text-3xl">Projects</h2>
          <div className="max-w-md max-lg:max-w-full my-4 max-lg:grid max-lg:place-content-center">
            <div className="flex">
              <details className="group relative shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 ">
                <summary className="flex items-center gap-2 text-gray-700 transition-colors hover:border-gray-400 hover:text-gray-900 [&::-webkit-details-marker]:hidden hover:cursor-pointer">
                  <span className="text-sm font-medium"> Filters </span>
                  <span className="transition-transform group-open:-rotate-180">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </summary>
                <div className="z-auto w-64 divide-y divide-gray-300 rounded border border-gray-300 bg-white shadow-sm group-open:absolute group-open:start-0 group-open:top-12">
                  <form onSubmit={handleFilter} className="flex items-center justify-end gap-4 px-3 py-2">
                    <button type="submit" className="text-sm text-gray-700 underline transition-colors hover:text-gray-900 hover:cursor-pointer">
                      Apply
                    </button>
                    <button onClick={resetFilter} type="button" className="text-sm text-gray-700 underline transition-colors hover:text-gray-900 hover:cursor-pointer">
                      Reset
                    </button>
                  </form>
                  <fieldset className="p-3">
                    {skills.length > 0 ? (
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm text-gray-700 border-b-2"> Skills</span>
                      </div>
                    ) : (
                      ""
                    )}
                    <legend className="sr-only">Checkboxes</legend>
                    <div className="flex flex-col items-start gap-3">{renderSkillFilters}</div>
                    <div className="flex items-center justify-between mt-3 mb-3">
                      <span className="text-sm text-gray-700 border-b-2"> Sort By</span>
                    </div>
                    <div className="flex flex-col items-start gap-3">
                      <label htmlFor="Oldest" className="inline-flex items-center gap-3">
                        <input
                          type="checkbox"
                          onChange={(e) => setLocalOrder(e.target.value)}
                          value="ASC"
                          checked={localOrder == "ASC"}
                          className="size-5 rounded border-gray-300 shadow-sm hover:cursor-pointer"
                          id="Oldest"
                        />
                        <span className="text-sm font-medium text-gray-700"> Oldest </span>
                      </label>
                      <label htmlFor="Newest" className="inline-flex items-center gap-3">
                        <input
                          type="checkbox"
                          onChange={(e) => setLocalOrder(e.target.value)}
                          value="DESC"
                          checked={localOrder == "DESC"}
                          className="size-5 rounded border-gray-300 shadow-sm hover:cursor-pointer"
                          id="Newest"
                        />
                        <span className="text-sm font-medium text-gray-700"> Newest </span>
                      </label>
                    </div>
                  </fieldset>
                </div>
              </details>
              <form onSubmit={handleFilter} className="relative w-full ">
                <input
                  type="search"
                  id="search"
                  onChange={(e) => setLocalSearch(e.target.value)}
                  value={localSearch}
                  className="block p-2.5 w-full z-20 hover:bg-gray-200 text-sm text-gray-900 bg-gray-100 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search Project..."
                />
                <button onClick={() => setLocalSearch("")} type="button" className={localSearch == "" ? "hidden" : "absolute inset-y-0 end-8 flex items-center pe-3 hover:cursor-pointer"}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </button>
                <button
                  type="submit"
                  className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 hover:cursor-pointer"
                >
                  <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                  </svg>
                  <span className="sr-only">Search</span>
                </button>
              </form>
            </div>
          </div>
          <div className="hidden lg:grid gap-4 sm:grid-cols-2 my-6 lg:grid-cols-3">
            {projectData.map((data: any) => (
              <MemoizedCardProjects key={data.uuid} main_data={data} />
            ))}
          </div>
          <Splide options={splideOptions} aria-label="Project Carousel" className="my-6 lg:hidden">
            {projectData.map((project: any) => (
              <SplideSlide key={project.uuid}>
                <MemoizedCardProjects main_data={project} />
              </SplideSlide>
            ))}
          </Splide>
          <div className="w-full mx-auto my-auto inline-flex items-center">
            <a
              type="button"
              href="/projects"
              className="text-white mx-auto bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center transition transform hover:-translate-y-1 duration-300 ease-in-out"
            >
              See More
              <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 5h12m0 0L9 1m4 4L9 9" />
              </svg>
            </a>
          </div>
        </header>
      </div>
    </DefaultLayout>
  );
}
