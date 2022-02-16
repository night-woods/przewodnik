import type { NextPage } from 'next'
import Head from 'next/head'
import Layout from '../components/Layout/Layout'
import useTranslation from 'next-translate/useTranslation'

const Home: NextPage = () => {
  const { t } = useTranslation()

  return (
    <>
      <Head>
        <title>
          {t('locations:locationsTitle')} | {t('global:webpageTitle')}
        </title>
        <meta
          name="description"
          content="Aplikacja do zarządzania przewodnikiem"
        />
      </Head>

      <Layout title={t('locations:locationsTitle')}>
        <div>Dodawanie i przeglądanie placówek</div>
      </Layout>
    </>
  )
}

export default Home
