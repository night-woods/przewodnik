import type { NextPage } from 'next'
import Head from 'next/head'
import Layout from '../components/Layout/Layout'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Użytkownicy | Przewodnik</title>
        <meta
          name="description"
          content="Aplikacja do zarządzania przewodnikiem"
        />
      </Head>

      <Layout title="Użytkownicy">
        <div>Lista użytkowników</div>
      </Layout>
    </>
  )
}

export default Home
