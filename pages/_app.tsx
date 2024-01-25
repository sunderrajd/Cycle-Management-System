import { createContext, useContext, useEffect, useState } from 'react'
import type { AppProps } from 'next/app'
import { Roboto } from 'next/font/google'
import { getAuth, User } from 'firebase/auth'

import { onAuthStateChanged } from '@firebase/auth'

import { getUser } from '../firebase/firestore'
import UserInterface from '../interfaces/User'

import '../styles/globals.css'

// If loading a variable font, you don't need to specify the font weight
const roboto = Roboto({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  weight: ['300', '400', '500', '700', '900'],
})
const auth = getAuth()
const Context = createContext<{ rawUser?: User | null; user?: UserInterface | null }>({})
export function useUser() {
  return useContext(Context)
}
function MyApp({ Component, pageProps }: AppProps) {
  const [rawUser, setRawUser] = useState<User | null>()
  const [user, setUser] = useState<UserInterface | null>()
  console.log(rawUser)
  useEffect(() => {
    onAuthStateChanged(auth, (_user) => {
      if (_user) {
        setRawUser(_user)
        getUser(_user.email || '').then((res) => {
          setUser(res)
        })
      } else {
        setRawUser(null)
        setUser(null)
      }
    })
  }, [])
  return (
    <div className={roboto.className}>
      <Context.Provider value={{ user, rawUser }}>
        <Component {...pageProps} />
      </Context.Provider>
    </div>
  )
}

export default MyApp
