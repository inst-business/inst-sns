import {
  useQuery, useMutation, useQueryClient, useInfiniteQuery
} from '@tanstack/react-query'
import { createUserAccount, loginAccount, logoutAccount } from '@/services/api'
import { IAccount, IUser } from '@/types/user'

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

export {
  useCreateUserAccount,
  useLoginAccount,
  useLogOutAccount,
}