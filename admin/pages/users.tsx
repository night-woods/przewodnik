import axios from '../lib/axiosApi'
import type { InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import Layout from '../components/Layout/Layout'
import { UserAddIcon } from '@heroicons/react/outline'
import ApiResponse from '../interfaces/ApiResponse.interface'
import User from '../interfaces/User.interface'
import Router from 'next/router'

export const getServerSideProps = async () => {
  const res = await axios.get<ApiResponse<User[]>>(
    '/api/v1/users',
  )

  return {
    props: res.data,
  }
}

const handleDelete = async (id: number) => {
  await axios.delete(`/api/v1/users/${id}`).then(() => {
    Router.reload()
  })
}

const Home = ({
  data: users,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
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
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <a href="/users/new" className="block flex justify-center w-40 border-2 space-x-1 my-3 p-2">
                <UserAddIcon className="h-5 w-5"/><span>Add user</span>
              </a>
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Imię
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Nazwisko
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Email
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
                          <div className="flex space-x-4">
                            <button
                              className="text-indigo-600 hover:text-indigo-900"
                              onClick={() => Router.push(`/users/${user.id}`)}
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(user.id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              Delete
                            </button>
                          </div>
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
