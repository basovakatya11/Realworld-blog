import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import ArticleCard from '../components/ArticleCard'
import Header from '../components/Header'
import { getArticle } from '../store/articlesSlice'
import Spin from '../components/Spin'

export default function ArticlePage({ id }) {
  const dispatch = useDispatch()
  const article = useSelector((state) => state.article)
  useEffect(() => {
    if (dispatch && (!article || article?.slug !== id)) dispatch(getArticle(id))
  }, [dispatch, id, article])
  return !article ? (
    <Spin />
  ) : (
    <>
      <Header />
      <ArticleCard />
    </>
  )
}
