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
          {t('home:homeTitle')} | {t('global:webpageTitle')}
        </title>
        <meta
          name="description"
          content="Aplikacja do zarządzania przewodnikiem"
        />
      </Head>

      <Layout title={t('home:homeTitle')}>
        <div>Strona główna</div>
      </Layout>
    </>
  )
}

export default Home
