import { FC, useState, useRef, useEffect } from 'react'
import clsx from 'clsx'
import styles from './img.module.scss'
import Icon from '@/components/shared/Icon'

interface IImgProps {
  src: string | URL
  alt: string
  placeholder?: string | URL
  className?: string
  props?: any[]
}

const Img: FC<IImgProps> = ({ src, alt, placeholder, className, ...props }) => {

  const [isLoaded, setIsLoaded] = useState(false)
  const [isFailed, setIsFailed] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  // useEffect(() => {
  //   console.log(imgRef.current?.onerror)
  // }, [isLoaded])

  useEffect(() => {
    // console.log(imgRef.current?.onerror)
  }, [])

  if (isFailed) return (
    <div className={'post-card_img-notfound !h-full !w-full'}>
      <Icon
        asset={'image-slash'}
        width={48}
        height={48}
        className={'bg-gray-800'}
      />
      <p className={'text-gray-800 small-regular mt-4'}>
        Failed to load photo!
      </p>
    </div>
  )

  return (
    <picture
      className={
        clsx(styles.PictureOnBlurLoad, {
          [styles.Loading]: !isLoaded
        })
      }
      style={{ backgroundImage: `url(/karina-ph.jpg)` }}
    >
      {/* <source srcset={''} /> */}
      <img
        ref={imgRef}
        src={src?.toString()}
        alt={alt}
        loading={'lazy'}
        className={
          clsx(className, {
          })
        }
        onLoad={() => setIsLoaded(true)}
        onError={() => setIsFailed(true)}
        {...props}
      />
    </picture>
  )
}

export default Img