import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import fetchData from "@/lib/fetchData";
import { CardSkills } from "../components/CardSkills";
import { CardExperience } from "../components/CardExperience";
import { CardProjects } from "../components/CardProjects";

export const getServerSideProps = async () => {
  try {
    const getHome = await fetchData("/home");
    return {
      props: {
        data: getHome.data,
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

export default function Home(data, error) {
  const profile = data.data.profile;
  const education = data.data.education;
  const skill = data.data.skill;
  const main_skill = data.data.main_skill;
  const project = data.data.project;

  return (
    <>
      <Head>
        <title>{profile.nama} - Home</title>
      </Head>
      <section className=" bg-gray-100">
        <div className="mx-auto max-w-screen-xl px-4 pt-14 py-8 sm:px-6 lg:px-8 ">
          <div className="w-full mx-auto my-auto">
            <div className="w-full flex flex-col items-center pb-10 pt-4">
              <img
                className="w-64 h-64 mb-6 rounded-full bg-none transition-all duration-1000 hover:scale-120 transform"
                src={process.env.NEXT_PUBLIC_STORAGE_BASE_URL + profile.gambar_profil}
                alt="Teuku Afwan"
              />
              <h5 className="mb-1 text-3xl font-bold text-gray-500">{profile.nama_panggilan}</h5>
              <span className="text-sm text-gray-500">{profile.moto_profesional}</span>
              <p className="mt-4 sm:px-24 text-center text-gray-700">{profile.deskripsi}</p>
              <div className="flex mt-4 md:mt-6 space-x-3">
                <a
                  href="#contact"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                >
                  Contact Me &nbsp;
                  <svg className="w-5 h-5 rotate-45" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      fillRule="evenodd"
                      d="M12 2a1 1 0 0 1 .932.638l7 18a1 1 0 0 1-1.326 1.281L13 19.517V13a1 1 0 1 0-2 0v6.517l-5.606 2.402a1 1 0 0 1-1.326-1.281l7-18A1 1 0 0 1 12 2Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href={process.env.NEXT_PUBLIC_STORAGE_BASE_URL + profile.resume}
                  target="_blank"
                  download
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-gray-500 rounded-lg hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-blue-300"
                >
                  My Resume &nbsp;
                  <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M13 11.15V4a1 1 0 1 0-2 0v7.15L8.78 8.374a1 1 0 1 0-1.56 1.25l4 5a1 1 0 0 0 1.56 0l4-5a1 1 0 1 0-1.56-1.25L13 11.15Z" clipRule="evenodd" />
                    <path
                      fillRule="evenodd"
                      d="M9.657 15.874 7.358 13H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-2.358l-2.3 2.874a3 3 0 0 1-4.685 0ZM17 16a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H17Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div data-aos="fade-up" className="mx-auto my-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8 ">
          <div className="w-full mx-auto">
            <div className="grid gap-4 sm:grid-cols-2 place-content-center lg:grid-cols-3">
              <CardSkills data={"Test"}></CardSkills>
            </div>
          </div>
        </div>
        <div className="mx-auto my-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8 ">
          <header>
            <h2 className="text-xl max-lg:text-center font-bold text-gray-500 sm:text-3xl">Education</h2>
            <p className="my-4 max-lg:text-sm max-lg:text-center max-lg:max-w-full text-gray-500">My academic journey and continuing education</p>
          </header>

          <ol className="relative border-s border-blue-400">
            <li className="mb-10 ms-4">
              <div className="absolute w-3.5 h-3.5 bg-blue-600 rounded-full mt-1.5 -start-1.5" />
              <time className="mb-1 text-sm font-normal leading-none text-gray-400">August 2018 - January 2023</time>
              <h3 className="text-lg font-semibold text-gray-900">Malikussaleh University</h3>
              <p className="text-base font-normal text-gray-500">Bachelor of Engineering (S.T.) - Major in Information System - GPA 3.6</p>
            </li>
            <li className="ms-4">
              <div className="absolute w-3.5 h-3.5 bg-blue-600 rounded-full mt-1.5 -start-1.5" />
              <time className="mb-1 text-sm font-normal leading-none text-gray-400">Febuari 2024 - Present</time>
              <h3 className="text-lg font-semibold text-gray-900">Diponegoro University</h3>
              <p className="text-base font-normal text-gray-500">Master of Computer (M.Kom.) - Major in Information System</p>
            </li>
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
                        <label htmlFor="Option1" className="inline-flex items-center gap-3">
                          <input type="checkbox" value="React" className="size-5 rounded border-gray-300 shadow-sm" id="Option1" />
                          <span className="text-sm font-medium text-gray-700"> React </span>
                        </label>
                        <label htmlFor="Option2" className="inline-flex items-center gap-3">
                          <input value="React" type="checkbox" className="size-5 rounded border-gray-300 shadow-sm" id="Option2" />
                          <span className="text-sm font-medium text-gray-700"> Laravel </span>
                        </label>
                        <label htmlFor="Option3" className="inline-flex items-center gap-3">
                          <input value="Machine Learning" type="checkbox" className="size-5 rounded border-gray-300 shadow-sm" id="Option3" />
                          <span className="text-sm font-medium text-gray-700"> Machine Learning </span>
                        </label>
                        <label htmlFor="Option4" className="inline-flex items-center gap-3">
                          <input type="checkbox" value="Python" className="size-5 rounded border-gray-300 shadow-sm" id="Option4" />
                          <span className="text-sm font-medium text-gray-700"> Python </span>
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
            <div className="grid gap-4 sm:grid-cols-2 my-6 lg:grid-cols-3">{project.length > 0 ?? project.map((data, index) => <CardProjects main_data={data} key={index}></CardProjects>)}</div>
            <div className="w-full mx-auto my-auto inline-flex items-center">
              <a
                type="button"
                href="/projects"
                className="text-white mx-auto bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
              >
                See More
                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
              </a>
            </div>
          </header>
        </div>
        <footer id="contact">
          <div className="mx-auto max-w-screen-xl px-4 pt-16 pb-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-md">
              <strong className="block text-center text-xl font-bold text-gray-500 sm:text-4xl mb-4">Find Me On Social Media</strong>

              <div className="inline-flex items-center justify-center w-full space-x-5 my-3 mx-auto max-w-md">
                <Link className="text-gray-700 transition hover:text-gray-700/75" href={profile.instagram} target="_blank" rel="noreferrer">
                  <span className="sr-only"> Instagram </span>
                  <svg className="size-12" fill="#02003f" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
                <Link className="text-gray-700 transition hover:text-gray-700/75" href={profile.linkedin} target="_blank" rel="noreferrer">
                  <span className="sr-only"> Linkedin </span>
                  <svg className="size-11" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="#02003f">
                    <path d="M100.28 448H7.4V148.9h92.88zM53.14 108.1a53.6 53.6 0 1 1 0-107.2 53.6 53.6 0 0 1 0 107.2zM447.9 448h-92.68V302.4c0-34.7-12.4-58.4-43.4-58.4-23.7 0-37.8 15.9-44 31.3-2.3 5.6-2.9 13.3-2.9 21.1V448H172.7V148.9h89v40.8h1.3c12.4-22.1 42.6-45.4 87.6-45.4 62.5 0 97.3 40.9 97.3 129.2V448z" />
                  </svg>
                </Link>
                <Link className="text-gray-700 transition hover:text-gray-700/75" href={profile.kaggle} target="_blank" rel="noreferrer">
                  <span className="sr-only"> Kaggle </span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="size-11" fill="#02003f">
                    <path
                      d="M385.708,476.478L254.742,313.713l125.578-121.534c2.334-2.426,1.526-9.433-4.761-9.433h-62.16
c-3.145,0-6.288,1.618-9.433,4.761L185.128,307.604V32.738c0-4.491-2.247-6.737-6.738-6.737h-46.618
c-4.492,0-6.737,2.246-6.737,6.737v446.433c0,4.491,2.246,6.738,6.737,6.738h46.618c4.491,0,6.738-2.247,6.738-6.738v-97.91
l27.666-26.317l99.257,126.294c2.695,3.145,5.839,4.762,9.432,4.762h60.095c3.143,0,4.939-0.899,5.389-2.696L385.708,476.478z"
                    />
                  </svg>
                </Link>
                <Link className="text-gray-700 transition hover:text-gray-700/75" href={profile.github} target="_blank" rel="noreferrer">
                  <span className="sr-only"> GitHub </span>
                  <svg className="size-12" fill="#02003f" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="mt-16 border-t border-gray-100 pt-8">
              <p className="text-center text-xs/relaxed text-gray-500">
                ©teukuafwan 2022. All rights reserved.
                <br />
                Created with
                <span className="text-gray-700"> Next + Laravel 11</span>
              </p>
            </div>
          </div>
        </footer>
        <div data-dial-init="" className="fixed end-6 bottom-6 group">
          <button
            type="button"
            data-dial-toggle="speed-dial-menu-default"
            aria-controls="speed-dial-menu-default"
            aria-expanded="false"
            className="flex items-center justify-center text-white bg-blue-700 rounded-full w-14 h-14 hover:bg-blue-800"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
              />
            </svg>
            <span className="sr-only">Open actions menu</span>
          </button>
        </div>
      </section>
    </>
  );
}
