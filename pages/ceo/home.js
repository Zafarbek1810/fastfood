import Head from 'next/head'
import DashboardLayout from '../../src/Components/DashLayout'
import VideoAdd from '../../src/Components/Pages/Ceo/VideoAdd'

export default function Home() {
  return (
    <>
      <Head>
        <title>Video qo'shish</title>
        <meta name="description" content="FastFood" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DashboardLayout>
      <VideoAdd/>
      </DashboardLayout>
    </>
  )
}
