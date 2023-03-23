import React from "react";
import Header from "../Header";
import SignUpForm from "../SignUpForm/SignUpForm";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

export default function SignUpPage () {
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