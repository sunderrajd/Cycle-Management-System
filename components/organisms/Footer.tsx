import Image from 'next/image'
import Link from 'next/link'

import Container from '../atoms/Container'
import Wrapper from '../atoms/Wrapper'
const ROUTES = [
  {
    title: 'Home',
    slug: '/',
  },
  {
    title: 'Listings',
    slug: '/listings',
  },
]
export default function Footer() {
  return (
    <Wrapper className={'bg-black'}>
      <Container className={'grid grid-cols-1 gap-8 py-10  px-2 text-white md:grid-cols-3'}>
        <div>
          <Link href={'/'} className={'flex items-center justify-center gap-3 md:justify-start'}>
            <div className={'h-12 w-12'}>
              <Image width={300} height={300} src={'/logo.png'} alt={'cycle management system'} />
            </div>
            <div
              className={'text-1.5xl text-center font-bold hover:text-purple-900'}
              style={{ color: '#F5C300' }}
            >
              Cycle Management System
            </div>
          </Link>
        </div>
        <div className={'flex flex-col gap-4 text-center md:text-left'}>
          <div className={'text-xl font-semibold'}>Pages</div>
          <div>
            {ROUTES.map((route) => (
              <div key={route.slug}>
                <Link href={route.slug}>{route.title}</Link>
              </div>
            ))}
          </div>
        </div>
        <div className={'flex flex-col gap-4 text-center md:text-left'}>
          <div className={'text-xl font-semibold'}>Get in touch</div>
          <div className={'mx-auto flex  gap-4 md:mx-0'}>
            <div>Email</div>
            <div>lci2020012@iiitl.ac.in</div>
          </div>
          <div className={'mx-auto flex gap-4 md:mx-0'}>
            <div>Phone</div>
            <div>+919456679268</div>
          </div>
        </div>
      </Container>
    </Wrapper>
  )
}
