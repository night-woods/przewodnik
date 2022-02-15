import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'jan.kowalski@email.pl',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        // POST /auth/login
        // const response = await fetch('http://localhost:3001/api/v1/login', {
        //   method: 'POST',
        //   body: JSON.stringify(credentials),
        // })
        // const token = ...
        // const response2 = await fetch('http://localhost:3001/api/v1/users/me', {
        //   method: 'GET',
        //   headers: { 'Authorization': `Bearer ${token}`}
        // })

        const user = {
          id: 1,
          name: 'Jan Kowalski',
          email: 'jan.kowalski@email.pl',
        }

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
})
