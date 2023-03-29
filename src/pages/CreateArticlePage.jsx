import React from 'react'
import { Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Header from '../components/Header'
import ArticleForm from '../components/ArticleForm'
import { createNewArticle } from '../store/articlesSlice'

export default function CreateArticlePage() {
  const user = useSelector((state) => state.user)
  if (!user.token) {
    return <Redirect to="/sign-in" />
  }
  return (
    <>
      <Header />
      <ArticleForm title="Create new article" createNewArticle={createNewArticle} />
    </>
  )
}
