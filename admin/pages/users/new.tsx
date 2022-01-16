import axios from '../../lib/axiosApi'
import { AxiosError } from 'axios'
import Router from 'next/router'
import Head from 'next/head'
import Layout from '../../components/Layout/Layout'
import ApiResponse from '../../interfaces/ApiResponse.interface'
import User from '../../interfaces/User.interface'
import UserForm from '../../components/UserForm'


export const handleSubmit = async (event: any) => {
  event.preventDefault()
  
  const name = event.target.name.value
  const surname = event.target.surname.value
  const email = event.target.email.value
  const password = event.target.password.value

  const res = await axios.post(
    "/api/v1/users",
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

const AddUser = () => {
    const emptyUser: User = {
      id: 0,
      name: "",
      surname: "",
      email: "",
      password: ""
    }

  return (
    <>
      <Head>
        <title>Dodaj użytkownika</title>
      </Head>

      <Layout title="Dodaj użytkownika">
        <div className="flex flex-row justify-center">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 lg:w-1/2 w-full">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <UserForm user={emptyUser} handleSubmit={handleSubmit}/>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default AddUser
