import { Link, useLocation } from 'react-router-dom'
import clsx from 'clsx'
import { navigationLinks } from '@/config/global'
import Icon from '@/components/shared/Icon'

const NavigationBar = ({}) => {

  const { pathname } = useLocation()

  return (
    <section className={'navigationbar'}>
      {navigationLinks.filter(link => link.mobileDisabled !== true).map(link => {
        const isActive = link.route === pathname
        return (
          <Link
            key={link.label}
            to={link.route}
            className={
              clsx('flex-center flex-col gap-1 p-2 rounded-[10px] transition', {
                ['!bg-primary-500']: isActive
              })
            }
          >
            <Icon
              asset={isActive ? link.activeIcon : link.icon}
              width={16}
              height={16}
              className={
                clsx('bg-primary-500', {
                  ['invert-white']: isActive
                })
              }
            />
            <span
              className={
                clsx('tiny-medium text-light-2', {
                  ['font-semibold']: isActive
                })
              }
            >
              {link.label}
            </span>
          </Link>
        )
      })}
    </section>
  )
}

export default NavigationBar