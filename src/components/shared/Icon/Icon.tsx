import { FC, ButtonHTMLAttributes } from 'react'
import clsx from 'clsx'
import styles from './icon.module.scss'

// const render = (name: string, width?: number, height?: number, ...props: any[]) => {
//   return <img
//     src={`/assets/${name.toLowerCase()}.svg`}
//     alt={name}
//     width={width}
//     height={height}
//     {...props}
//   />
// }

// const Logout = (...props: any[]) => render('logout', ...props)

// const Icon = (() => {
//   return {
//     Logout,
//   }
// })()

interface IIconProps {
  asset: string
  color?: string
  width?: number | string
  height?: number | string
  className?: string
  props?: unknown[]
}

const Icon: FC<IIconProps & ButtonHTMLAttributes<HTMLButtonElement>> = ({
  asset, color, width = 24, height = 24, className, ...props
}) => {
  const maskImage = `url('/assets/${asset.toLowerCase()}.svg')`
  const dimension = (edge: number | string) => typeof edge === 'number' ? `${edge}px` : edge as string
  return (
    <span
      className={clsx('bg-gray-500', styles.Icon, className)}
      style={{
        maskImage,
        WebkitMaskImage: maskImage,
      }}
      ref={
        el => {
          el?.style.setProperty('background-color', color as string, 'important')
          el?.style.setProperty('width', dimension(width), 'important')
          el?.style.setProperty('height', dimension(height), 'important')
        }
      }
      {...props}
    ></span>
  )
}

export default Icon