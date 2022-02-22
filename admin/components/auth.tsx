import { signIn, useSession } from 'next-auth/react'
import React from 'react'

interface Props {}

export const Auth: React.FC<Props> = ({ children }) => {
  const { data: session, status } = useSession()

  React.useEffect(() => {
    if (status === 'loading') return
    if (!session) signIn()
  }, [session, status])

  if (session) {
    return <>{children}</>
  }

  return <div>Loading...</div>
}
