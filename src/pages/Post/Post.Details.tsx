import React from 'react'
import { useParams, Link } from 'react-router-dom'
import clsx from 'clsx'
import { useAuthContext } from '@/contexts/AuthContext'
import { useGetPostById } from '@/hooks/queriesAndMutations'
import Loader from '@/components/shared/Loader'
import _Date from '@/utils/date'
import NotFound from '@/pages/NotFound'
import Icon from '@/components/shared/Icon'
import { Button } from '@/components/ui/button'
import PostStats from '@/components/shared/PostCard/PostStats'

const PostDetails = ({}) => {
  
  const { id } = useParams()
  const { data: post, isPending: isLoadingPost } = useGetPostById(id || '')
  const { user } = useAuthContext()

  const handleDeletePost = () => {

  }

  if (isLoadingPost) return <Loader />
  if (!post) return <NotFound />

  return (
    <div className={'post_details-container'}>
      <div className={'post_details-card'}>
        <img
          src={post.imageUrl.toString()}
          alt={post.caption}
          className={'post_details-img'}
        />
        <div className={'post_details-info'}>
          <div className={'flex-between w-full'}>
            <Link
              to={`/profile/${post.creator.$id}`}
              className={'flex items-center gap-3'}
            >
              <img
                src={post.creator.imageUrl || '/assets/circle-user.svg'}
                alt={post.creator.username}
                className={'w-8 h-8 lg:w-12 lg:h-12 rounded-full'}
              />
              <div className={'flex flex-col'}>
                <p className={'base-medium lg:body-bold text-light-1'}>
                  {post.creator.name}
                </p>
                <div className={'flex-center gap-2 text-light-3'}>
                  <p className={'subtle-semibold lg:small-regular'}>
                    {_Date.format(post.$createdAt || '')}
                  </p>
                  -
                  <p className={'subtle-semibold lg:small-regular'}>
                    {post.location}
                  </p>
                </div>
              </div>
            </Link>

            <div className={'flex-center gap-1'}>
              <Link
                to={`/posts/${post.$id}/edit`}
                className={
                  clsx({
                    ['hidden']: user.id !== post.creator.$id
                  })
                }
              >
                <Icon
                  asset={'pen-line'}
                  width={24}
                  height={24}
                />
              </Link>
              <Button
                variant={'ghost'}
                className={
                  clsx('ghost_details-delete_btn', {
                    ['hidden']: user.id !== post.creator.$id
                  })
                }
                onClick={() => handleDeletePost()}
              >
                <Icon
                  asset={'trash'}
                  width={24}
                  height={24}
                />
              </Button>
            </div>
          </div>

          <hr className={'border w-full border-dark-4/80'} />

          <div className={'flex flex-col flex-1 w-full small-medium lg:base-regular'}>
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

          <div className={'w-full'}>
            <PostStats post={post} userId={user.id} />
          </div>

        </div>
      </div>
    </div>
  )
}

export default PostDetails