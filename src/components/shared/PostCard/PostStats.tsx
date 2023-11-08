import { FC } from 'react'
import { IPostDocument } from '@/types/post'
import Icon from '@/components/shared/Icon'

interface IPostStatsProps {
  post: IPostDocument
  userId: string
}

const PostStats: FC<IPostStatsProps> = ({  }) => {
  return (
    <div className={'flex justify-between items-center z-20'}>
      <div className={'flex gap-2 mr-5'}>
        <Icon
          asset={'heart'}
          width={20}
          height={20}
          className={'cursor-pointer'}
          onClick={() => {}}
        />
        <p className={'small-medium lg:base-medium'}>
          0
        </p>
      </div>

      <div className={'flex gap-2'}>
        <Icon
          asset={'bookmark'}
          width={20}
          height={20}
          className={'cursor-pointer'}
          onClick={() => {}}
        />
      </div>
    </div>
  )
}

export default PostStats