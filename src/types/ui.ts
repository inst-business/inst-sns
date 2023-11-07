import { ElementType } from 'react'

export type TRoute = {
  path: string
  component: ElementType
  layout?: ElementType | null
}

export type TNavLink = {
  icon: string
  activeIcon: string
  route: string
  label: string
  mobileDisabled?: boolean
}