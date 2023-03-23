import React from "react";
import Header from '../Header'
import ArticlesList from '../ArticlesList'
import Pagination from '../Pagination'
import Spin from "../Spin"
import { useSelector } from "react-redux";
import ErrorMessage from "../ErrorMessage";

export default function MainPage () {
    const isLoading = useSelector((state) => state.isLoading)
    const error = useSelector((state) => state.error)
    return (
        !isLoading && !error.fetchArticlesError ? (
        <>
            <Header />
            <ArticlesList />
            <Pagination />
        </>
        ): isLoading && !error.fetchArticlesError ? (
        <>
            <Header />
            <Spin />
        </>
        ): (
            <ErrorMessage details={error}/>
        )
    )
}

