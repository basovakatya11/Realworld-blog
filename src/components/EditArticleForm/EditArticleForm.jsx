import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { updateArticle } from '../../store/articlesSlice'
import ArticleFormTemplate from '../ArticleFormTemplate/ArticleFormTemplate'

function EditArticleForm({ match, history }) {
  const dispatch = useDispatch()
  const article = useSelector((state) => state.article)
  const onSubmit = (data) => {
    const tagsArray = []
    for (const key in data) {
      if (key.startsWith('tag')) {
        tagsArray.push(data[key])
      }
    }
    const newArticle = {
      title: data.title,
      description: data.description,
      body: data.text,
      tagList: tagsArray,
    }
    dispatch(updateArticle({ updatedArticleInfo: newArticle, slug: match.params.id }))
    history.push(`/articles/${match.params.id}/`)
  }
  return <ArticleFormTemplate onSubmit={onSubmit} title="Edit article" articleInfo={article} />
}

export default withRouter(EditArticleForm)
