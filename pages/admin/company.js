import Head from "next/head";
import DashboardLayout from "../../src/Components/DashLayout";
import Company from "../../src/Components/Pages/Admin/Company";

export default function Home() {
  return (
    <>
      <Head>
        <title>Company qo'shish</title>
        <meta name="description" content="FastFood" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DashboardLayout>
        <Company />
      </DashboardLayout>
    </>
  );
}
