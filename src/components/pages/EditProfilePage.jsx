import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

import EditProfileForm from '../EditProfileForm'
import Header from '../Header'

export default function EditProfilePage() {
  const user = useSelector((state) => state.user)
  if (!user.token) {
    return <Redirect to="/sign-in" />
  }
  return (
    <>
      <Header />
      <EditProfileForm />
    </>
  )
}
