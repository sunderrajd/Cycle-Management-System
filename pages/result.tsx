import { useEffect, useState } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { getAuth, onAuthStateChanged, User } from 'firebase/auth'
import useSWR from 'swr'

import { createBooking } from '../firebase/firestore'
import Booking from '../interfaces/Booking'
const auth = getAuth()
const fetcher = (url: string) => fetch(url).then((res) => res.json())
const ResultPage: NextPage = () => {
  const router = useRouter()

  // Fetch CheckoutSession from static page via
  // https://nextjs.org/docs/basic-features/data-fetching#static-generation
  const { data, error } = useSWR(
    router.query.session_id ? `/api/verify-stripe/${router.query.session_id}` : null,
    fetcher
  )
  if (data && data.status === 'complete') {
    createBooking(data.metadata as Booking).then(() => {
      router.push('/account')
    })
  }
  return <div>Verifying</div>
}

export default ResultPage
