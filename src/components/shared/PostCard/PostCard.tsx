import { FC, memo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import Icon from '@/components/shared/Icon'
import { IPostDocument } from '@/types/post'
import _Date from '@/utils/date'
import { useAuthContext } from '@/contexts/AuthContext'
import PostStats from './PostStats'
import PostCardLoading from './PostCard.Loading'
import { useGetCurrentUser } from '@/hooks/queriesAndMutations'

interface IPostCardProps {
  post: IPostDocument
}

const PostCard: FC<IPostCardProps> = ({ post }) => {

  const { user, isUserLoading } = useAuthContext()
  const { isPending: isCurrentUserLoading } = useGetCurrentUser()

  // useEffect(() => {
  //   console.log(post.$id)
  // })

  if (!post.creator) return

  if (isUserLoading || isCurrentUserLoading) return <PostCardLoading />
  
  return (
    <li className={'post-card'}>
      <div className={'flex-between'}>
        <div className={'flex items-center gap-3'}>
          <Link to={`/profile/${post.creator.$id}`}>
            <img
              src={post?.creator?.imageUrl || '/assets/circle-user.svg'}
              alt={post.creator.username}
              className={'w-12 lg:h-12 rounded-full'}
            />
          </Link>
          <div className={'flex flex-col'}>
            <p className={'base-medium lg:body-bold text-light-1'}>
              {post.creator.name}
            </p>
            <div className={'flex-center gap-2 text-light-3'}>
              <p className={'subtle-semibold lg:small-regular'}>
                {_Date.format(post.$createdAt)}
              </p>
              -
              <p className={'subtle-semibold lg:small-regular'}>
                {post.location}
              </p>
            </div>
          </div>
        </div>

        <Link
          to={`/posts/${post.$id}/edit`}
          className={clsx({
            ['hidden']: user.id !== post.creator.$id
          })}
        >
          <Icon
            asset={'pen-line'}
            width={20}
            height={20}
          />
        </Link>
      </div>

      <Link to={`/posts/${post.$id}`}>
        <div className={'small-medium lg:base-medium py-5'}>
          <p>
            {post.caption}
          </p>
          <ul className={'flex gap-1 mt-2'}>
            {post.tags.map((tag: string) => (
              <li key={tag} className={'text-light-3'}>
                #{tag}
              </li>
            ))}
          </ul>
        </div>

        {
          post.imageUrl
            ? (
              <img
                src={post.imageUrl.toString() || '/assets/circle-user.svg'}
                alt={post.caption}
                className={'post-card_img'}
              />
            )
            : (
              <div className={'post-card_img-notfound'}>
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
        }
      </Link>

      <PostStats post={post} userId={user.id} />
    </li>
  )
}

export default memo(PostCard)