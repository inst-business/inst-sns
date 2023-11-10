import { FC } from 'react'
import { Models } from 'appwrite'
import { IPostDocument } from '@/types/post'
import Loader from '@/components/shared/Loader'
import GridPostList from '../GridPostList'

interface ISearchPostsProps {
  isFetching: boolean
  posts: Models.DocumentList<IPostDocument>
}

const SearchPosts: FC<ISearchPostsProps> = ({ isFetching, posts }) => {

  if (isFetching) return <Loader />
  if (posts && posts.documents.length > 0) {
    return (
      <GridPostList
        posts={posts.documents}
      />
    )
  }

  return (
    <p className={'text-light-4 mt-10 text-center w-full'}>
      No results found!
    </p>
  )
}

export default SearchPosts