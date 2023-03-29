import React from 'react'
import { useSelector } from 'react-redux'

import Header from '../components/Header'
import ArticlesList from '../components/ArticlesList'
import Pagination from '../components/Pagination'
import Spin from '../components/Spin'
import ErrorMessage from '../components/ErrorMessage'

export default function MainPage() {
  const isLoading = useSelector((state) => state.isLoading)
  const error = useSelector((state) => state.error)
  if (!isLoading && !error.fetchArticlesError) {
    return (
      <>
        <Header />
        <ArticlesList />
        <Pagination />
      </>
    )
  }
  if (isLoading && !error.fetchArticlesError) {
    return (
      <>
        <Header />
        <Spin />
      </>
    )
  }
  return <ErrorMessage details={error} />
}
