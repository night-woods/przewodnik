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
        const tokenResponse = await fetch(
          'http://localhost:3001/api/v1/auth/login',
          {
            method: 'POST',
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
            headers: { 'content-type': 'application/json' },
          },
        )
        const { access_token } = await tokenResponse.json()

        const userResponse = await fetch(
          'http://localhost:3001/api/v1/users/me',
          {
            method: 'GET',
            headers: { Authorization: `Bearer ${access_token}` },
          },
        )

        const user = await userResponse.json()

        if (user) {
          return {
            email: user.email,
            name: `${user.firstName} ${user.lastName}`,
          }
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
