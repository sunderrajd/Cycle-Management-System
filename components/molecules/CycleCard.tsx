import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import Cycle from '../../interfaces/Cycle'

const CycleCard = ({ cycle }: { cycle: Cycle }) => {
  const [hovering, setHovering] = useState(false)
  if (!cycle) return null
  return (
    <div
      className={'group overflow-hidden rounded-[10px]  shadow-md shadow-[#F5F5F5] drop-shadow-sm'}
    >
      <Link
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        href={'/cycle/' + cycle.id}
        className="my-4  shadow-xl hover:text-white"
      >
        <>
          <div
            className={
              'flex h-[263px] items-center justify-center overflow-hidden bg-[#f9f9f9] text-center '
            }
          >
            <Image
              className="w-full  object-cover transition-all duration-500  ease-out group-hover:scale-105"
              src={cycle.image || ''}
              width={390}
              height={263}
              alt="car"
            />
          </div>

          <div className={'px-7 py-4 hover:text-white ' + (hovering ? 'bg-[#FFC300]' : '')}>
            <div className="flex flex-col ">
              <div
                className={
                  'text-base font-semibold capitalize ' +
                  (hovering ? 'text-white' : 'text-[#8A8A8A]')
                }
              >
                {cycle.title}
              </div>
              <div className="text-xl font-semibold">{cycle.model}</div>
            </div>
            <span className="flex justify-center">
              <hr
                className={
                  'my-3 h-px w-[100%] border-0 ' + (hovering ? 'bg-white' : 'bg-gray-200 ')
                }
              />
            </span>

            <div className="flex justify-end ">
              <div>
                <span className="text-base font-semibold">₹ {cycle.price}</span>
                <span
                  className={
                    'align-bottom text-xs ' + (hovering ? 'text-white' : 'text-[#8A8A8A] ')
                  }
                >
                  /slot
                </span>
              </div>
            </div>
          </div>
        </>
      </Link>
    </div>
  )
}

export default CycleCard
