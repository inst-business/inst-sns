import { useParams } from 'react-router-dom'
import { useGetPostById } from '@/hooks/queriesAndMutations'
import Icon from '@/components/shared/Icon'
import Form from '@/components/forms'
import Loader from '@/components/shared/Loader'

const PostEdit = ({}) => {

  const { id } = useParams()
  const { data: post, isPending: isLoadingPost } = useGetPostById(id || '')

  if (isLoadingPost) return <Loader />

  return (
    <div className={'flex flex-1'}>
      <div className={'common-container'}>
        <div className={'max-w-5xl flex-start gap-3 justify-start w-full'}>
          <Icon
            asset={'square-plus'}
            width={36}
            height={36}
          />
          <h2 className={'h3-bold md:h2-bold text-left w-full'}>Edit Post</h2>
        </div>
        
        <Form.Post action={'update'} post={post} />
      </div>
    </div>
  )
}

export default PostEdit