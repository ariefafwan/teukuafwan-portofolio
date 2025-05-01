export const CardExperience = ({ data }) => {
  return (
    <>
      <div className="flex items-start gap-2.5">
        <img className="w-8 h-8 rounded-full" src={"/mui.jpeg"} alt="Bonnie Green image" />
        <div className="flex flex-col gap-1">
          <div className="flex flex-col w-full max-w-[326px] leading-1.5 p-4 border-gray-200 bg-gray-100 shadow-lg rounded-e-xl rounded-es-xl">
            <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
              <span className="text-sm font-semibold text-gray-900">Developer System Virtual Expo Kongres Ekonomi Umat II MUI</span>
              <span className="text-xs font-normal text-gray-500">Freelance</span>
            </div>
            <span className="text-xs text-gray-500 mb-1">Desember 2021</span>
            <p className="text-sm font-normal text-gray-900">
              Involved in developing the Virtual Expo system for the Kongres Ekonomi Umat II MUI, responsible for technical development and ensuring smooth platform performance during the event.
            </p>
            <div className="grid gap-2 grid-rows-2 my-2.5">
              <div className="group relative">
                <img src={"/expo mui.jpg"} className="rounded-lg h-40" />
              </div>
              <div className="group relative">
                <img src={"/sertifmui.jpg"} className="rounded-lg h-40 mx-auto" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-start gap-2.5">
        <img className="w-8 h-8 rounded-full" src={"/SDM.jpeg"} alt="Bonnie Green image" />
        <div className="flex flex-col gap-1">
          <div className="flex flex-col w-full max-w-[326px] leading-1.5 p-4 border-gray-200 bg-gray-100 shadow-lg rounded-e-xl rounded-es-xl">
            <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
              <span className="text-sm font-semibold text-gray-900">Junior Programmer at PT Solusi Data Madani</span>
              <span className="text-xs font-normal text-gray-500">Full Time</span>
            </div>
            <span className="text-xs text-gray-500 mb-1">Auguts 2023 - Febuary 2024</span>
            <p className="text-sm font-normal text-gray-900">
              Contributing to the development of various applications (Website and Mobile) such as{" "}
              <a className="text-blue-600" href="https://www.digidesa.com/id/" target="_blank">
                Digidesa
              </a>
              , Progrity, and other UMKM-related applications.
            </p>
            <div className="grid gap-4 my-2.5">
              <div className="group relative">
                <img src={"/sdm2.jpg"} className="rounded-lg" />
              </div>
              <div className="group relative">
                <img src={"/sdm3.jpg"} className="rounded-lg" />
              </div>
              <div className="group relative">
                <img src={"/sdm4.jpg"} className="rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-start gap-2.5">
        <img className="w-8 h-8 rounded-full" src={"/logo-kominfo.png"} alt="Bonnie Green image" />
        <div className="flex flex-col gap-1">
          <div className="flex flex-col w-full max-w-[326px] leading-1.5 p-4 border-gray-200 bg-gray-100 shadow-lg rounded-e-xl rounded-es-xl">
            <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
              <span className="text-sm font-semibold text-gray-900">Data Science Competition 2024: From Data to Decisions By Digitalent TSA KOMINFO & Starcore.id</span>
              <span className="text-sm font-normal text-gray-500">2nd place winner</span>
            </div>
            <span className="text-xs text-gray-500 mb-1">September 2024 - November 2024</span>
            <p className="text-sm font-normal text-gray-900">Achieved 2nd place in the a nationwide competition participated by institutions across Indonesia, both educational and non-educational.</p>
            <div className="grid gap-4 grid-cols-2 my-2.5">
              <div className="group relative">
                <img src={"/data1.jpg"} className="rounded-lg" />
              </div>
              <div className="group relative">
                <img src={"/data2.jpg"} className="rounded-lg" />
              </div>
              <div className="group relative col-span-2">
                <img src={"/data4.jpg"} className="rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
