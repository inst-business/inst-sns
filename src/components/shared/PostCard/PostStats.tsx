import { FC, useState, useEffect, MouseEvent, memo } from 'react'
import clsx from 'clsx'
import { Models } from 'appwrite'
import { useLikePost, useSavePost, useDeleteSavedPost, useGetCurrentUser } from '@/hooks/queriesAndMutations'
import { IPostDocument } from '@/types/post'
import Icon from '@/components/shared/Icon'
import Loader from '@/components/shared/Loader'

interface IPostStatsProps {
  post: IPostDocument
  userId: string
}

const PostStats: FC<IPostStatsProps> = ({ post, userId }) => {

  const [likes, setLikes] = useState(() => post.likes.map((user: Models.Document) => user.$id))
  const [isSaved, setIsSaved] = useState(false)

  const { mutate: likePost, isPending: isLikingPost } = useLikePost()
  const { mutate: savePost, isPending: isSavingPost } = useSavePost()
  const { mutate: deleteSavedPost, isPending: isDeletingSavedPost } = useDeleteSavedPost()
  const { data: currentUser } = useGetCurrentUser()

  const savedPostRecord = currentUser?.save.find(
    (record: Models.Document) => record.post.$id === post.$id
  )

  const handleLikePost = (e: MouseEvent) => {
    e.stopPropagation()
    let newLikes = [...likes]
    const hasLiked = newLikes.includes(userId)
    if (hasLiked) {
      newLikes = newLikes.filter(id => id !== userId)
    }
    else {
      newLikes.push(userId)
    }
    setLikes(newLikes)
    likePost({ postId: post.$id, likesArray: newLikes })
  }

  const handleSavePost = (e: MouseEvent) => {
    e.stopPropagation()
    if (savedPostRecord) {
      setIsSaved(false)
      deleteSavedPost(savedPostRecord.$id)
      return
    }
    savePost({ postId: post.$id, userId })
    setIsSaved(true)
  }

  useEffect(() => {
    setIsSaved(!!savedPostRecord)
  }, [ currentUser ])

  return (
    <div className={'flex justify-between items-center z-20'}>
      <div className={'flex gap-2 mr-5'}>
        <Icon
          asset={
            likes.includes(userId) ? 'heart_filled' : 'heart'
          }
          width={20}
          height={20}
          className={
            clsx('cursor-pointer', {
              ['pending-state']: isLikingPost
            })
          }
          onClick={e => handleLikePost(e)}
        />
        <p className={'small-medium lg:base-medium'}>
          {likes.length}
        </p>
      </div>

      <div className={'flex gap-2'}>
        <Icon
          asset={
            isSaved ? 'bookmark_filled' : 'bookmark'
          }
          width={20}
          height={20}
          className={
            clsx('cursor-pointer', {
              ['pending-state']: isSavingPost || isDeletingSavedPost
            })
          }
          onClick={e => handleSavePost(e)}
        />
      </div>
    </div>
  )
}

export default memo(PostStats)