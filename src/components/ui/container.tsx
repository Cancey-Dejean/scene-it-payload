import { cn } from '@/lib/utils'
import React from 'react'

const containerSizes = {
  base: 'max-w-[1240px]',
}

export default function Container({
  size = 'base',
  children,
  className,
}: {
  size?: keyof typeof containerSizes
  className?: string
  children: React.ReactNode
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('mx-auto w-full px-5', containerSizes[size], className)}>{children}</div>
  )
}
