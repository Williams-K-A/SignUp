import { useAuth } from '../contexts/AuthContext'
import { LogOut, User, Shield, Settings } from 'lucide-react'

export default function Dashboard() {
  const { user, logout } = useAuth()

  const handleLogout = async () => {
    await logout()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-primary-600 rounded-full flex items-center justify-center">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <h1 className="ml-3 text-2xl font-bold text-gray-900">
                Secure Dashboard
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-gray-400" />
                <span className="text-sm text-gray-700">
                  {user?.firstName} {user?.lastName}
                </span>
              </div>
              
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Welcome Section */}
          <div className="bg-white overflow-hidden shadow rounded-lg mb-6">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-2">
                Welcome back, {user?.firstName}!
              </h2>
              <p className="text-gray-600">
                You have successfully logged into your secure dashboard.
              </p>
            </div>
          </div>

          {/* User Information */}
          <div className="bg-white overflow-hidden shadow rounded-lg mb-6">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Account Information
              </h3>
              <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Full name</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {user?.firstName} {user?.lastName}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Email address</dt>
                  <dd className="mt-1 text-sm text-gray-900">{user?.email}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Account status</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user?.isEmailVerified 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {user?.isEmailVerified ? 'Verified' : 'Pending Verification'}
                    </span>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Member since</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Security Features */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Security Features
              </h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="flex items-start">
                  <Shield className="h-6 w-6 text-green-500 mt-1" />
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-gray-900">
                      Secure Authentication
                    </h4>
                    <p className="text-sm text-gray-500">
                      JWT-based authentication with refresh tokens
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Shield className="h-6 w-6 text-green-500 mt-1" />
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-gray-900">
                      Rate Limiting
                    </h4>
                    <p className="text-sm text-gray-500">
                      Protection against brute force attacks
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Shield className="h-6 w-6 text-green-500 mt-1" />
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-gray-900">
                      Input Validation
                    </h4>
                    <p className="text-sm text-gray-500">
                      Comprehensive form validation and sanitization
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Shield className="h-6 w-6 text-green-500 mt-1" />
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-gray-900">
                      Password Security
                    </h4>
                    <p className="text-sm text-gray-500">
                      Strong password requirements and hashing
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Shield className="h-6 w-6 text-green-500 mt-1" />
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-gray-900">
                      Session Management
                    </h4>
                    <p className="text-sm text-gray-500">
                      Secure token storage and automatic refresh
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Shield className="h-6 w-6 text-green-500 mt-1" />
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-gray-900">
                      HTTPS Encryption
                    </h4>
                    <p className="text-sm text-gray-500">
                      All data transmitted over secure connections
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}