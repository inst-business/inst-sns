import { useEffect } from 'react'
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import clsx from 'clsx'
import { Button } from '@/components/ui/button'
import Icon from '@/components/shared/Icon'
import { useLogOutAccount } from '@/hooks/queriesAndMutations'
import { useAuthContext } from '@/contexts/AuthContext'
import { TNavLink } from '@/types/ui'

const links: TNavLink[] = [
  {
    icon: 'house-blank',
    activeIcon: 'house-blank_filled',
    route: '/',
    label: 'Home',
  },
  {
    icon: 'compass',
    activeIcon: 'compass_filled',
    route: '/explore',
    label: 'Explore',
  },
  {
    icon: 'user-group',
    activeIcon: 'user-group_filled',
    route: '/all-users',
    label: 'People',
  },
  {
    icon: 'bookmark',
    activeIcon: 'bookmark_filled',
    route: '/saved',
    label: 'Saved',
  },
  {
    icon: 'square-plus',
    activeIcon: 'square-plus_filled',
    route: '/create',
    label: 'Create',
  },
]

const Sidebar = ({}) => {

  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { mutate: logout, isSuccess: isLoggedOut } = useLogOutAccount()
  const { user } = useAuthContext()

  useEffect(() => {
    if (isLoggedOut) navigate(0)
  }, [ isLoggedOut ])

  return (
    <nav className={'sidebar'}>
      <div className={'flex flex-col gap-11'}>
        <Link to={'/'} className={'flex gap-3 items-center'}>
          <p className={'h3-bold'}>Clonestagram</p>
        </Link>
        
        <Link to={`/profile/${user.id}`} className={'flex gap-3 items-center'}>
          {
            user.imageUrl != null
              ? <img src={user.imageUrl} alt={user.username} className={'h-14 w-14 rounded-full'} />
              : <Icon asset={'circle-user'} width={32} height={32} />
          }
          <div className={'flex flex-col'}>
            <p className={'body-bold'}>{user.name}</p>
            <p className={'small-regular text-light-3'}>@{user.username}</p>
          </div>
        </Link>

        <ul className={'flex flex-col gap-6'}>
          {links.map(link => {
            const isActive = link.route === pathname
            return (
              <li
                key={link.label}
                className={
                  clsx('sidebar-link', 'group', {
                    ['!bg-primary-500']: isActive
                  })
                }
              >
                <NavLink to={link.route} className={'flex gap-4 items-center p-4'}>
                  <Icon
                    asset={isActive ? link.activeIcon : link.icon}
                    className={
                      clsx('bg-primary-500', 'group-hover:invert-white', {
                        ['invert-white']: isActive
                      })
                    }
                  />
                  <span className={clsx({ ['font-semibold']: isActive })}>{link.label}</span>
                </NavLink>
              </li>
            )
          })}
        </ul>
      </div>
      
      <Button
        variant={'ghost'}
        className={'shad-button_ghost'}
        onClick={() => logout()}
      >
        <Icon asset={'logout'} className={'bg-primary-500'} />
        <span className={'small-medium lg:base-medium'}>Logout</span>
      </Button>
    </nav>
  )
}

export default Sidebar