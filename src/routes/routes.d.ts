import { ElementType } from "react"

export interface TRoute {
  path: string
  component: ElementType
  layout?: ElementType | null
}