import Link from "next/link";

export default function NotFound() {
  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">Page Not Found</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Sorry, the page you are looking for could not be found. It might have been moved, deleted, or you entered the wrong URL.
            </p>
            <Link 
              href="/"
              className="inline-block bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Go Back Home
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
