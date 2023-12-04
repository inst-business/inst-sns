import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import Icon from '@/components/shared/Icon'
import { useLogOutAccount } from '@/hooks/queriesAndMutations'
import { useAuthContext } from '@/contexts/AuthContext'

const Header = ({}) => {

  const navigate = useNavigate()
  const { mutate: logout, isSuccess: isLoggedOut } = useLogOutAccount()
  const { user } = useAuthContext()

  useEffect(() => {
    if (isLoggedOut) navigate(0)
  }, [ isLoggedOut ])

  return (
    <header className={'header'}>
      <div className={'flex-between py-4 px-5'}>
        <Link to={'/'} className={'flex gap-3 items-center'}>
          <p className={'h3-bold'}>Clonestagram</p>
        </Link>

        <div className={'flex gap-4'}>
          <Button
            variant={'ghost'}
            className={'shad-button_ghost'}
            onClick={() => logout()}
          >
            <Icon asset={'logout'} />
          </Button>
          <Link to={`/profile/${user.id}`} className={'flex-center gap-3'}>
            {
              user.imageUrl != null
                ? <img
                    src={user.imageUrl}
                    alt={user.username}
                    loading={'lazy'}
                    className={'h-8 w-8 rounded-full'}
                  />
                : <Icon asset={'circle-user'} />
            }
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header