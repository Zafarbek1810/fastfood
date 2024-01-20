import Head from 'next/head'
import KassaMain from '../../src/Components/Pages/Kassa'

export default function Home() {
  return (
    <>
      <Head>
        <title>Kassa</title>
        <meta name="description" content="FastFood" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <KassaMain/>
    </>
  )
}
