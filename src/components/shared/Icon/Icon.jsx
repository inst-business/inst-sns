import { Icon as Iconify } from '@iconify/react'
import { toKebabCase } from '@/utils/String'

const Icon = new Proxy(
  {},
  {
    get: (target, name) => ({ size = 'md', ...props }) => {
      const sizes = { sm: 16, md: 32, lg: 48 }
      return <Iconify
        icon={`solar:${toKebabCase(name)}`}
        width={sizes[size]}
        height={sizes[size]}
        {...props}
      />
    },
  }
)
export default Icon