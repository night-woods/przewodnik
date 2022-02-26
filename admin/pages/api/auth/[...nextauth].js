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
      async authorize(credentials) {
        // Add logic here to look up the user from the credentials supplied
        // POST /auth/login
        const tokenResponse = await fetch(
          'http://localhost:3001/api/v1/auth/login',
          {
            method: 'POST',
            body: JSON.stringify(credentials),
          },
        )
        const token = await tokenResponse.json()

        // const userResponse = await fetch('http://localhost:3001/api/v1/users/me', {
        //   method: 'GET',
        //   headers: { Authorization: `Bearer ${token}` },
        // })

        const user = {
          id: 1,
          name: 'Jan Kowalski',
          email: 'jan.kowalski@email.pl',
        }

        if (user) {
          return user
        }
        return null
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id
      }
      return token
    },
    session: ({ session, token }) => {
      if (token) {
        session.id = token.id
      }
      return session
    },
  },
})
