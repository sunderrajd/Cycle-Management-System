import { PropsWithChildren } from 'react'

export default function Wrapper({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return <div className={className + ''}>{children}</div>
}
