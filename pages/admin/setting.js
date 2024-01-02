import Head from 'next/head'
import DashboardLayout from '../../src/Components/DashLayout'

export default function Home() {
  return (
    <>
      <Head>
        <title>Sozlamalar</title>
        <meta name="description" content="FastFood" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DashboardLayout>
      setting
      </DashboardLayout>
    </>
  )
}
