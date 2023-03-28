import React from 'react'
import { useSelector } from 'react-redux'

import Header from '../Header'
import ArticlesList from '../ArticlesList'
import Pagination from '../Pagination'
import Spin from '../Spin'
import ErrorMessage from '../ErrorMessage'

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
