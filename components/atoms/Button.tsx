import React from 'react'

const BUTTON_CLASSES = {
  outline:
    'transition-colors duration-200 bg-transparent hover:bg-p1 text-p1 hover:text-white child-text-white border border-p1 hover:border-transparent rounded-xl',
  primary:
    'bg-p1 transition-transform duration-100 ease-in-out hover:bg-p1 hover:scale-110 !text-white rounded-lg',
  secondary: 'bg-[#00B88B] hover:bg-[#00a67d] !text-white rounded-lg',
  light: 'bg-white rounded-lg hover:bg-[#ECECEC]',
}

type PROPS_TYPE = {
  variant?: keyof typeof BUTTON_CLASSES
  className?: string
  width?: number
  height?: number
  onClick?: () => void
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset' | undefined
  id?: string
}

export default function Button(props: React.PropsWithChildren<PROPS_TYPE>) {
  const baseClass =
    'group transition-colors duration-200 flex justify-center items-center w-full h-full disabled:bg-[#9d6cd2]'
  return (
    <button
      disabled={props.disabled}
      type={props.type}
      style={{ height: props.height, width: props.width }}
      id={props.id}
      onClick={props.onClick}
      className={`${props.className} ${baseClass} ${BUTTON_CLASSES[props.variant || 'primary']}`}
    >
      {props.children}
    </button>
  )
}
