import React from "react";
import Header from '../Header'
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import CreateArticleForm from "../CreateArticleForm";

export default function CreateArticlePage() {
    const user = useSelector(state => state.user)
    if (!user.token) {
        return <Redirect to="/sign-in" />
    }
    return (
        <>
            <Header />
            <CreateArticleForm />
        </>
    )
}