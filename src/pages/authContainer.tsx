// AuthContainer.tsx

import React, { useState } from "react"
import AuthForm from "./AuthForm"

import { useSelector, useDispatch } from "react-redux"
import { RootState, AppDispatch } from "../redux/store"
import { signUp, signOut } from "../redux/authSlice"
import { signIn } from "../redux/authSlice"

import Dashboard from "./dashboard"

const AuthContainer: React.FC = () => {
  const [user, setUser] = useState<string>("")
  const [authMode, setAuthMode] = useState<"signIn" | "signUp">("signIn")

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  )

  const error = useSelector((state: RootState) => state.auth.errorMessage)

  console.log(isAuthenticated, "adad")
  const dispatch: AppDispatch = useDispatch()

  const handleModeChange = (mode: "signIn" | "signUp") => {
    setAuthMode(mode)
  }

  const handleSignIn = async (email: any, password: any) => {
    try {
      await dispatch(
        signIn({
          email,
          password,
        })
      )
      console.log("Sign-in successful")
    } catch (error: any) {
      console.error("Sign-in error:", error.message)
    }
  }

  const handleSignUp = (email: string, password: string) => {
    dispatch(signUp({ email, password }))

    setUser(email)
    console.log("Signing up with:", email, password)
  }

  return isAuthenticated ? (
    <Dashboard email={user} onSignOut={() => dispatch(signOut())} />
  ) : (
    <div className='flex items-center justify-center h-screen'>
      <div className='bg-gray-200 p-6 rounded shadow-md w-96'>
        {authMode === "signIn" ? (
          <AuthForm
            title='Sign In'
            buttonText='Sign In'
            onSubmit={handleSignIn}
            isAuthenticated={isAuthenticated}
            onSignOut={() => dispatch(signOut())}
          />
        ) : (
          <AuthForm
            title='Sign Up'
            buttonText='Sign Up'
            onSubmit={handleSignUp}
            isAuthenticated={isAuthenticated}
            onSignOut={() => dispatch(signOut())}
          />
        )}
        <div className='mt-4 text-center'>
          <p>
            {authMode === "signIn"
              ? "Don't have an account? "
              : "Already have an account? "}
            <button
              className='text-blue-500 underline focus:outline-none'
              onClick={() =>
                handleModeChange(authMode === "signIn" ? "signUp" : "signIn")
              }
            >
              {authMode === "signIn" ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </div>
        {error && <p className='text-center text-red-500 mt-4'>{error}</p>}
      </div>
    </div>
  )
}

export default AuthContainer
