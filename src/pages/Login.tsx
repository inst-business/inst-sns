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
import { loginValidation } from '@/lib/validation/auth'
import Loader from '@/components/shared/Loader'
import { useAuthContext } from '@/contexts/AuthContext'
import { useLogInAccount } from '@/hooks/queriesAndMutations'

const Login = ({}) => {

  const navigate = useNavigate()
  const { toast } = useToast()
  const { checkAuthUser, isLoading: isUserLoading } = useAuthContext()

  const { mutateAsync: logInAccount, isPending: isLoggingIn } = useLogInAccount()

  const form = useForm<z.infer<typeof loginValidation>>({
    resolver: zodResolver(loginValidation),
    defaultValues: {
      email: '',
      password: '',
    }
  })

  const handleSubmit = async (data: z.infer<typeof loginValidation>) => {
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
        Log in to your account
      </h2>
      <p className={'text-light-3 small-medium md:base-regular mt-2'}>
        Welcome back!
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className={'flex flex-col gap-5 w-full mt-4'}>
          <FormField
            control={form.control}
            name={'email'}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type={'text'} autoComplete={'email'} className={'shad-input'} placeholder={''} {...field} />
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
            {isUserLoading ? (
              <div className={'flex-center gap-2'}>
                <Loader />
              </div>
            ) : 'Log in'}
          </Button>
          <p className={'text-small-regular text-light-2 text-center mt-2'}>
            Haven't joined yet? <Link to={'/signup'} className={'text-small-semibold text-primary-500 ml-1'}>Sign up</Link>
          </p>
        </form>
      </Form>
    </div>
  )
}

export default Login