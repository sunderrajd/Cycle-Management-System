import { PropsWithChildren } from 'react'

export default function Container({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return <div className={'mx-auto max-w-[1240px] px-5 ' + className}>{children}</div>
}
