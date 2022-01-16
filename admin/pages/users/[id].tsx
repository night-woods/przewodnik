import axios from '../../lib/axiosApi'
import type { InferGetServerSidePropsType } from 'next'
import { AxiosError } from 'axios'
import Router from 'next/router'
import Head from 'next/head'
import Layout from '../../components/Layout/Layout'
import ApiResponse from '../../interfaces/ApiResponse.interface'
import User from '../../interfaces/User.interface'
import UserForm from '../../components/UserForm'
import { BaseContext } from 'next/dist/shared/lib/utils'

export const getServerSideProps = async (context: BaseContext) => {
  const userId = context.query.id
  console.log(context)

  const res = await axios.get<ApiResponse<User>>(
    `/api/v1/users/${userId}`,
  )

  return {
    props: res.data,
  }
}

export const handleSubmit = async (event: any) => {
  event.preventDefault()
  
  const id = event.target.id.value
  const name = event.target.name.value
  const surname = event.target.surname.value
  const email = event.target.email.value
  const password = event.target.password.value

  const res = await axios.patch(
    `/api/v1/users/${id}`,
    JSON.stringify({
      "name": name,
      "surname": surname,
      "email": email,
      "password": password
    })
  ).then((data: ApiResponse<User>) => {
    Router.push("/users")
  }).catch((error: AxiosError) => {
    const errorResponse = error.response?.data
    console.log(errorResponse)
  })
}

export const UpdateUser = ({
  data: user
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <Head>
        <title>Edytuj użytkownika</title>
      </Head>

      <Layout title="Edytuj użytkownika">
        <div className="flex flex-row justify-center">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 lg:w-1/2 w-full">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <UserForm user={user} handleSubmit={handleSubmit}/>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default UpdateUser