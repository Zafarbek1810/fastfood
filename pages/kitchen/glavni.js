import Head from 'next/head'
import Kitchen from '../../src/Components/Pages/Kitchen'

export default function Home() {
  return (
    <>
      <Head>
        <title>Kassa</title>
        <meta name="description" content="FastFood" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Kitchen/>
    </>
  )
}
