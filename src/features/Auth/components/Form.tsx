import { useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { signupValidation } from '@/lib/validation/auth'
import Loader from '@/components/shared/Loader'

const FormAuth = () => {

  const isLoading = false

  const form = useForm<z.infer<typeof signupValidation>>({
    resolver: zodResolver(signupValidation),
    defaultValues: {
      name: '',
      username: '',
      email: '',
      password: '',
    }
  })

  const handleSubmit = (values: z.infer<typeof signupValidation>) => {
    console.log(values)
  }

  return (
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
          {isLoading ? (
            <div className={'flex-center gap-2'}>
              <Loader />
            </div>
          ) : 'Submit'}
        </Button>
      </form>
    </Form>
  )
}

export default FormAuth