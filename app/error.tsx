'use client' // Error boundaries must be Client Components

import { useEffect } from 'react'
import Button from '@/components/ui/Button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Application error: a server-side exception has occurred while loading localhost
      </h2>
      <p className="text-gray-600 mb-8">
        (see the server logs for more information)
      </p>
      {error.digest && (
        <p className="text-sm text-gray-500 mb-8 font-mono">
          Digest: {error.digest}
        </p>
      )}
      <Button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </Button>
    </div>
  )
}
