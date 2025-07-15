import Head from "next/head";
import Footer from "../Footer";
import Navbar from "../Navbar";

export const DefaultLayout = ({ children, profile, title, index }) => {
  return (
    <>
      <Head>
        <title>
          {title} - {profile.nama}
        </title>
      </Head>
      <section className=" bg-gray-100">
        <Navbar index={index} profile={profile}></Navbar>
        {children}
        <Footer profile={profile}></Footer>
      </section>
    </>
  );
};
