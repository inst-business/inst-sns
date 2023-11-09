import { useEffect } from 'react'
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import clsx from 'clsx'
import { Button } from '@/components/ui/button'
import Icon from '@/components/shared/Icon'
import { navigationLinks } from '@/config/global'
import { useLogOutAccount } from '@/hooks/queriesAndMutations'
import { useAuthContext } from '@/contexts/AuthContext'

const UserPreload = () => (
  <div className={'animate-pulse flex gap-3 items-center'}>
    <div className={'rounded-full bg-slate-800 h-14 w-14'}></div>
    <div className={'flex flex-col'}>
      <p className={'body-bold relative'}>
        <span className={'invisible'}>Placeholder</span>
        <div className={'bg-slate-800 rounded absolute-center-y h-1/3 w-24'}></div>
      </p>
      <p className={'small-regular text-light-3 relative'}>
        <span className={'invisible'}>@placeholder</span>
        <div className={'bg-slate-800 rounded absolute-center-y h-1/3 w-16'}></div>
      </p>
    </div>
  </div>
)

const SideBar = ({}) => {

  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { mutate: logout, isSuccess: isLoggedOut } = useLogOutAccount()
  const { user, isUserLoading } = useAuthContext()

  useEffect(() => {
    if (isLoggedOut) navigate(0)
  }, [ isLoggedOut ])

  return (
    <nav className={'sidebar'}>
      <div className={'flex flex-col gap-11'}>
        <Link to={'/'} className={'flex gap-3 items-center'}>
          <p className={'h3-bold'}>Clonestagram</p>
        </Link>
        
        {
          isUserLoading
            ? <UserPreload />
            : <Link to={`/profile/${user.id}`} className={'flex gap-3 items-center'}>
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
        }
        
        <ul className={'flex flex-col gap-6'}>
          {navigationLinks.map(link => {
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

export default SideBar