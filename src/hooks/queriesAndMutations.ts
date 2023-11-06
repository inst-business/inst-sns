import {
  useQuery, useMutation, useQueryClient, useInfiniteQuery
} from '@tanstack/react-query'
import { createUserAccount, logInAccount } from '@/services/api'
import { IAccount, IUser } from '@/types/user'

const useCreateUserAccount = () => {
  return useMutation({
    mutationFn: (user: IAccount) => createUserAccount(user)
  })
}

const useLogInAccount = () => {
  return useMutation({
    mutationFn: (user: Pick<IAccount, 'email' | 'password'>) => logInAccount(user)
  })
}

export {
  useCreateUserAccount,
  useLogInAccount
}