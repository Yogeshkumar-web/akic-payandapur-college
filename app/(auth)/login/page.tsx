'use client'

import { login } from '@/app/auth/actions'
import Button from '@/components/ui/Button'
import Link from 'next/link'
import { useActionState } from 'react'

const initialState = {
  error: '',
}

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(login, initialState)

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_right,rgba(198,40,40,0.12),transparent_35%),#FFFDF5] px-4 py-12">
      <div className="w-full max-w-md space-y-8 rounded-3xl border border-[#EADFD2] bg-white p-6 shadow-[0_24px_70px_rgba(95,15,26,0.14)] sm:p-9">
        <div>
          <h2 className="mt-4 text-center text-3xl font-extrabold tracking-[-0.035em] text-[#8B1E2D]" style={{ fontFamily: 'Inter, sans-serif' }}>
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link href="/register" className="font-medium text-red-700 hover:text-yellow-500">
              create a new account
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" action={formAction}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mb-4">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block min-h-12 w-full rounded-xl border border-[#DCCBBB] px-4 py-3 text-[#2B1717] outline-none transition placeholder:text-[#A48A7A] focus:border-[#C62828] focus:ring-4 focus:ring-[#C62828]/10"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="relative block min-h-12 w-full rounded-xl border border-[#DCCBBB] px-4 py-3 text-[#2B1717] outline-none transition placeholder:text-[#A48A7A] focus:border-[#C62828] focus:ring-4 focus:ring-[#C62828]/10"
                placeholder="Password"
              />
            </div>
          </div>

          {state?.error && (
            <div className="text-red-500 text-sm text-center">
              {state.error}
            </div>
          )}

          <div>
            <Button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
              disabled={isPending}
            >
              {isPending ? 'Signing in...' : 'Sign in'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
