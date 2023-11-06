import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useToast } from '@/components/ui/use-toast'
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { signupValidation } from '@/lib/validation/auth'
import Loader from '@/components/shared/Loader'
import { useAuthContext } from '@/contexts/AuthContext'
import { useCreateUserAccount, useLogInAccount } from '@/hooks/queriesAndMutations'

const Signup = ({}) => {

  const navigate = useNavigate()
  const { toast } = useToast()
  const { checkAuthUser, isLoading: isUserLoading } = useAuthContext()

  const { mutateAsync: createUserAccount, isPending: isCreatingAccount } = useCreateUserAccount()
  const { mutateAsync: logInAccount, isPending: isLoggingIn } = useLogInAccount()

  const form = useForm<z.infer<typeof signupValidation>>({
    resolver: zodResolver(signupValidation),
    defaultValues: {
      name: '',
      username: '',
      email: '',
      password: '',
    }
  })

  const handleSubmit = async (data: z.infer<typeof signupValidation>) => {
    const user = await createUserAccount(data)
    if (!user) return toast({
      title: 'Sign up failed, please try again.',
    })
    // console.log(user)
    const session = await logInAccount(data)
    if (!session) return toast({
      title: 'Log in failed, please try again.',
    })

    const isLoggedIn = await checkAuthUser()
    if (!isLoggedIn) return toast({
      title: 'Sign up failed, please try again.',
    })
    form.reset()
    navigate('/')
  }

  return (
    <div className={'sm:w-420 flex-center flex-col'}>
      <h1 className={'h3-bold md:h2-bold'}>Clonestagram</h1>
      <h2 className={'h4-bold md:h3-bold pt-5 sm:pt-9'}>
        Join us with a new account
      </h2>
      <p className={'text-light-3 small-medium md:base-regular mt-2'}>
        Enter your information
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className={'flex flex-col gap-5 w-full mt-4'}>
          <FormField
            control={form.control}
            name={'name'}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type={'text'} className={'shad-input'} placeholder={''} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={'username'}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type={'text'} autoComplete={'username'} className={'shad-input'} placeholder={''} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={'email'}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type={'text'} className={'shad-input'} placeholder={''} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={'password'}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type={'password'} autoComplete={'current-password'} className={'shad-input'} placeholder={''} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type={'submit'} className={'shad-button_primary'}>
            {isCreatingAccount ? (
              <div className={'flex-center gap-2'}>
                <Loader />
              </div>
            ) : 'Sign up'}
          </Button>
          <p className={'text-small-regular text-light-2 text-center mt-2'}>
            Already a member? <Link to={'/login'} className={'text-small-semibold text-primary-500 ml-1'}>Log in</Link>
          </p>
        </form>
      </Form>
    </div>
  )
}

export default Signup