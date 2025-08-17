'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-600 mb-4">Oops!</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Something went wrong</h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          We&apos;re sorry, but something unexpected happened. Please try again.
        </p>
        <div className="space-x-4">
          <button
            onClick={reset}
            className="inline-block bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="inline-block bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  )
}
