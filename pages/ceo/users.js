import Head from 'next/head'
import DashboardLayout from '../../src/Components/DashLayout'
import Users from '../../src/Components/Pages/Ceo/Users'

export default function Home() {
  return (
    <>
      <Head>
        <title>Video qo'shish</title>
        <meta name="description" content="FastFood" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DashboardLayout>
        <Users/>
      </DashboardLayout>
    </>
  )
}
