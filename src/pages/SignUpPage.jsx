import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

import Header from '../components/Header'
import SignUpForm from '../components/SignUpForm/SignUpForm'

export default function SignUpPage() {
  const user = useSelector((state) => state.user)
  if (user.token) {
    return <Redirect to="/" />
  }
  return (
    <>
      <Header />
      <SignUpForm />
    </>
  )
}
