import { GetServerSideProps } from 'next'
import { useForm } from 'react-hook-form'
import { v4 } from 'uuid'

import Button from '../../components/atoms/Button'
import Input from '../../components/atoms/Input'
import Layout from '../../components/organisms/Layout'
import { signInGoogle } from '../../firebase/auth'
import { getClientBookings, getCycle, getCycleBookings } from '../../firebase/firestore'
import Booking from '../../interfaces/Booking'
import Cycle from '../../interfaces/Cycle'
import { useUser } from '../../pages/_app'
import getStripe from '../../stripe'

export { default } from '../rent'
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const cycle = await getCycle(params?.cycle?.toString())
  return {
    props: { cycle },
  }
}
