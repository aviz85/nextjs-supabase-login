'use client'

import { useAuth } from '@/context/AuthContext'

export default function Home() {
  const { user, signOut, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="flex items-center justify-center space-x-2">
          <div className="w-4 h-4 bg-indigo-600 rounded-full animate-pulse"></div>
          <div className="w-4 h-4 bg-indigo-600 rounded-full animate-pulse delay-75"></div>
          <div className="w-4 h-4 bg-indigo-600 rounded-full animate-pulse delay-150"></div>
        </div>
        <p className="mt-4 text-indigo-600 font-medium">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-8 md:py-10 md:px-8">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-white">
                Protected Dashboard
              </h1>
              <button
                onClick={signOut}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-indigo-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
          
          <div className="px-6 py-8 md:px-8">
            <div className="border-b border-gray-200 pb-5 mb-5">
              <h3 className="text-lg leading-6 font-medium text-gray-900">User Information</h3>
              <p className="mt-2 max-w-4xl text-sm text-gray-500">
                Personal details and account information.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="bg-gray-50 overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="sm:flex sm:items-center sm:justify-between">
                    <div>
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Account Details
                      </h3>
                      <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                          <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M14.243 5.757a6 6 0 10-.986 9.284 1 1 0 111.087 1.678A8 8 0 1118 10a3 3 0 01-4.8 2.401A4 4 0 1114 10a1 1 0 102 0c0-1.537-.586-3.07-1.757-4.243zM12 10a2 2 0 10-4 0 2 2 0 004 0z" clipRule="evenodd" />
                          </svg>
                          {user?.email}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Welcome to Your Dashboard
                  </h3>
                  <div className="mt-2 max-w-xl text-sm text-gray-500">
                    <p>
                      You've successfully authenticated with Supabase and Next.js.
                      This page is protected and only accessible to authenticated users.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 