'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Loader2 } from 'lucide-react'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useState } from 'react'

const formSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Username must be 3-15 characters.' })
    .max(15, { message: 'Username must be 3-15 characters.' }),
  password: z
    .string()
    .min(5, { message: 'Password must be 5-15 characters.' })
    .max(15, { message: 'Password must be 5-15 characters.' }),
})

export default function LogIn() {
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })
  const [isSubmit, setSubmit] = useState(false)

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setSubmit(true)
    router.push('/problems')
    // const username = data?.username
    // const password = data?.password
    // try {
    //   const fetchData = await signIn('credentials', {
    //     username,
    //     password,
    //     redirect: false,
    //   })
    //   if (fetchData?.ok) {
    //     router.push('/problems')
    //   } else {
    //     console.log('ERROR')
    //   }
    // } catch (error) {
    //   console.log('Something')
    // }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Card className="w-[350px]">
        <CardHeader className="text-center">
          <CardTitle>Grader</CardTitle>
          <CardDescription>
            Please login to see the problem list
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={isSubmit} className="w-full" type="submit">
                {isSubmit ? (
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                ) : (
                  'Login'
                )}
              </Button>
            </form>
          </Form>
          <CardDescription className="text-center">
            <Link href="/register">Don't have an account?</Link>
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  )
}
