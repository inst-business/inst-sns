import {
  useQuery, useMutation, useQueryClient, useInfiniteQuery
} from '@tanstack/react-query'
import { createUserAccount } from '@/services/api'
import { INewUser } from '@/types/user'

const useCreateUserAccount = () => {
  return useMutation({
    mutationFn: (user: INewUser) => createUserAccount(user)
  })
}

export {
  useCreateUserAccount
}