import { FC, useState } from 'react'
import { IPostDocument } from '@/types/post'
import { useAuthContext } from '@/contexts/AuthContext'
import { Link } from 'react-router-dom'
import PostStats from '@/components/shared/PostCard/PostStats'
import Img from '@/components/shared/Img'

interface IGridPostListProps {
  posts: IPostDocument[]
  showUser?: boolean
  showStats?: boolean
}

const GridPostList: FC<IGridPostListProps> = ({ posts, showUser = true, showStats = true }) => {

  const { user } = useAuthContext()

  return (
    <ul className={'grid-container'}>
      {
        posts.map(post => (
          <li
            key={post.$id}
            className={'relative min-w-80 h-80'}
          >
            <Link
              to={`/posts/${post.$id}`}
              className={'grid-post_link'}
            >
              <img
                src={post.imageUrl.toString()}
                alt={post.caption}
                loading={'lazy'}
                className={'w-full h-full object-cover'}
              />
            </Link>

            <div className={'grid-post_user'}>
              {showUser && (
                <div className={'flex flex-1 items-center justify-start gap-2'}>
                  <img
                    src={post.creator.imageUrl}
                    alt={post.caption}
                    className={'h-8 w-8 rounded-full'}
                  />
                  <p className={'line-clamp-1'}>
                    {post.creator.name}
                  </p>
                </div>
              )}
              {showStats && (
                <PostStats
                  post={post}
                  userId={user.id}
                />
              )}
            </div>
          </li>
        ))
      }
    </ul>
  )
}

export default GridPostList