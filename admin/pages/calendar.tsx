import type { NextPage } from 'next'
import Head from 'next/head'
import Layout from '../components/Layout/Layout'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Kalendarz | Przewodnik</title>
        <meta
          name="description"
          content="Aplikacja do zarządzania przewodnikiem"
        />
      </Head>

      <Layout title="Kalendarz">
        <div>Podgląd i filtrowanie kalendarza</div>
      </Layout>
    </>
  )
}

export default Home
