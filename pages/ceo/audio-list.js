import Head from 'next/head'
import DashboardLayout from '../../src/Components/DashLayout'
import ListAudios from '../../src/Components/Pages/Ceo/Audio/List'

export default function Home() {
  return (
    <>
      <Head>
        <title>Audio ro'yhati</title>
        <meta name="description" content="FastFood" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DashboardLayout>
      <ListAudios/>
      </DashboardLayout>
    </>
  )
}
