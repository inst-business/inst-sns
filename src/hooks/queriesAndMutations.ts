import {
  useQuery, useMutation, useQueryClient, useInfiniteQuery
} from '@tanstack/react-query'
import { createPost, createUserAccount, getRecentPosts, loginAccount, logoutAccount } from '@/services/api'
import { IAccount, IUser } from '@/types/user'
import { INewPost } from '@/types/post'
import { QUERY_KEYS } from '@/types/query'

const useCreateUserAccount = () => {
  return useMutation({
    mutationFn: (user: IAccount) => createUserAccount(user)
  })
}

const useLoginAccount = () => {
  return useMutation({
    mutationFn: (user: Pick<IAccount, 'email' | 'password'>) => loginAccount(user)
  })
}

const useLogOutAccount = () => {
  return useMutation({
    mutationFn: logoutAccount
  })
}

const useCreatePost = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (post: INewPost) => createPost(post),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      })
    },
  })
}

const useGetRecentPosts = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
    queryFn: getRecentPosts,
  })
}

export {
  useCreateUserAccount,
  useLoginAccount,
  useLogOutAccount,
  useCreatePost,
  useGetRecentPosts,
}