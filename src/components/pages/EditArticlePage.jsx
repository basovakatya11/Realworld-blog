import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

import Header from '../Header'
import EditArticleForm from '../EditArticleForm/EditArticleForm'
import { getArticle } from '../../store/articlesSlice'
import Spin from '../Spin'

export default function EditArticlePage({ id }) {
  const dispatch = useDispatch()
  const article = useSelector((state) => state.article)
  useEffect(() => {
    if (dispatch && (!article || article?.slug !== id)) dispatch(getArticle(id))
  }, [dispatch, id, article])
  const user = useSelector((state) => state.user)
  if (!user.token) {
    return <Redirect to="/sign-in" />
  }
  return !article ? (
    <Spin />
  ) : (
    <>
      <Header />
      <EditArticleForm />
    </>
  )
}
