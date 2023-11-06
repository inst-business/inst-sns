import { FC } from 'react'
import clsx from 'clsx'
import styles from './icon.module.scss'

// const render = (name: string, width?: number, height?: number, ...props: any[]) => {
//   return <img
//     src={`/public/assets/${name.toLowerCase()}.svg`}
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
  width?: number
  height?: number
  className?: string
  props?: unknown[]
}

const Icon: FC<IIconProps> = ({
  asset, color, width = 24, height = 24, className, ...props
}) => {
  const maskImage = `url('/public/assets/${asset.toLowerCase()}.svg')`
  return (
    <span
      className={clsx(className, 'shad-button_primary', styles.Icon)}
      ref={
        el => el && el.style.setProperty('background-color', color as string, 'important')
      }
      style={{
        maskImage,
        WebkitMaskImage: maskImage,
        width,
        height,
      }}
      {...props}
    ></span>
  )
}

export default Icon