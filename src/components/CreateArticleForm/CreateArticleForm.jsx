import React from 'react'
import { useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { createNewArticle } from '../../store/articlesSlice'
import ArticleFormTemplate from '../ArticleFormTemplate/ArticleFormTemplate'

function CreateArticleForm({ history }) {
  const dispatch = useDispatch()
  const onSubmit = (data) => {
    const tagsArray = []
    for (const key in data) {
      if (key.startsWith('tag')) {
        tagsArray.push(data[key])
      }
    }
    dispatch(
      createNewArticle({
        title: data.title,
        description: data.description,
        body: data.text,
        tagList: tagsArray,
      })
    )
    history.goBack()
  }
  return <ArticleFormTemplate onSubmit={onSubmit} title="Create new article" />
}

export default withRouter(CreateArticleForm)
