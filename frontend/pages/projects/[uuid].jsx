import { Link, useParams } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export const getServerSideProps = async (context) => {
  const param = context.params;
  try {
    const getProject = await fetchData(`/projects/${param.uuid}`);
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

export const ProjectDetail = (data, error) => {
  console.log(data);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <>
      {/* <section className="bg-gray-100">
        <header className="bg-gray-100">
          <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-4 pt-8 px-4 sm:px-6 lg:px-8">
            <Link className="block text-teal-600" to="/">
              <span className="sr-only">Home</span>
              <img className="w-16 h-16 rounded-full bg-none" src={"/progrity_mentor.png"} alt="Teuku Afwan" />
            </Link>
            <div className="flex flex-1 items-center justify-end md:justify-between">
              <div className="flex items-center gap-4">
                <div className="sm:flex sm:gap-4">
                  <a
                    href="Resume Teuku M Arief Afwan.pdf"
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
        </header>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="space-y-4 md:space-y-8">
            <img src={"/" + ProjectData.galeri_project[0]} className="rounded-xl w-full h-80 md:h-100 lg:h-150 object-cover" alt="teuku afwan" />
            <div className="w-full grid gap-4 lg:grid-cols-3 grid-cols-1">
              <div className="col-span-2">
                <h2 className="text-2xl font-semibold text-gray-900 sm:text-3xl">{ProjectData.nama_project}</h2>
                <p className="my-4 text-gray-700">{ProjectData.deskripsi_project}</p>
                <Carousel responsive={responsive} className="my-4">
                  {ProjectData.galeri_project
                    .filter((e) => e !== ProjectData.galeri_project[0])
                    .map((item, i) => (
                      <div className="mr-3" key={i}>
                        <img src={"/" + item} className="block w-full" alt="..." />
                      </div>
                    ))}
                </Carousel>
                {ProjectData.kategori_project.map((item, i) => (
                  <span key={i} className="bg-blue-300 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full">
                    {item}
                  </span>
                ))}
              </div>
              <div>
                <h2 className="text-xl font-semibold w-fit mb-4 text-gray-900 sm:text-xl ">
                  <span className=" border-blue-900 border-b-4">Other</span> Related Project
                </h2>
                <div className="grid place-content-center lg:grid-cols-1 sm:grid-cols-2 gap-2">
                  {OtherProject.slice(0, 2).map((item, i) => (
                    <Link to={`/projects/detail/${item.id}`} key={i}>
                      <article className="flex max-w-full flex-col items-start justify-between shadow-xl pt-5 p-4 rounded-2xl">
                        <div className="flex items-center gap-x-4 text-xs">
                          <span className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">{item.tahun_project}</span>
                        </div>
                        <div className="group relative">
                          <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                            <span className="absolute inset-0" />
                            {item.nama_project}
                          </h3>
                          <p className="mt-5 line-clamp-3 text-sm/6 text-gray-600">{item.deskripsi_project}</p>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer id="contact">
          <div className="mx-auto max-w-screen-xl px-4 pt-16 pb-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-md">
              <strong className="block text-center text-xl font-bold text-gray-500 sm:text-5xl mb-4">Contact Me</strong>

              <div className="inline-flex items-center justify-center w-full space-x-5 my-3 mx-auto max-w-md">
                <a className="text-gray-700 transition hover:text-gray-700/75" href="#" target="_blank" rel="noreferrer">
                  <span className="sr-only"> Facebook </span>
                  <svg className="size-12" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a className="text-gray-700 transition hover:text-gray-700/75" href="#" target="_blank" rel="noreferrer">
                  <span className="sr-only"> Instagram </span>
                  <svg className="size-12" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a className="text-gray-700 transition hover:text-gray-700/75" href="#" target="_blank" rel="noreferrer">
                  <span className="sr-only"> Twitter </span>

                  <svg className="size-12" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a className="text-gray-700 transition hover:text-gray-700/75" href="#" target="_blank" rel="noreferrer">
                  <span className="sr-only"> GitHub </span>
                  <svg className="size-12" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
            <div className="mt-16 border-t border-gray-100 pt-8">
              <p className="text-center text-xs/relaxed text-gray-500">
                ©teukuafwan 2022. All rights reserved.
                <br />
                Created with
                <span className="text-gray-700"> React</span>
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
            <svg className="w-7 h-7 transition-transform group-hover:w-8 group-hover:h-8" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M12 4a8 8 0 0 0-6.895 12.06l.569.718-.697 2.359 2.32-.648.379.243A8 8 0 1 0 12 4ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10a9.96 9.96 0 0 1-5.016-1.347l-4.948 1.382 1.426-4.829-.006-.007-.033-.055A9.958 9.958 0 0 1 2 12Z"
                clipRule="evenodd"
              />
              <path
                fill="currentColor"
                d="M16.735 13.492c-.038-.018-1.497-.736-1.756-.83a1.008 1.008 0 0 0-.34-.075c-.196 0-.362.098-.49.291-.146.217-.587.732-.723.886-.018.02-.042.045-.057.045-.013 0-.239-.093-.307-.123-1.564-.68-2.751-2.313-2.914-2.589-.023-.04-.024-.057-.024-.057.005-.021.058-.074.085-.101.08-.079.166-.182.249-.283l.117-.14c.121-.14.175-.25.237-.375l.033-.066a.68.68 0 0 0-.02-.64c-.034-.069-.65-1.555-.715-1.711-.158-.377-.366-.552-.655-.552-.027 0 0 0-.112.005-.137.005-.883.104-1.213.311-.35.22-.94.924-.94 2.16 0 1.112.705 2.162 1.008 2.561l.041.06c1.161 1.695 2.608 2.951 4.074 3.537 1.412.564 2.081.63 2.461.63.16 0 .288-.013.4-.024l.072-.007c.488-.043 1.56-.599 1.804-1.276.192-.534.243-1.117.115-1.329-.088-.144-.239-.216-.43-.308Z"
              />
            </svg>

            <span className="sr-only">Open actions menu</span>
          </button>
        </div>
      </section> */}
    </>
  );
};
