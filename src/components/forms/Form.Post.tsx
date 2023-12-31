import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Models } from 'appwrite'
import { useAuthContext } from '@/contexts/AuthContext'
import { postValidation } from '@/lib/validation/post'
import { useCreatePost, useUpdatePost } from '@/hooks/queriesAndMutations'
import { useToast } from '@/components/ui/use-toast'
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import Uploader from '@/components/shared/Uploader'
import Loader from '@/components//shared/Loader'

interface IFormPostProps {
  post?: Models.Document
  action?: 'create' | 'update'
}

const FormPost: FC<IFormPostProps> = ({ post, action }) => {

  const { mutateAsync: createPost, isPending: isLoadingCreate } = useCreatePost()
  const { mutateAsync: updatePost, isPending: isLoadingUpdate } = useUpdatePost()
  const { user } = useAuthContext()
  const { toast } = useToast()
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof postValidation>>({
    resolver: zodResolver(postValidation),
    defaultValues: {
      caption: post ? post?.caption : '',
      files: [],
      location: post ? post?.location : '',
      tags: post ? post?.tags.join(',') : '',
    }
  })

  const handleSubmit = async (data: z.infer<typeof postValidation>) => {
    if (post && action === 'update') {
      const updatedPost = await updatePost({
        ...data,
        postId: post.$id,
        imageId: post?.imageId,
        imageUrl: post?.imageUrl,
      })
      if (!updatedPost) {
        toast({
          title: 'Failed to update, please try again.'
        })
      }
      return navigate(`/posts/${post.$id}`)
    }

    const newPost = await createPost({
      ...data,
      userId: user.id
    })
    if (!newPost) toast({
      title: 'Failed to create, please try again.'
    })
    navigate('/')
  }

  // useEffect(() => {
  //   console.log(post?.imageUrl)
  // }, [])

  return (
    <Form {...form}>
      <form
        className={'flex flex-col gap-9 w-full max-w-5xl'}
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormField
          control={form.control}
          name={'caption'}
          render={({ field }) => (
            <FormItem>
              <FormLabel className={'shad-form_label'}>Caption</FormLabel>
              <FormControl>
                <Textarea
                  className={'shad-textarea custom-scrollbar'}
                  placeholder={'Summary your post context...'}
                  {...field}
                />
              </FormControl>
              <FormMessage className={'shad-form_message'} />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={'files'}
          render={({ field }) => (
            <FormItem>
              <FormLabel className={'shad-form_label'}>Photos</FormLabel>
              <FormControl>
                <Uploader
                  fieldChange={field.onChange}
                  mediaUrl={post?.imageUrl}
                />
              </FormControl>
              <FormMessage className={'shad-form_message'} />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={'location'}
          render={({ field }) => (
            <FormItem>
              <FormLabel className={'shad-form_label'}>Location</FormLabel>
              <FormControl>
                <Input
                  type={'text'}
                  className={'shad-input'}
                  placeholder={'Current location of the scene'}
                  {...field}
                />
              </FormControl>
              <FormMessage className={'shad-form_message'} />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={'tags'}
          render={({ field }) => (
            <FormItem>
              <FormLabel className={'shad-form_label'}>Tags (Separated by comma " , ")</FormLabel>
              <FormControl>
                <Input
                  type={'text'}
                  className={'shad-input'}
                  placeholder={'Art, Expression, Learn,.etc...'}
                  {...field}
                />
              </FormControl>
              <FormMessage className={'shad-form_message'} />
            </FormItem>
          )}
        />
        <div className={'flex gap-4 items-center justify-end'}>
          <Button
            type={'button'}
            className={'shad-button_dark_4'}
          >
            Cancel
          </Button>
          <Button
            type={'submit'}
            className={'shad-button_primary whitespace-nowrap'}
            disabled={isLoadingCreate || isLoadingUpdate}
          >
            {
              isLoadingCreate || isLoadingUpdate
                ? (
                  <div className={'flex-center gap-2'}>
                    <Loader />
                  </div>
                )
                : `${action === 'update' ? 'Update' : 'Create'} Post`
            }
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default FormPost

FormPost.defaultProps = {
  action: 'create',
}