import { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import Icon from '@/components/shared/Icon'
import { Input } from '@/components/ui/input'
import SearchedPosts from '@/components/shared/SearchedPosts'
import GridPostList from '@/components/shared/GridPostList'
import { useGetPosts, useSearchPosts } from '@/hooks/queriesAndMutations'
import useDebounce from '@/hooks/debounce'
import Loader from '@/components/shared/Loader'

const Explore = () => {

  const [searchTerm, setSearchTerm] = useState('')
  const { ref: loadMoreRef, inView } = useInView()

  const debouncedTerm = useDebounce(searchTerm, 500)
  const { data: searchedPosts, isFetching: isSearchFetching } = useSearchPosts(debouncedTerm)
  const { data: posts, fetchNextPage, hasNextPage } = useGetPosts()

  const shouldShowSearchResults = searchTerm !== ''
  const shouldShowPosts = !shouldShowSearchResults && posts?.pages.every((item: any) => item.documents.length <= 0)

  useEffect(() => {
    if (!searchTerm && inView) fetchNextPage()
  }, [ searchTerm, inView ])
  
  if (!posts) {
    return (
      <div className={'flex-center w-full h-full'}>
        <Loader />
      </div>
    )
  }

  return (
    <div className={'explore-container'}>
      <div className={'explore-inner_container'}>
        <h2 className={'h3-bold md:h2-bold w-full'}>
          Search Posts
        </h2>
        <div className={'flex gap-1 items-center w-full px-4 rounded-lg bg-dark-4'}>
          <Icon
            asset={'search'}
            width={24}
            height={24}
          />
          <Input
            type={'text'}
            placeholder={'Search'}
            className={'explore-search'}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className={'flex-between w-full max-w-5xl mt-16 mb-7'}>
        <h3 className={'body-bold md:h3-bold'}>
          Popular today
        </h3>
        <div className={'flex-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer'}>
          <p className={'small-medium md:base-medium text-light-2'}>
            All
          </p>
          <Icon
            asset={'bars-filter'}
            width={16}
            height={16}
          />
        </div>
      </div>

      <div className={'flex flex-wrap gap-9 w-full max-w-5xl'}>
        {
          shouldShowSearchResults
            ? <SearchedPosts
                isFetching={isSearchFetching}
                posts={searchedPosts as any}
              />
            : shouldShowPosts
              ? <p className={'text-light-4 text-center w-full mt-10'}>
                  End of posts
                </p>
              : posts.pages.map((item: any, index: number) => (
                  <GridPostList
                    key={index}
                    posts={item.documents}
                  />
                ))
        }
      </div>

      {hasNextPage && !searchTerm && (
        <div
          ref={loadMoreRef}
          className={'mt-10'}
        >
          <Loader />
        </div>
      )}
    </div>
  )
}

export default Explore