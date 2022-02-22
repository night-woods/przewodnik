import { getCsrfToken } from 'next-auth/react'
import useTranslation from 'next-translate/useTranslation'

export default function SignIn({ csrfToken }: any) {
  const { t } = useTranslation()

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {t('signin:signInToGuide')}
          </h1>
        </div>
        <form
          className="mt-8 space-y-6"
          method="post"
          action="/api/auth/callback/credentials"
        >
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md">
            <div>
              <label htmlFor="email-address" className="sr-only">
                {t('signin:emailAddress')}
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                className="appearance-none rounded relative block w-full px-3 py-2 my-1 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder={t('signin:emailAddress')}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                {t('signin:password')}
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded relative block w-full px-3 py-2 my-1 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder={t('signin:password')}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              {t('signin:signIn')}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export async function getServerSideProps(context: object) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  }
}
