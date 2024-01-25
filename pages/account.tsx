import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'

import Button from '../components/atoms/Button'
import Container from '../components/atoms/Container'
import SEO from '../components/atoms/Seo'
import Wrapper from '../components/atoms/Wrapper'
import BookingCard from '../components/molecules/BookingCard'
import CycleCard from '../components/molecules/CycleCard'
import Layout from '../components/organisms/Layout'
import { logOut, signInGoogle } from '../firebase/auth'
import { getClientBookings, getCycles, getHostBookings, getUserCycles } from '../firebase/firestore'
import Booking from '../interfaces/Booking'
import Cycle from '../interfaces/Cycle'

import { useUser } from './_app'

export default function Account() {
  const { rawUser } = useUser()
  const router = useRouter()
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [bookingsByMe, setBookingsByMe] = useState<Booking[]>([])
  const [bookingsForMe, setBookingsForMe] = useState<Booking[]>([])
  useEffect(() => {
    if (rawUser === null) {
      signInGoogle()
    }
    if (rawUser) {
      getClientBookings(rawUser.email || '').then(setBookingsByMe)
      getHostBookings(rawUser.email || '').then(setBookingsForMe)
      getUserCycles(rawUser.email || '').then(setCycles)
    }
  }, [rawUser])
  const moneyEarned = bookingsForMe.reduce((acc, prev) => acc + (prev.price || 0), 0)
  const moneySpent = bookingsByMe.reduce((acc, prev) => acc + (prev.price || 0), 0)

  if (!rawUser) return null
  return (
    <Layout>
      <SEO title={rawUser?.displayName || 'Account'} />
      <Wrapper>
        <Container className={'my-20 flex flex-wrap gap-10 px-5 md:flex-nowrap'}>
          <div className={'mx-auto w-full flex-shrink-0 md:mx-0 md:w-[250px]'}>
            <div className={'w-full  rounded-lg px-10 py-8 shadow-lg'}>
              <div className={'mb-5 w-full overflow-hidden rounded-full border border-p1'}>
                <Image
                  width={300}
                  height={300}
                  src={rawUser?.photoURL || ''}
                  alt={rawUser?.displayName || 'user profile photo'}
                />
              </div>
              <div className={'text-center text-xl font-semibold'}>{rawUser?.displayName}</div>
              <div className={'mb-4 text-center text-sm italic'}>{rawUser?.email}</div>

              <div className={'mt-10 grid grid-cols-2 gap-2 text-lg'}>
                <b>Earned:</b> <i>₹{moneyEarned}</i>
                <b>Spent:</b> <i>₹{moneySpent}</i>
              </div>
              <Button
                className={'mx-auto mt-6'}
                onClick={() => logOut().then(() => router.push('/'))}
                width={100}
                height={40}
                id={'logout'}
              >
                Sign Out
              </Button>
            </div>
          </div>
          <div
            className={
              'mx-auto w-full flex-grow rounded-lg bg-white p-10 shadow-lg md:mx-0 md:w-auto'
            }
          >
            <div className={'mb-10'}>
              <div className={'mb-5 text-2xl font-bold'}>My Cycles</div>
              <div className={'flex grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3 '}>
                {cycles.map((cycle) => (
                  <CycleCard cycle={cycle} key={cycle.id} />
                ))}
              </div>
              {!cycles.length && <div className={'text-center italic'}>No Cycles Added</div>}
            </div>
            <div className={'mb-10'}>
              <div className={'mb-5 text-2xl font-bold'}>My Cycles Booked</div>
              <div className={'flex grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3'}>
                {bookingsForMe.map((booking) => (
                  <BookingCard booking={booking} key={booking.id} />
                ))}
              </div>
              {!bookingsForMe.length && <div className={'text-center italic'}>No Bookings</div>}
            </div>
            <div className={'mb-10'}>
              <div className={'mb-5 text-2xl font-bold'}>Cycles I Booked</div>
              <div className={'flex grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3 '}>
                {bookingsByMe.map((booking) => (
                  <BookingCard booking={booking} key={booking.id} />
                ))}
              </div>
              {!bookingsByMe.length && <div className={'text-center italic'}>No Bookings</div>}
            </div>
          </div>
        </Container>
      </Wrapper>
    </Layout>
  )
}
