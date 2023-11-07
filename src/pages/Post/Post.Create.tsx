import React from 'react'
import Icon from '@/components/shared/Icon'
import Form from '@/components/forms'

const PostCreate = () => {
  return (
    <div className={'flex flex-1'}>
      <div className={'common-container'}>
        <div className={'max-w-5xl flex-start gap-3 justify-start w-full'}>
          <Icon
            asset={'square-plus'}
            width={36}
            height={36}
          />
          <h2 className={'h3-bold md:h2-bold text-left w-full'}>Create Post</h2>
        </div>
        
        <Form.Post />
      </div>
    </div>
  )
}

export default PostCreate