import Head from "next/head";
import DashboardLayout from "../../src/Components/DashLayout";
import AddPrice from "../../src/Components/Pages/Admin/AddPrice";

export default function Home() {
  return (
    <>
      <Head>
        <title>Menyu narxlarini qo'shish</title>
        <meta name="description" content="FastFood" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DashboardLayout>
        <AddPrice />
      </DashboardLayout>
    </>
  );
}
