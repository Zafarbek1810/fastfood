import Head from 'next/head'
import DashboardLayout from '../../src/Components/DashLayout'

export default function Home() {
  return (
    <>
      <Head>
        <title>Statistika</title>
        <meta name="description" content="FastFood" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DashboardLayout>
      statistika
      </DashboardLayout>
    </>
  )
}
