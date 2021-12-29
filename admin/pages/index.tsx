import type { NextPage } from 'next'
import Head from 'next/head'
import Layout from '../components/Layout/Layout'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Home | Przewodnik</title>
        <meta
          name="description"
          content="Aplikacja do zarządzania przewodnikiem"
        />
      </Head>

      <Layout title="Home">
        <div>Strona główna</div>
      </Layout>
    </>
  )
}

export default Home
