import axios from 'axios'
import type { InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import Layout from '../components/Layout/Layout'
import useTranslation from 'next-translate/useTranslation'

interface ApiResponse<T> {
  data: T
}

interface User {
  name: string
  surname: string
  email: string
  id: number
}

export const getServerSideProps = async () => {
  const res = await axios.get<ApiResponse<User[]>>(
    'http://localhost:3001/api/v1/users',
  )

  return {
    props: res.data,
  }
}

const Home = ({
  data: users,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { t } = useTranslation()

  return (
    <>
      <Head>
        <title>
          {t('users:usersTitle')} | {t('global:webpageTitle')}
        </title>
        <meta
          name="description"
          content="Aplikacja do zarządzania przewodnikiem"
        />
      </Head>

      <Layout title={t('users:usersTitle')}>
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {t('users:userFirstName')}
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {t('users:userLastName')}
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {t('users:userEmail')}
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, userIdx) => (
                      <tr
                        key={user.email}
                        className={
                          userIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                        }
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {user.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.surname}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <a
                            href="#"
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Edit
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default Home
