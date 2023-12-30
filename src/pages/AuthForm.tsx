// AuthForm.tsx

import React, { useState } from "react"

interface AuthFormProps {
  title: string
  buttonText: string
  onSubmit: (email: string, password: string) => void
  isAuthenticated: boolean
  onSignOut?: () => void
}

const AuthForm: React.FC<AuthFormProps> = ({
  title,
  buttonText,
  onSubmit,
  isAuthenticated,
  onSignOut,
}) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = () => {
    onSubmit(email, password)
  }

  const handleSignOut = () => {
    if (onSignOut) {
      onSignOut()
    }
  }

  return (
    <div>
      <h2 className='text-2xl font-semibold mb-4'>{title}</h2>
      <form>
        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='email'
          >
            Email
          </label>
          <input
            type='email'
            id='email'
            className='border rounded w-full py-2 px-3'
            placeholder='Enter your email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='password'
          >
            Password
          </label>
          <input
            type='password'
            id='password'
            className='border rounded w-full py-2 px-3'
            placeholder='Enter your password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type='button'
          className={`bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mr-2`}
          onClick={handleSubmit}
        >
          {buttonText}
        </button>
        {isAuthenticated && onSignOut && (
          <button
            type='button'
            className={`bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600`}
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        )}
      </form>
    </div>
  )
}

export default AuthForm
