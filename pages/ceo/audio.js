import Head from 'next/head'
import DashboardLayout from '../../src/Components/DashLayout'
import AudioWrap from '../../src/Components/Pages/Ceo/Audio'

export default function Home() {
  return (
    <>
      <Head>
        <title>Audio qo'shish</title>
        <meta name="description" content="FastFood" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DashboardLayout>
      <AudioWrap/>
      </DashboardLayout>
    </>
  )
}
