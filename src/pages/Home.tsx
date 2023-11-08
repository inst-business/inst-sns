import Loader from '@/components/shared/Loader'
import PostCard from '@/components/shared/PostCard'
import { useGetRecentPosts } from '@/hooks/queriesAndMutations'
import { IPostDocument } from '@/types/post'

const Home = ({}) => {

  const { data: posts, isPending: isPostsLoading, isError: isFailedFetching } = useGetRecentPosts()

  return (
    <div className={'flex flex-1'}>
      <div className={'home-container'}>
        <div className={'home-posts'}>
          <h2 className={'h3-bold md:h2-bold text-left w-full'}>Home feed</h2>
          {
            isPostsLoading && !posts
              ? (
                <Loader />
              )
              : (
                <ul className={'flex flex-col flex-1 gap-9 w-full'}>
                  {posts?.documents.map(post => (
                    <PostCard
                      key={post.$id}
                      post={post as IPostDocument}
                    />
                  ))}
                </ul>
              )
          }
        </div>
      </div>
    </div>
  )
}

export default Home