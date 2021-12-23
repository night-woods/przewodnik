import type { NextPage } from 'next'
import Head from 'next/head'
import Layout from '../components/Layout/Layout'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Placówki | Przewodnik</title>
        <meta
          name="description"
          content="Aplikacja do zarządzania przewodnikiem"
        />
      </Head>

      <Layout title="Placówki">
        <div>Dodawanie i przeglądanie placówek</div>
      </Layout>
    </>
  )
}

export default Home
