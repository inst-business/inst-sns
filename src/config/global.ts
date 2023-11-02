import { ElementType } from "react"

export type TRoute = {
  path: string
  component: ElementType
  layout?: ElementType | null
}

export type TNavLink = {
  imgURL: string
  route: string
  label: string
}