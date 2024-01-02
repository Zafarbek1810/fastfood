import Head from "next/head";
import DashboardLayout from "../../src/Components/DashLayout";
import AddCategory from "../../src/Components/Pages/Admin/AddCategory";

export default function Home() {
  return (
    <>
      <Head>
        <title>Menyu qo'shish</title>
        <meta name="description" content="FastFood" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DashboardLayout>
        <AddCategory />
      </DashboardLayout>
    </>
  );
}
