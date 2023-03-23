import React from "react";
import Header from "../Header";
import EditArticleForm from "../EditArticleForm/EditArticleForm";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

export default function EditArticlePage () {
    const user = useSelector(state => state.user)
    if (!user.token) {
        return <Redirect to="/sign-in" />
    }
    return (
        <>
            <Header/>
            <EditArticleForm />
        </>
    )
}