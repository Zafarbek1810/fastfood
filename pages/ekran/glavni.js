import Head from 'next/head'
import EkranMain from '../../src/Components/Pages/Ekran'

export default function Home() {
  return (
    <>
      <Head>
        <title>Ekran</title>
        <meta name="description" content="FastFood" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <EkranMain/>
    </>
  )
}
