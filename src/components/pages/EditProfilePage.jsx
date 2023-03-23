import React from 'react'
import { useSelector } from 'react-redux'
import EditProfileForm from '../EditProfileForm'
import Header from '../Header'
import { Redirect } from 'react-router-dom'

export default function EditProfilePage() {
    const user = useSelector(state => state.user)
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