import { TNavLink } from '@/types/ui'

export const navigationLinks: TNavLink[] = [
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
    mobileDisabled: true,
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