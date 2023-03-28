import React from 'react'
import { Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Header from '../Header'
import SignInForm from '../SignInForm'

export default function SignInPage() {
  const user = useSelector((state) => state.user)
  if (user.token) {
    return <Redirect to="/" />
  }
  return (
    <>
      <Header />
      <SignInForm />
    </>
  )
}
