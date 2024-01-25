import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import ReactSlider from 'react-slider'

import { Menu } from '@headlessui/react'
import { Icon } from '@iconify/react'

import Button from '../components/atoms/Button'
import Container from '../components/atoms/Container'
import SEO from '../components/atoms/Seo'
import Wrapper from '../components/atoms/Wrapper'
import CycleCard from '../components/molecules/CycleCard'
import Layout from '../components/organisms/Layout'
import { getCycles } from '../firebase/firestore'
import Cycle from '../interfaces/Cycle'
interface PageProps {
  cycles: Cycle[]
}
const PRODUCTS_TO_SHOW_PER_PAGE = 9
export default function ProductType({ cycles }: PageProps) {
  const [currentindex, setCurrent] = useState(0)

  const transmission_types = ['gearless', 'gear']
  const [minValue, setMinValue] = useState(0)
  const [_minValue, _setMinValue] = useState(10)
  const [maxValue, setMaxValue] = useState(99999999)
  const [_maxValue, _setMaxValue] = useState(1000)
  const [selectedTransmission, setSelectedTransmission] = useState<string>()
  const [isOpen, setIsOpen] = useState(false)

  const filteredProducts = cycles.filter((cycle) => {
    if (selectedTransmission && transmission_types[cycle?.gear ? 1 : 0] !== selectedTransmission)
      return false
    if ((cycle?.price || 0) < minValue) return false
    if ((cycle?.price || 0) > maxValue) return false
    return true
  })
  const numberofpages = filteredProducts.length / 9
  const pages = []
  for (let i = 0; i < numberofpages; i++) {
    pages.push({
      index: i + 1,
    })
  }
  const [activepage, setActivePage] = useState(0)
  let lenghtofproducts = filteredProducts.length
  const prev = () => {
    window.scrollTo(0, 0)

    if (currentindex >= PRODUCTS_TO_SHOW_PER_PAGE) {
      setCurrent(currentindex - PRODUCTS_TO_SHOW_PER_PAGE)
      setActivePage(activepage - 1)
    }
  }
  const next = () => {
    window.scrollTo(0, 0)
    if (currentindex - PRODUCTS_TO_SHOW_PER_PAGE < lenghtofproducts) {
      setCurrent(currentindex + PRODUCTS_TO_SHOW_PER_PAGE)
      setActivePage(activepage + 1)
      if (currentindex + PRODUCTS_TO_SHOW_PER_PAGE > lenghtofproducts - 1) {
        setCurrent(0)
        setActivePage(0)
      }
    }
  }
  return (
    <Layout>
      <SEO title={'Cycles Listing'} />
      <Wrapper>
        <Container>
          <div className="pt-[100px] pb-20">
            <h1 className="mb-3 text-[49px] font-bold">Cycles</h1>
            <div className="font-inter max-w-[610px] text-[#8a8a8a]">
              Cycles take or give but see this
            </div>
          </div>

          <div className="my-10 flex flex-row justify-between gap-3 lg:flex-row">
            <h1 className="mt-2">
              {
                <Link className="underline underline-offset-4" href="/">
                  Home
                </Link>
              }{' '}
              /{' '}
              {
                <Link className="underline underline-offset-4" href="/cycles">
                  Cycles
                </Link>
              }
            </h1>

            <div className="flex sm:hidden">
              <svg
                onClick={() => setIsOpen(!isOpen)}
                width="94"
                height="36"
                viewBox="0 0 94 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="94" height="36" rx="4" fill="#222222" />
                <rect x="15" y="13" width="15" height="2" rx="1" fill="white" />
                <rect x="17" y="17" width="11" height="2" rx="1" fill="white" />
                <rect x="19" y="21" width="7" height="2" rx="1" fill="white" />
                <path
                  d="M41.4112 24V12.3636H48.6271V13.875H43.1669V17.4205H48.1101V18.9261H43.1669V24H41.4112ZM50.6499 24V15.2727H52.3487V24H50.6499ZM51.5078 13.9261C51.2124 13.9261 50.9586 13.8277 50.7464 13.6307C50.5381 13.4299 50.4339 13.1913 50.4339 12.9148C50.4339 12.6345 50.5381 12.3958 50.7464 12.1989C50.9586 11.9981 51.2124 11.8977 51.5078 11.8977C51.8033 11.8977 52.0552 11.9981 52.2635 12.1989C52.4756 12.3958 52.5817 12.6345 52.5817 12.9148C52.5817 13.1913 52.4756 13.4299 52.2635 13.6307C52.0552 13.8277 51.8033 13.9261 51.5078 13.9261ZM56.3331 12.3636V24H54.6342V12.3636H56.3331ZM62.6925 15.2727V16.6364H57.9254V15.2727H62.6925ZM59.2038 13.1818H60.9027V21.4375C60.9027 21.767 60.9519 22.0152 61.0504 22.1818C61.1489 22.3447 61.2758 22.4564 61.4311 22.517C61.5902 22.5739 61.7625 22.6023 61.9482 22.6023C62.0845 22.6023 62.2038 22.5928 62.3061 22.5739C62.4084 22.5549 62.4879 22.5398 62.5447 22.5284L62.8516 23.9318C62.7531 23.9697 62.6129 24.0076 62.4311 24.0455C62.2493 24.0871 62.022 24.1098 61.7493 24.1136C61.3023 24.1212 60.8857 24.0417 60.4993 23.875C60.1129 23.7083 59.8004 23.4508 59.5618 23.1023C59.3232 22.7538 59.2038 22.3163 59.2038 21.7898V13.1818ZM68.2393 24.1761C67.3795 24.1761 66.639 23.9924 66.0178 23.625C65.4003 23.2538 64.9231 22.733 64.5859 22.0625C64.2526 21.3883 64.0859 20.5985 64.0859 19.6932C64.0859 18.7992 64.2526 18.0114 64.5859 17.3295C64.9231 16.6477 65.3928 16.1155 65.995 15.733C66.6011 15.3504 67.3094 15.1591 68.12 15.1591C68.6125 15.1591 69.0897 15.2405 69.5518 15.4034C70.014 15.5663 70.4287 15.822 70.7962 16.1705C71.1636 16.5189 71.4534 16.9716 71.6655 17.5284C71.8776 18.0814 71.9837 18.7538 71.9837 19.5455V20.1477H65.0462V18.875H70.3189C70.3189 18.428 70.228 18.0322 70.0462 17.6875C69.8643 17.339 69.6087 17.0644 69.2791 16.8636C68.9534 16.6629 68.5708 16.5625 68.1314 16.5625C67.6541 16.5625 67.2375 16.6799 66.8814 16.9148C66.5291 17.1458 66.2564 17.4489 66.0632 17.8239C65.8738 18.1951 65.7791 18.5985 65.7791 19.0341V20.0284C65.7791 20.6117 65.8814 21.108 66.0859 21.517C66.2943 21.9261 66.584 22.2386 66.9553 22.4545C67.3265 22.6667 67.7602 22.7727 68.2564 22.7727C68.5784 22.7727 68.8719 22.7273 69.1371 22.6364C69.4022 22.5417 69.6314 22.4015 69.8246 22.2159C70.0178 22.0303 70.1655 21.8011 70.2678 21.5284L71.8757 21.8182C71.7469 22.2917 71.5159 22.7064 71.1825 23.0625C70.853 23.4148 70.4382 23.6894 69.9382 23.8864C69.442 24.0795 68.8757 24.1761 68.2393 24.1761ZM73.8686 24V15.2727H75.5107V16.6591H75.6016C75.7607 16.1894 76.041 15.8201 76.4425 15.5511C76.8478 15.2784 77.3061 15.142 77.8175 15.142C77.9235 15.142 78.0485 15.1458 78.1925 15.1534C78.3402 15.161 78.4557 15.1705 78.5391 15.1818V16.8068C78.4709 16.7879 78.3497 16.767 78.1754 16.7443C78.0012 16.7178 77.8269 16.7045 77.6527 16.7045C77.2512 16.7045 76.8932 16.7898 76.5788 16.9602C76.2682 17.1269 76.022 17.3598 75.8402 17.6591C75.6584 17.9545 75.5675 18.2917 75.5675 18.6705V24H73.8686Z"
                  fill="white"
                />
              </svg>
            </div>

            <div
              className={`fixed top-0 right-0 z-[1000] min-h-full w-full bg-white ${
                isOpen ? 'translate-x-0' : 'translate-x-full'
              } duration-300 ease-in-out`}
            >
              <div className={'z-20  mt-5 flex items-center justify-between pr-3 pl-4'}>
                <div className=" flex items-center">
                  <Link href="/"></Link>
                </div>

                <button className="z-300 text-xl text-black" onClick={() => setIsOpen(!isOpen)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="h-10 w-10"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
              </div>
              <div className="mt-20">
                <Menu as={'div' as any} className="relative m-[20px] flex flex-col rounded-[4px]">
                  <Menu.Button>
                    {({ open }) => (
                      <a
                        className={
                          'flex cursor-pointer items-center justify-between rounded-md bg-neutral-100 px-4 py-2 hover:bg-gray-100' +
                          (open ? 'font-semibold' : '')
                        }
                      >
                        Pricing <Icon icon="tabler:chevron-down" />{' '}
                      </a>
                    )}
                  </Menu.Button>

                  <Menu.Items className="absolute right-0 z-20 mt-[60px] flex w-[275px]  flex-col bg-gray-100 p-4  py-10 drop-shadow-lg ">
                    <ReactSlider
                      className="  bg-blue my-5 text-blue-500 "
                      thumbClassName="bg-blue-600 rounded-full text-blue-600 h-5 w-5 text-[1px] "
                      trackClassName="bg-blue-300 mt-1 rounded-full h-2"
                      thumbActiveClassName="bg-blue-600 rounded-full text-blue-600 h-5 w-5 text-[1px]"
                      defaultValue={[_minValue, _maxValue] as any}
                      ariaLabel={['Lower thumb', 'Upper thumb'] as any}
                      ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
                      renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
                      onChange={(value) => {
                        _setMinValue(value[0]), _setMaxValue(value[1])
                      }}
                      pearling
                      step={10}
                      max={1000}
                      min={10}
                    />
                    <div className="my-4 grid grid-flow-row grid-cols-2 gap-x-3">
                      <div className="rounded-xl border-[2px] border-gray-200 bg-white px-2 py-1">
                        <label htmlFor="minprice" className="text-sm text-gray-600">
                          Min
                        </label>
                        <input className="text-xl " type="text" value={_minValue} disabled />
                      </div>
                      <div className="rounded-xl border-[2px] border-gray-200 bg-white px-2 py-1">
                        <label htmlFor="minprice" className="text-sm text-gray-600">
                          Max
                        </label>
                        <input className="text-xl " type="text" value={_maxValue} disabled />
                      </div>
                    </div>
                    <Menu.Item>
                      <Button
                        onClick={() => {
                          setMinValue(_minValue)
                          setMaxValue(_maxValue)
                        }}
                        variant={'primary'}
                      >
                        Confirm
                      </Button>
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
                <hr />
                <Menu as={'div' as any} className="relative m-[20px] flex flex-col rounded-[4px]">
                  <Menu.Button>
                    {({ open }) => (
                      <a
                        className={
                          'flex cursor-pointer items-center justify-between rounded-md bg-neutral-100 px-4 py-2 hover:bg-gray-100' +
                          (open ? 'font-semibold' : '')
                        }
                      >
                        Transmission <Icon icon="tabler:chevron-down" />{' '}
                      </a>
                    )}
                  </Menu.Button>

                  <Menu.Items className="absolute right-0 z-20 mt-[60px] flex w-[275px] flex-col bg-white  py-2.5 px-2 drop-shadow-lg ">
                    {transmission_types.map((transmission) => (
                      <Menu.Item
                        as={'div' as any}
                        key={transmission}
                        onClick={() => setSelectedTransmission(transmission)}
                        className={
                          'cursor-pointer p-3 capitalize hover:bg-[#2C68F6] hover:text-white'
                        }
                      >
                        {transmission}
                      </Menu.Item>
                    ))}
                  </Menu.Items>
                </Menu>

                <hr />
                <div
                  className={
                    'my-5 mb-4 flex grid grid-cols-1 gap-2 px-8 sm:grid-cols-2 lg:grid-cols-4'
                  }
                >
                  {(minValue !== 0 || maxValue !== 99999999) && (
                    <div
                      onClick={() => {
                        setMinValue(0)
                        setMaxValue(99999999)
                      }}
                      className={
                        'flex h-10 cursor-pointer items-center justify-between  rounded-full bg-green-500 px-4 py-1 capitalize text-white'
                      }
                    >
                      Price Filter: ${minValue}-${maxValue}
                      <span className="justify-self-end">
                        <Icon className="h-10 w-8" icon={'basil:cross-outline'} color={'white'} />
                      </span>
                    </div>
                  )}
                  {selectedTransmission && (
                    <div
                      onClick={() => setSelectedTransmission(undefined)}
                      className={
                        'flex h-10 cursor-pointer items-center justify-between rounded-full bg-blue-500 px-4 py-1 capitalize text-white'
                      }
                    >
                      Transmission Filter: {selectedTransmission}{' '}
                      <span>
                        <Icon className="h-10 w-8" icon={'basil:cross-outline'} color={'white'} />
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-center p-[30px]">
                  <button
                    className="flex h-[49px] w-[335px] flex-row items-center justify-center gap-[10px] rounded-full bg-[#FFC300] px-[20px] py-[15px] text-lg font-semibold leading-relaxed text-white"
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>

            <div className=" hidden items-center space-x-1 md:flex lg:flex">
              <h1 className="mr-2 hidden lg:flex">
                showing {currentindex + 1}-
                {currentindex + PRODUCTS_TO_SHOW_PER_PAGE > lenghtofproducts
                  ? lenghtofproducts
                  : currentindex + PRODUCTS_TO_SHOW_PER_PAGE}{' '}
                of {lenghtofproducts} cars
              </h1>
              <Menu as={'div' as any} className="relative flex flex-col px-1">
                <Menu.Button>
                  {({ open }) => (
                    <a
                      className={
                        'flex cursor-pointer items-center rounded-md bg-neutral-100 px-4 py-2 hover:bg-gray-100' +
                        (open ? 'font-semibold' : '')
                      }
                    >
                      Pricing <Icon icon="tabler:chevron-down" />{' '}
                    </a>
                  )}
                </Menu.Button>

                <Menu.Items className="absolute right-0 z-20 mt-[60px] flex w-[275px]  flex-col bg-gray-100 p-4  py-10 drop-shadow-lg ">
                  <ReactSlider
                    className="  bg-blue my-5 text-blue-500 "
                    thumbClassName="bg-blue-600 rounded-full text-blue-600 h-5 w-5 text-[1px] "
                    trackClassName="bg-blue-300 mt-1 rounded-full h-2"
                    thumbActiveClassName="bg-blue-600 rounded-full text-blue-600 h-5 w-5 text-[1px]"
                    defaultValue={[_minValue, _maxValue] as any}
                    ariaLabel={['Lower thumb', 'Upper thumb'] as any}
                    ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
                    renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
                    onChange={(value) => {
                      _setMinValue(value[0]), _setMaxValue(value[1])
                    }}
                    pearling
                    step={10}
                    max={1000}
                    min={10}
                  />
                  <div className="my-4 grid grid-flow-row grid-cols-2 gap-x-3">
                    <div className="rounded-xl border-[2px] border-gray-200 bg-white px-2 py-1">
                      <label htmlFor="minprice" className="text-sm text-gray-600">
                        Min
                      </label>
                      <input className="text-xl " type="text" value={_minValue} disabled />
                    </div>
                    <div className="rounded-xl border-[2px] border-gray-200 bg-white px-2 py-1">
                      <label htmlFor="minprice" className="text-sm text-gray-600">
                        Max
                      </label>
                      <input className="text-xl " type="text" value={_maxValue} disabled />
                    </div>
                  </div>
                  <Menu.Item>
                    <Button
                      onClick={() => {
                        setMinValue(_minValue)
                        setMaxValue(_maxValue)
                      }}
                      variant={'primary'}
                    >
                      Apply
                    </Button>
                  </Menu.Item>
                </Menu.Items>
              </Menu>

              <Menu as={'div' as any} className="relative flex flex-col px-1">
                <Menu.Button>
                  {({ open }) => (
                    <a
                      className={
                        'flex cursor-pointer items-center rounded-md bg-neutral-100 px-4 py-2 hover:bg-gray-100' +
                        (open ? 'font-semibold' : '')
                      }
                    >
                      Gear <Icon icon="tabler:chevron-down" />{' '}
                    </a>
                  )}
                </Menu.Button>

                <Menu.Items className="absolute right-0 z-20 mt-[60px] flex w-[275px] flex-col bg-white  py-2.5 px-2 drop-shadow-lg ">
                  {transmission_types.map((transmission) => (
                    <Menu.Item
                      as={'div' as any}
                      key={transmission}
                      onClick={() => setSelectedTransmission(transmission)}
                      className={
                        'cursor-pointer p-3 capitalize hover:bg-[#2C68F6] hover:text-white'
                      }
                    >
                      {transmission}
                    </Menu.Item>
                  ))}
                </Menu.Items>
              </Menu>
            </div>
          </div>

          <div className={'mb-4 flex grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4'}>
            {(minValue !== 0 || maxValue !== 99999999) && (
              <div
                onClick={() => {
                  setMinValue(0)
                  setMaxValue(99999999)
                }}
                className={
                  'flex h-10 cursor-pointer items-center justify-between  rounded-full bg-green-500 px-4 py-1 capitalize text-white'
                }
              >
                Price Filter: ${minValue}-${maxValue}
                <span className="justify-self-end">
                  <Icon className="h-10 w-8" icon={'basil:cross-outline'} color={'white'} />
                </span>
              </div>
            )}

            {selectedTransmission && (
              <div
                onClick={() => setSelectedTransmission(undefined)}
                className={
                  'flex h-10 cursor-pointer items-center justify-between rounded-full bg-blue-500 px-4 py-1 capitalize text-white'
                }
              >
                Gear: {selectedTransmission}{' '}
                <span>
                  <Icon className="h-10 w-8" icon={'basil:cross-outline'} color={'white'} />
                </span>
              </div>
            )}
          </div>
          <div className="grid grid-flow-row gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts
              .slice(currentindex, currentindex + PRODUCTS_TO_SHOW_PER_PAGE)
              .map((item, index) => (
                <CycleCard key={index} cycle={item} />
              ))}
          </div>
          <div className="my-10 content-center text-center">
            {activepage != 0 ? (
              <button
                className="mx-3 h-8 w-8 rounded-full  border-[1px] border-black "
                onClick={prev}
              >
                &lt;
              </button>
            ) : null}

            {pages.map((item, index) => {
              return (
                <button
                  key={index}
                  onClick={() => {
                    setActivePage(index)
                    setCurrent(index * PRODUCTS_TO_SHOW_PER_PAGE)
                    window.scrollTo(0, 0)
                  }}
                  className={
                    activepage == index
                      ? 'mx-3 h-8 w-8 rounded-full bg-black text-white'
                      : 'mx-3 h-8 w-8 rounded-full  border-[1px] border-black '
                  }
                >
                  {item.index}
                </button>
              )
            })}

            {activepage < numberofpages - 1 && (
              <button
                className="mx-3 h-8 w-8 rounded-full  border-[1px] border-black "
                onClick={next}
              >
                &gt;
              </button>
            )}
          </div>
        </Container>
      </Wrapper>
    </Layout>
  )
}
export async function getServerSideProps() {
  const cycles = await getCycles()

  return {
    props: {
      cycles: cycles.filter((c) => !c.paused),
    },
  }
}
