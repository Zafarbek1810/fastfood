import Head from 'next/head'
import DashboardLayout from '../../src/Components/DashLayout'
import Statistic from '../../src/Components/Pages/Admin/Statistic'

export default function Home() {
  return (
    <>
      <Head>
        <title>Statistika</title>
        <meta name="description" content="FastFood" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DashboardLayout>
      <Statistic/>
      </DashboardLayout>
    </>
  )
}
