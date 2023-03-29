import React from 'react'
import { Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Header from '../components/Header'
import SignInForm from '../components/SignInForm'

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
